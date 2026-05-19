import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Puedes separar esto en archivos JSON en el futuro (ej. src/locales/es.json)
const resources = {
  es: {
    translation: {
      "home": {
        "title": "Frontend Developer SSR",
        "description_1": "Buscás un desarrollador Semi-Senior experto en React, Next.js y Typescript, con buen trabajo en equipo, buen ojo para el diseño y muchas ganas de trabajar? ¡Hablemos!",
        "description_2": "Mas de 3 años de experiencia trabajando en equipos multidisciplinarios",
        "btn_mail": "Enviar mail",
        "btn_cv": "Ver CV"
      },
      "nav": {
        "home": "INICIO",
        "work": "TRABAJO",
        "about": "SOBRE MI",
        "contact": "CONTACTO"
      },
      "work": {
        "title": "Experiencia",
        "description": "Experiencia profesional y proyectos donde construí interfaces modernas, funcionales y estéticas.",
        "exp1_desc": "Desarrollo de interfaces modernas con React y TailwindCSS, foco en performance y UX.",
        "exp2_desc": "Construcción de vistas complejas, animaciones y componentes reutilizables en React.",
        "exp3_desc": "Trabajo en productos SaaS, emails, herramientas con IA y colaboración directa con diseño y comunicación.",
        "exp4_desc": "Desarrollo de soluciones a medida con React, Next.js y Firebase para distintos clientes."
      },
      "highlighted_work": {
        "title": "Trabajo destacado",
        "description": "Explora algunos de los proyectos más relevantes donde he aplicado mis habilidades técnicas y de diseño."
      },
      "about": {
        "title": "Sobre mí",
        "p1": "Soy un desarrollador ",
        "p1_highlight": "Frontend SSR",
        "p1_2": " apasionado por crear experiencias digitales que no solo funcionen a la perfección, sino que también cautiven visualmente.",
        "p2": "Mi enfoque se centra en la intersección del diseño y la ingeniería. Creo firmemente que la ",
        "p2_highlight1": "performance",
        "p2_2": " y la ",
        "p2_highlight2": "estética",
        "p2_3": " deben ir de la mano para lograr productos excepcionales.",
        "p3": "Con años de experiencia en el ecosistema de ",
        "p3_highlight": "React",
        "p3_2": ", me especializo en construir interfaces dinámicas y animaciones fluidas.",
        "tag": "Frontend Dev",
        "btn_cv": "Descargar CV"
      },
      "contact": {
        "title": "Hablemos",
        "subtitle1": "¿Tienes un proyecto en mente o solo quieres saludar?",
        "subtitle2": "Estoy a un mensaje de distancia.",
        "btn_cv": "Ver CV",
        "footer": "Hecho con 💛"
      }
    }
  },
  en: {
    translation: {
      "home": {
        "title": "Frontend Developer SSR",
        "description_1": "Looking for a Semi-Senior developer expert in React, Next.js and Typescript, with good teamwork, a keen eye for design and eager to work? Let's talk!",
        "description_2": "More than 3 years of experience working in multidisciplinary teams",
        "btn_mail": "Send mail",
        "btn_cv": "View CV"
      },
      "nav": {
        "home": "HOME",
        "work": "WORK",
        "about": "ABOUT",
        "contact": "CONTACT"
      },
      "work": {
        "title": "Experience",
        "description": "Professional experience and projects where I built modern, functional, and aesthetic interfaces.",
        "exp1_desc": "Development of modern interfaces with React and TailwindCSS, focusing on performance and UX.",
        "exp2_desc": "Construction of complex views, animations, and reusable components in React.",
        "exp3_desc": "Work on SaaS products, emails, AI tools, and direct collaboration with design and communication teams.",
        "exp4_desc": "Development of custom solutions with React, Next.js, and Firebase for various clients."
      },
      "highlighted_work": {
        "title": "Highlighted Work",
        "description": "Explore some of the most relevant projects where I've applied my technical and design skills."
      },
      "about": {
        "title": "About me",
        "p1": "I am a ",
        "p1_highlight": "Frontend SSR",
        "p1_2": " developer passionate about creating digital experiences that not only work flawlessly but also captivate visually.",
        "p2": "My approach focuses on the intersection of design and engineering. I firmly believe that ",
        "p2_highlight1": "performance",
        "p2_2": " and ",
        "p2_highlight2": "aesthetics",
        "p2_3": " must go hand in hand to achieve exceptional products.",
        "p3": "With years of experience in the ",
        "p3_highlight": "React",
        "p3_2": " ecosystem, I specialize in building dynamic interfaces and fluid animations.",
        "tag": "Frontend Dev",
        "btn_cv": "Download CV"
      },
      "contact": {
        "title": "Let's talk",
        "subtitle1": "Do you have a project in mind or just want to say hi?",
        "subtitle2": "I'm just a message away.",
        "btn_cv": "View CV",
        "footer": "Made with 💛"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "es", // idioma por defecto
    fallbackLng: "es",
    interpolation: {
      escapeValue: false // React ya protege contra XSS
    }
  });

export default i18n;
