import { useEffect } from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LanguageWrapper = ({ defaultLang, children }: { defaultLang?: string, children?: React.ReactNode }) => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  const currentLang = lang || defaultLang;

  useEffect(() => {
    if (currentLang === "es" || currentLang === "en") {
      i18n.changeLanguage(currentLang);
      document.documentElement.lang = currentLang;
    }
  }, [currentLang, i18n]);

  if (currentLang !== "es" && currentLang !== "en") {
    // Si la ruta tiene un idioma inválido, lo enviamos a la raíz (español por defecto)
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default LanguageWrapper;
