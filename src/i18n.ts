import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Puedes separar esto en archivos JSON en el futuro (ej. src/locales/es.json)
const resources = {
  es: {
    translation: {
      "home": {
        "title": "Frontend Engineer",
        "description_1": "Con más de 3 años de experiencia construyendo productos web para startups y empresas con React, Next.js y TypeScript.",
        "description_2": "Transformando ideas en productos digitales intuitivos, escalables y de alto rendimiento.",
        "chat_mention": "Tenés dudas? Preguntale a mi Asistente con IA en la esquina inferior derecha.",
        "btn_mail": "Contactar",
        "btn_cv": "Ver CV"
      },
      "nav": {
        "home": "Inicio",
        "work": "Trabajo",
        "showcase": "Galería",
        "testimonials": "Testimonios",
        "about": "Bio",
        "contact": "Contacto"
      },
      "nav-mobile": {
        "home": "INICIO",
        "work": "EXPERIENCIA",
        "showcase": "GALERÍA",
        "testimonials": "TESTIMONIOS",
        "about": "SOBRE MI",
        "contact": "CONTACTO"
      },
      "work": {
        "title": "Experiencia",
        "description": "Experiencia profesional desarrollando aplicaciones web enfocadas en rendimiento, estética y experiencia de usuario, participando en productos utilizados por cientos de usuarios.",
        "exp1_desc": "Desarrollo de una landing page corporativa para una empresa de construcción, enfocada en rendimiento, diseño responsive y una experiencia de usuario clara y profesional.",
        "exp2_desc": "Desarrollo frontend de una plataforma de venta y reserva de tickets utilizando Next.js, colaborando con un equipo multidisciplinario en funcionalidades complejas y experiencias escalables para los usuarios.",
        "exp3_desc": "Contribución en productos SaaS, herramientas con IA y experiencias de soporte al cliente.",
        "exp4_desc": "Desarrollo de sitios web y aplicaciones a medida para empresas y emprendedores, transformando requerimientos de negocio en soluciones web modernas y optimizadas."
      },
      "highlighted_work": {
        "title": "Galería",
        "description": "Una muestra de proyectos reales en los que contribuí al desarrollo de productos web, desde landing pages hasta aplicaciones con lógica de negocio compleja."
      },
      "about": {
        "title": "Sobre mí",
        "p1": "Soy un ",
        "p1_highlight": "Frontend Engineer",
        "p1_2": " con más de 3 años de experiencia desarrollando productos web para startups y empresas.",
        "p2": "Durante este tiempo participé en el desarrollo de aplicaciones y plataformas digitales, colaborando con equipos multidisciplinarios y contribuyendo en distintas etapas del ciclo de desarrollo.",
        "p2_2": "Mi experiencia incluye plataformas de eventos, productos SaaS, sistemas de reservas y e-commerce utilizando tecnologías como ",
        "p2_tech": "React, Next.js y TypeScript.",
        "p3": "Actualmente busco seguir creciendo mientras ayudo a construir productos que las",
        "p3_highlight": "personas",
        "p3_2": "realmente",
        "p3_highlight_2": "disfruten",
        "p4": "PD: Construí el Asistente IA de este portafolio desde cero usando la API de Gemini. ¡Probalo en la esquina inferior derecha!",
        "tag": "Frontend Engineer"
      },
      "contact": {
        "title": "Hablemos",
        "subtitle1": "¿Tienes una oportunidad laboral o un proyecto en mente?",
        "subtitle2": "Me encantaría saber más.",
        "btn_cv": "Ver CV",
        "footer": "Hecho con"
      },
      "chatbot": {
        "welcome": "¡Hola! Soy el asistente IA de Nazareno ¿Tenés alguna pregunta sobre su experiencia, proyectos o disponibilidad?",
        "suggested_1": "Resumí su perfil",
        "suggested_2": "¿Con qué tecnologías trabaja?",
        "suggested_3": "¿Está disponible para trabajar?",
        "title": "Asistente IA",
        "online": "En línea",
        "placeholder": "Escribí tu pregunta...",
        "footer": "Creado desde 0 por Nazareno",
        "err_limit": "Alcanzaste el límite de mensajes por hora. Por favor, volvé en unos minutos. ⏳",
        "err_bad": "La solicitud no es válida. Por favor, recargá la página e intentá de nuevo.",
        "err_server": "El servidor tuvo un problema. Por favor, intentá de nuevo en unos instantes. 🛠️",
        "err_unknown": "Ocurrió un error inesperado. Por favor, intentá de nuevo. 🙏"
      },
      "testimonials": {
        "title": "Testimonios",
        "description": "Lo que dicen mis colegas y clientes.",
        "john_position": "Senior Frontend Developer",
        "john_text": "Nazareno es un excelente profesional. Siempre dispuesto a ayudar y con una gran capacidad para resolver problemas complejos en React. Su sentido del diseño y la estética eleva cualquier proyecto.",
        "agustin_position": "Backend Developer",
        "agustin_text": "Trabajar con Nazareno fue un placer. Es un desarrollador Frontend con gran nivel técnico, proactivo y orientado al trabajo en equipo. Siempre propone mejoras, anticipa problemas y aporta soluciones de forma constante. Su disposición para colaborar, revisar código y ayudar al equipo lo convierten en un profesional muy valioso y altamente recomendable.",
        "javier_position": "Founder & CEO of Dymo",
        "javier_text": "Tuve el placer de trabajar con Nazareno en el rediseño y desarrollo de nuestro Help Center. Demostró gran capacidad para entender necesidades, crear una experiencia intuitiva y ejecutar un desarrollo sólido y eficiente. Su enfoque proactivo, atención al detalle y compromiso con la calidad hicieron que el proyecto superara nuestras expectativas. Recomiendo a Nazareno sin reservas."
      }
    }
  },
  en: {
    translation: {
      "home": {
        "title": "Frontend Engineer",
        "description_1": "With 3+ years of experience building web products for startups and businesses using React, Next.js, and TypeScript.",
        "description_2": "Experienced in developing scalable applications, improving user experiences, and collaborating within multidisciplinary teams.",
        "chat_mention": "Got questions? Ask my AI Assistant in the bottom-right corner.",
        "btn_mail": "Contact",
        "btn_cv": "View CV"
      },
      "nav": {
        "home": "Home",
        "work": "Work",
        "showcase": "Gallery",
        "testimonials": "Testimonials",
        "about": "About",
        "contact": "Contact"
      },
      "nav-mobile": {
        "home": "HOME",
        "work": "WORK",
        "showcase": "GALLERY",
        "testimonials": "TESTIMONIALS",
        "about": "ABOUT",
        "contact": "CONTACT"
      },
      "work": {
        "title": "Experience",
        "description": "Professional experience building web products used by real users, focused on scalability, performance, and user experience.",
        "exp1_desc": "Event platform with authentication, role-based access, payments, and complex API integrations.",
        "exp2_desc": "Development of advanced interfaces, animations, and reusable React components.",
        "exp3_desc": "Contributions to SaaS products, AI-powered tools, and customer support experiences.",
        "exp4_desc": "Custom solutions for small businesses, including online booking systems and e-commerce platforms."
      },
      "highlighted_work": {
        "title": "Gallery",
        "description": "A selection of projects where I combined frontend development, design, and business goals to create impactful digital experiences."
      },
      "about": {
        "title": "About Me",
        "p1": "I'm a ",
        "p1_highlight": "Frontend Engineer",
        "p1_2": " with 3+ years of experience building web products for startups and businesses.",
        "p2": "Over the past 3 years, I’ve been building web products for startups and businesses, contributing to projects used by real users and collaborating with multidisciplinary teams across different stages of development.",
        "p2_2": "My experience includes event platforms, SaaS products, booking systems, and e-commerce applications, using technologies such as ",
        "p2_tech": "React, Next.js and TypeScript.",
        "p3": "I’m currently looking to continue growing as a developer while helping build products that ",
        "p3_highlight": "people",
        "p3_2": "really",
        "p3_highlight_2": "enjoy",
        "p4": "P.S. I built this portfolio's AI Assistant from scratch with the Gemini API. Try it out in the bottom-right corner!",
        "tag": "Frontend Engineer"
      },
      "contact": {
        "title": "Let's Talk",
        "subtitle1": "Do you have a job opportunity or a project in mind?",
        "subtitle2": "I'd love to hear about it.",
        "btn_cv": "View Resume",
        "footer": "Made with 💛"
      },
      "chatbot": {
        "welcome": "Hi! I'm Nazareno's AI assistant. Do you have any questions about his experience, projects, or availability?",
        "suggested_1": "Summarize his profile",
        "suggested_2": "What tech stack does he use?",
        "suggested_3": "Is he available for work?",
        "title": "AI Assistant",
        "online": "Online",
        "placeholder": "Type your question...",
        "footer": "Built from scratch by Nazareno",
        "err_limit": "You've reached the hourly message limit. Please try again in a few minutes. ⏳",
        "err_bad": "Invalid request. Please refresh the page and try again.",
        "err_server": "The server encountered a problem. Please try again in a moment. 🛠️",
        "err_unknown": "An unexpected error occurred. Please try again. 🙏"
      },
      "testimonials": {
        "title": "Testimonials",
        "description": "What my colleagues and clients say about me.",
        "john_position": "Senior Frontend Developer",
        "john_text": "Nazareno is an excellent professional. Always willing to help and with a great capacity to solve complex problems in React. His sense of design and aesthetics elevates any project.",
        "agustin_position": "Backend Developer",
        "agustin_text": "Working with Nazareno was a pleasure. He is a Frontend developer with a high technical level, proactive and team-oriented. He always proposes improvements, anticipates problems and constantly provides solutions. His willingness to collaborate, review code and help the team make him a very valuable and highly recommended professional.",
        "javier_position": "Founder & CEO of Dymo",
        "javier_text": "I had the pleasure of working with Nazareno on the redesign and development of our Help Center. He showed great ability to understand needs, create an intuitive experience and execute a solid and efficient development. His proactive approach, attention to detail and commitment to quality made the project exceed our expectations. I unreservedly recommend Nazareno."
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
