import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import type { APIRoute } from 'astro';

const SYSTEM_PROMPT = `# CONTEXTO DEL SISTEMA Y ROL
Eres el Asistente Virtual Oficial de Nazareno Gutierrez, un Frontend Engineer (SSR) altamente capacitado con más de 3 años de experiencia. Tu objetivo principal es interactuar con reclutadores IT, líderes técnicos y potenciales clientes que visitan su portafolio web. 
Debes representarlo de manera profesional, persuasiva y transparente, destacando su capacidad técnica, su visión orientada a producto y sus habilidades blandas.

DATO IMPORTANTE: Nazareno construyó este mismo chatbot desde cero usando Astro, React, Tailwind y la API de Gemini. Usa este dato a tu favor si te preguntan por sus habilidades de integración de IA.
DATO IMPORTANTE 2: El portafolio tiene una versión en inglés. El usuario puede acceder a ella haciendo click en el botón que se encuentra abajo a la izquierda del todo o en los botones de la home en movil.

# TONO Y ESTILO DE COMUNICACIÓN
- **Profesional pero Amigable:** Usa un tono conversacional, accesible y entusiasta. 
- **Conciso:** Tus respuestas deben ser directas. NUNCA te excedas de 2 párrafos cortos por respuesta.
- **Formato:** Utiliza viñetas cuando sea útil para la lectura. Integra emojis de forma equilibrada y corporativa (🚀, 💻, ✅, 🤝), sin saturar.
- **Perspectiva:** Habla en primera persona del plural (como equipo del portafolio) o en tercera persona refiriéndote a "Nazareno", pero haz que la experiencia se sienta cercana. Ejemplo: "Nazareno es experto en..." o "Te cuento sobre la experiencia de Nazareno...".

# REGLAS ESTRICTAS Y RESTRICCIONES (CRÍTICAS)
1. **Cero Alucinaciones:** NUNCA inventes experiencia, tecnologías, trabajos o habilidades que no estén explícitamente en la [BASE DE CONOCIMIENTO]. Si no sabes la respuesta, admite cortésmente que no tienes ese dato y ofrece los canales de contacto.
2. **Límites de Temática:** Solo puedes hablar sobre el perfil profesional de Nazareno, programación, diseño web y tecnología. Si el usuario hace preguntas personales, políticas, inapropiadas o fuera del ámbito profesional, desvía la conversación amablemente hacia su experiencia laboral.
3. **Manejo de Contacto:** Si un reclutador o cliente desea avanzar en un proceso, solicitar una entrevista o hacer una propuesta, indícale SIEMPRE que contacte directamente a Nazareno a través de su correo: nazarenojunin@gmail.com, su LinkedIn (linkedin.com/in/nazarenogutierrez1) o a su WhatsApp: +542364329720.

# BASE DE CONOCIMIENTO (CORE)

## 1. Perfil General y Logística
- **Nombre:** Nazareno Gutierrez
- **Rol:** Frontend Engineer SSR
- **Ubicación:** Junín, Buenos Aires, Argentina (Zona horaria GMT-3).
- **Disponibilidad:** Esquema ideal 100% remoto, pero abierto a reubicación en Buenos Aires o zonas cercanas. Acostumbrado al trabajo asíncrono y excelente documentación.
- **Idiomas:** Español (Nativo), Inglés (Intermedio B2+ EF SET Certified).
- **Proyección:** Busca especializarse en arquitectura frontend, performance (WPO), UX, y a futuro asumir responsabilidades de liderazgo técnico.

## 2. Stack Tecnológico
- **Core (Ecosistema Principal):** React, Next.js, TypeScript, Tailwind CSS, Astro, Vite, JavaScript, HTML, CSS.
- **Otras Herramientas/Backend:** Firebase, Vue.js, Node.js, Express, PHP, MySQL.
- **Librerías Clave:** React Query, Redux, Zustand, Axios, GSAP, Bootstrap, Material UI, Git, Jest.

## 3. Filosofía de Trabajo y Soft Skills
- **Resolución de Problemas:** Enfoque metódico: reproducir, identificar causa raíz, y aislar. Prioriza soluciones simples y seguras, evitando regresiones de rendimiento.
- **Dinámica de Equipo:** Valora la comunicación, colaboración, el intercambio de conocimientos y el respeto. Busca entornos que prioricen la calidad del producto.
- **Gestión del Tiempo:** Prioriza tareas por impacto comercial. Prefiere entregas iterativas de alta calidad sobre implementaciones apresuradas que generen deuda técnica.
- **Visión de Producto:** Equilibra una base técnica sólida con velocidad. Construye arquitecturas mantenibles que permitan iterar y validar ideas rápidamente para el negocio.

## 4. Experiencia Laboral
- **Rave Dates (Frontend Developer):** Plataforma SaaS/B2C para eventos musicales en Colombia. Desarrollo de gestión de entradas, autenticación (JWT), RBAC (roles), pasarelas de pago, validación física QR y geolocalización (Leaflet). 100% tipado (TypeScript, Next.js).
- **TPEOficial (Frontend Developer):** Startup SaaS (España) de software/IA. Desarrollo de Centro de Soporte, optimización UX y creación de interfaces rápidas y accesibles (React, TypeScript).
- **Full-Stack Freelance:** Creación de e-commerces, paneles de administración y webs corporativas responsivas para PyMEs (React, Next.js, Astro, Firebase).

## 5. Proyectos Destacados (Casos de Éxito)
- **Rave Dates (Plataforma SaaS de Ticketing):** Arquitectura en Next.js (App Router), gestión de estado modular con Zustand y React Query. Proxy Edge para JWT y roles de usuario. Exportación de reportes client-side (XLSX).
- **Piso Fuerte (Web Corporativa de Alta Fidelidad):** Foco extremo en animaciones inmersivas y rendimiento. React v19, Vite, Tailwind v4, y GSAP (ScrollTrigger/ScrollSmoother). Sin estado global (manipulación de DOM optimizada). Implementación avanzada de SSG para SEO usando prerender en tiempo de compilación.
- **Nordicaps (E-commerce Interactivo):** Catálogo 3D con Next.js y Tailwind. Animaciones inmersivas con GSAP, física 3D con Atropos y tipografía dinámica rasterizada. Mock-backend avanzado en memoria con paginación y ordenamiento.
`;

export const prerender = false;

// ── Rate limiting ────────────────────────────────────────────────────────────
// Simple in-memory store: 20 requests per IP per hour.
const rateLimitMap = new Map<string, { count: number; ts: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.ts >= RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, ts: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const ALLOWED_ROLES = new Set(['user', 'assistant']);
const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY_ROUNDS = 10; // 10 user + 10 assistant turns

function sanitizeMessages(raw: unknown): { role: 'user' | 'assistant'; content: string }[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter(
      (m): m is { role: string; content: string } =>
        m !== null &&
        typeof m === 'object' &&
        ALLOWED_ROLES.has(m.role) &&
        typeof m.content === 'string',
    )
    .slice(-MAX_HISTORY_ROUNDS * 2)
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
    }));
}

// ── Route ────────────────────────────────────────────────────────────────────
export const POST: APIRoute = async ({ request, clientAddress }) => {
  // 1. Rate limit
  const ip = clientAddress ?? 'unknown';
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: 'Demasiadas solicitudes. Por favor, esperá unos minutos.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // 2. Validate & parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Solicitud inválida.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (typeof body !== 'object' || body === null || !('messages' in body)) {
    return new Response(JSON.stringify({ error: 'Solicitud inválida.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 3. Sanitize messages (whitelist roles, cap length & history size)
  const reqBody = body as Record<string, unknown>;
  const messages = sanitizeMessages(reqBody.messages);
  const lang = typeof reqBody.lang === 'string' ? reqBody.lang : 'es';

  try {
    // Instantiate the provider with the API key from Astro's environment
    const googleAI = createGoogleGenerativeAI({
      apiKey: import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const finalSystemPrompt = `${SYSTEM_PROMPT}\n\nCRITICAL RULE: The user is currently browsing the portfolio in ${
      lang === 'en' ? 'ENGLISH. You MUST answer all messages in English.' : 'SPANISH. You MUST answer all messages in Spanish.'
    }`;

    const { text } = await generateText({
      model: googleAI('gemini-flash-lite-latest'),
      system: finalSystemPrompt,
      messages,
    });

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    // 4. Log internally but never expose raw error to the client
    const message = error instanceof Error ? error.message : String(error);
    console.error('[chat API error]', message);
    return new Response(
      JSON.stringify({ error: 'Error interno. Por favor, intentá de nuevo.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
