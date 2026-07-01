import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageWrapper = ({ defaultLang, children }: { defaultLang: string, children: React.ReactNode }) => {
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    if (defaultLang === "es" || defaultLang === "en") {
      i18n.changeLanguage(defaultLang);
      document.documentElement.lang = defaultLang;
    }
  }, [defaultLang, i18n]);

  return <>{children}</>;
};

export default LanguageWrapper;
