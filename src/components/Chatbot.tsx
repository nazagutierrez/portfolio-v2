import BotSvg from '@/assets/svg/BotSvg';
import SendSvg from '@/assets/svg/SendSvg';
import SparklesSvg from '@/assets/svg/SparklesSvg';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Cap in-memory history so it never grows unbounded
const MAX_MESSAGES = 60;

export default function Chatbot() {
  const { t, i18n } = useTranslation();

  const WELCOME: Message = {
    id: 'welcome',
    role: 'assistant',
    content: t('chatbot.welcome'),
  };

  const SUGGESTED = [
    t('chatbot.suggested_1'),
    t('chatbot.suggested_2'),
    t('chatbot.suggested_3'),
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Abort ongoing fetch when the component unmounts or a new message is sent
  const abortRef = useRef<AbortController | null>(null);

  // Update welcome message if language changes or if i18n is not ready on first render
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length > 0 && prev[0].id === 'welcome') {
        return [
          { ...prev[0], content: t('chatbot.welcome') },
          ...prev.slice(1),
        ];
      }
      return prev;
    });
  }, [t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Abort any in-flight request on unmount
  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  const sendMessage = async (content: string) => {
    // Cancel previous in-flight request, if any
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    // Use crypto.randomUUID for collision-proof IDs
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content };
    const assistantId = crypto.randomUUID();
    const assistantMsg: Message = { id: assistantId, role: 'assistant', content: '' };

    setMessages((prev) => {
      const next = [...prev, userMsg, assistantMsg];
      // Trim history from the top (preserving welcome) if it exceeds the cap
      if (next.length > MAX_MESSAGES) {
        const welcome = next[0].id === 'welcome' ? [next[0]] : [];
        return [...welcome, ...next.slice(-(MAX_MESSAGES - welcome.length))];
      }
      return next;
    });
    setText('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const apiMessages = [...messages, userMsg]
        .filter((m) => m.id !== 'welcome')
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, lang: i18n.language }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error(t('chatbot.err_limit'));
        }
        if (res.status === 400) {
          throw new Error(t('chatbot.err_bad'));
        }
        throw new Error(t('chatbot.err_server'));
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: data.text } : m))
      );
    } catch (err) {
      // Ignore abort errors (user closed chat or sent a new message)
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const errorMessage = err instanceof Error
        ? err.message
        : t('chatbot.err_unknown');
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: errorMessage }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    sendMessage(text.trim());
  };

  const onSuggestionClick = (s: string) => {
    if (isLoading) return; // Guard against race condition
    sendMessage(s);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-['Zalando_Sans_SemiExpanded',_sans-serif]">

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir asistente IA"
        className={`flex items-center cursor-pointer justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full text-[#0c0c0c] transition-all duration-500 hover:scale-110 focus:outline-none bg-gradient-to-br from-[#b8a52d] via-[#d4be3e] to-[#b8a52d] shadow-[0_0_24px_rgba(184,165,45,0.4),0_4px_16px_rgba(0,0,0,0.4)] ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <SparklesSvg />
      </button>

      {/* Chat window */}
      <div
        className={`absolute bottom-0 right-0 flex flex-col transition-all duration-300 origin-bottom-right w-[calc(100vw-48px)] max-w-[360px] h-[520px] max-h-[85vh] bg-[#121212]/92 backdrop-blur-[20px] border border-[#b8a52d]/25 rounded-[20px] shadow-[0_24px_64px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.04),0_0_40px_rgba(184,165,45,0.08)] overflow-hidden ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between bg-gradient-to-br from-[#b8a52d]/15 to-[#b8a52d]/5 border-b border-[#b8a52d]/20 px-5 py-4 shrink-0"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-[#b8a52d] to-[#d4be3e] shadow-[0_0_12px_rgba(184,165,45,0.5)]"
            >
              <BotSvg className="w-5" />
            </div>
            <div>
              <p className="text-[#e9e9d5] text-[14px] font-semibold leading-[1.2]">
                {t('chatbot.title')}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
                <p className="text-[#e9e9d5]/50 text-[11px]">{t('chatbot.online')}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar chat"
            className="p-1 cursor-pointer rounded-lg text-[#e9e9d5]/50 hover:text-[#e9e9d5] transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div
          role="log"
          aria-live="polite"
          aria-label="Historial de conversación"
          className="flex-1 overflow-y-auto flex flex-col gap-4 p-4 [scrollbar-width:thin] [scrollbar-color:rgba(184,165,45,0.2)_transparent]"
        >
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-2 mt-0.5 bg-gradient-to-br from-[#b8a52d] to-[#d4be3e]"
                >
                  <BotSvg className="w-4" />
                </div>
              )}
              <div
                className={`max-w-[75%] text-[13.5px] leading-[1.6] px-3.5 py-2.5 break-words [overflow-wrap:anywhere] ${
                  m.role === 'user'
                    ? 'rounded-[16px_4px_16px_16px] bg-gradient-to-br from-[#b8a52d] to-[#d4be3e] text-[#0c0c0c] font-medium'
                    : 'rounded-[4px_16px_16px_16px] bg-white/6 border border-white/8 text-[#e9e9d5]'
                }`}
              >
                {m.content ? (
                  m.role === 'assistant' ? (
                    <ReactMarkdown
                      components={{
                        /* eslint-disable @typescript-eslint/no-unused-vars */
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                        a: ({ node, ...props }) => (
                          <a
                            className="text-[#b8a52d] underline hover:text-[#d4be3e]"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          />
                        ),
                        strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />
                        /* eslint-enable @typescript-eslint/no-unused-vars */
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    m.content
                  )
                ) : (
                  <div className="flex gap-1 items-center py-0.5">
                    {[0, 150, 300].map((delay) => (
                      <div
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full animate-bounce bg-[#b8a52d]"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Suggestions */}
          {showSuggestions && !isLoading && (
            <div className="flex flex-wrap gap-2 mt-2">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => onSuggestionClick(s)}
                  className="text-[12px] text-[#b8a52d] border border-[#b8a52d]/35 rounded-[20px] px-3 py-1 bg-[#b8a52d]/8 transition-all duration-200 cursor-pointer hover:bg-[#b8a52d]/18"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={onSubmit}
          className="px-4 py-3 border-t border-white/7 shrink-0"
        >
          <div className="relative flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('chatbot.placeholder')}
              className="flex-1 bg-white/6 border border-white/10 focus:border-[#b8a52d]/50 rounded-[12px] px-3.5 py-2.5 text-[#e9e9d5] text-[13.5px] outline-none transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={isLoading || text.trim() === ''}
              aria-label="Enviar"
              className={`border-none rounded-[10px] p-2.5 transition-all duration-200 shrink-0 flex items-center justify-center ${
                text.trim() && !isLoading
                  ? 'bg-gradient-to-br from-[#b8a52d] to-[#d4be3e] cursor-pointer text-[#0c0c0c]'
                  : 'bg-white/7 cursor-not-allowed text-white/30'
              }`}
            >
              <SendSvg className='w-5' />
            </button>
          </div>
          <p className="text-[11px] text-[#e9e9d5]/40 mt-2 text-center">
            {t('chatbot.footer')}
          </p>
        </form>
      </div>
    </div>
  );
}
