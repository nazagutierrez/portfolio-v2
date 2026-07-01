import IntroAnimation from './IntroAnimation';
import Navbar from '../sections/Navbar';
import SmoothWrapper from './SmoothWrapper';
import LanguageWrapper from './LanguageWrapper';
import Home from '../sections/Home';
import '../i18n';

interface PageWrapperProps {
  lang: 'es' | 'en';
}

export default function PageWrapper({ lang }: PageWrapperProps) {
  return (
    <>
      <IntroAnimation />
      <Navbar />
      <SmoothWrapper>
        <LanguageWrapper defaultLang={lang}>
          <Home />
        </LanguageWrapper>
      </SmoothWrapper>
    </>
  );
}
