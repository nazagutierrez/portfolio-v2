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
        "chat_mention": "Tenés dudas? Preguntale a mi Asistente con IA.",
        "btn_mail": "Enviar mail",
        "btn_cv": "Ver CV"
      },
      "nav": {
        "home": "Inicio",
        "work": "Trabajo",
        "showcase": "Galería",
        "testimonials": "Testimonios",
        "about": "Sobre mí",
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
        "description": "Experiencia profesional desarrollando aplicaciones web enfocadas en rendimiento, diseño y experiencia de usuario, participando en productos utilizados por cientos de usuarios.",
        "mobile_description": "Desarrollo de aplicaciones web enfocadas en rendimiento, diseño y experiencia de usuario.",
        "exp1_desc": "Desarrollo de una landing page corporativa para una empresa de construcción, enfocada en rendimiento, diseño responsive y una experiencia profesional.",
        "exp2_desc": "Desarrollo frontend de una plataforma de venta y reserva de tickets con Next.js, colaborando con un equipo multidisciplinario en funcionalidades y experiencias escalables.",
        "exp3_desc": "Contribución en productos SaaS, herramientas con IA y experiencias de soporte al cliente.",
        "exp4_desc": "Desarrollo de sitios web y aplicaciones a medida para empresas y emprendedores, creando soluciones web modernas, optimizadas y centradas en el usuario."
      },
      "highlighted_work": {
        "title": "Galería",
        "description": "Una muestra de proyectos reales en los que contribuí al desarrollo de productos web, desde landing pages hasta aplicaciones con lógica de negocio compleja.",
        "mobile_description": "Proyectos reales, desde landing pages hasta aplicaciones web complejas."
      },
      "gallery": {
        "ravedates": {
          "desc1": "+20 pantallas desarrolladas. Desde flujos de compra hasta paneles de gestión y configuración de eventos.",
          "desc2": "Aplicación construida con Next.js. Participando en el desarrollo de funcionalidades complejas y optimización de la experiencia de usuario.",
          "desc3": "Trabajo en equipo multidisciplinario. Colaborando con diseñadores, backend developers y stakeholders durante todo el ciclo de desarrollo.",
          "desc4": "Video demostrativo del funcionamiento de la plataforma."
        },
        "dymo": {
          "desc1": "Diseñé y desarrollé desde cero un centro de ayuda web para centralizar documentación, recursos y soporte para los usuarios.",
          "desc2": "Implementé interfaces modernas, responsive y optimizadas para mejorar la navegación y accesibilidad.",
          "desc3": "Participé en el desarrollo y evolución de herramientas digitales, trabajando junto a equipos de producto y comunicación.",
          "desc4": "Video demostrativo del funcionamiento de la plataforma."
        },
        "freelance": {
          "desc1": "Desarrollo de una web corporativa enfocada en transmitir confianza, presentar servicios y facilitar el contacto con potenciales clientes.",
          "desc2": "Implementación de una experiencia moderna y responsive, priorizando rendimiento, diseño y presencia digital de la marca.",
          "desc3": "Diseño y desarrollo de una web orientada a mostrar servicios, fortalecer la identidad de marca y facilitar la captación de clientes.",
          "desc4": "Desarrollo de una interfaz atractiva y optimizada para comunicar el producto de forma clara y maximizar la conversión de usuarios."
        }
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
        "p4": "Nota: Construí el Asistente IA de este portafolio desde cero usando la API de Gemini. ¡Probalo en la esquina inferior derecha!",
        "tag": "Naza ama el chocolate"
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
        "suggested_2": "Hablame de sus proyectos",
        "suggested_3": "¿Cómo contacto a Nazareno?",
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
        "description": "Lo que dicen quienes trabajaron conmigo.",
        
        "agustin_position": "Backend Developer",
        "agustin_text": "Trabajar con Nazareno fue un placer. Es un desarrollador con nivel técnico, proactivo y orientado al trabajo en equipo. Siempre propone mejoras, anticipa problemas y aporta soluciones constantemente. Su disposición para colaborar y ayudar al equipo lo convierten en un profesional muy valioso y recomendable.",
        
        "javier_position": "Founder & CEO of Dymo",
        "javier_text": "Tuve el placer de trabajar con Nazareno en el rediseño y desarrollo de nuestro Help Center. Demostró una gran capacidad para entender nuestras necesidades, crear una experiencia intuitiva y entregar un desarrollo sólido. Su compromiso y atención al detalle superaron nuestras expectativas.",
        
        "alex_position": "Technical Leader",
        "alex_text": "Fue un gusto trabajar con Nazareno. Siempre estuvo dispuesto a resolver desafíos, aportar al equipo y colaborar cuando hacía falta. Tiene un sólido nivel técnico, aprende rápido y mantiene una actitud positiva que lo convierte en un profesional altamente recomendable.",
        
        "marcelo_position": "Backend Developer | Co-founder Naztro",
        "marcelo_text": "Fundar Naztro junto a Nazareno fue una gran experiencia. Siempre demostró compromiso, responsabilidad y una actitud proactiva. Además de su sólido conocimiento técnico, aporta buenas ideas, busca mejorar constantemente y genera un excelente ambiente de trabajo. Lo recomiendo totalmente.",
        
        "javier_taboada_position": "PM Rave Dates",
        "javier_taboada_text": "Nazareno ha sido un colaborador excepcional: rápido, experimentado, proactivo y muy orientado al trabajo en equipo. Siempre busca soluciones, propone mejoras y aporta más allá de sus responsabilidades. Es un profesional comprometido que suma mucho valor a cualquier proyecto."
      }
    }
  },
  en: {
    translation: {
      "home": {
        "title": "Frontend Engineer",
        "description_1": "With 3+ years of experience building web products for startups and businesses using React, Next.js, and TypeScript.",
        "description_2": "Experienced in developing scalable applications, improving user experiences, and collaborating within multidisciplinary teams.",
        "chat_mention": "Got questions? Ask my AI Assistant.",
        "btn_mail": "Send mail",
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
        "description": "Professional experience building web applications focused on performance, design, and user experience, contributing to products used by hundreds of users.",
        "mobile_description": "Building web applications focused on performance, design, and user experience.",        
        "exp1_desc": "Built a corporate landing page for a construction company, focusing on performance, responsive design, and a polished user experience.",
        "exp2_desc": "Developed the frontend of a ticketing and booking platform with Next.js, collaborating with a multidisciplinary team on scalable features and user experiences.",
        "exp3_desc": "Contributed to SaaS products, AI-powered tools, and customer support experiences.",
        "exp4_desc": "Built custom websites and web applications for businesses and entrepreneurs, delivering modern, optimized, and user-focused solutions."
      },
      "highlighted_work": {
        "title": "Gallery",
        "description": "A selection of projects where I combined frontend development, design, and business goals to create impactful digital experiences.",
        "mobile_description": "Real-world projects, from landing pages to complex web applications."
      },
      "gallery": {
        "ravedates": {
          "desc1": "Developed over 20 screens, from ticket purchasing flows to event management and configuration dashboards.",
          "desc2": "Built with Next.js. Participated in the development of complex features and user experience optimization.",
          "desc3": "Worked in a multidisciplinary team, collaborating with designers, backend developers, and stakeholders throughout the development lifecycle.",
          "desc4": "Video demonstration of the platform in action."
        },
        "dymo": {
          "desc1": "Designed and developed a web help center from scratch to centralize documentation, resources, and support for users.",
          "desc2": "Implemented modern, responsive, and optimized interfaces to improve navigation and accessibility.",
          "desc3": "Participated in the development and evolution of digital tools, working alongside product and communication teams.",
          "desc4": "Video demonstration of the platform in action."
        },
        "freelance": {
          "desc1": "Development of a corporate website focused on building trust, presenting services, and facilitating contact with potential clients.",
          "desc2": "Implemented a modern and responsive experience, prioritizing performance, design, and digital brand presence.",
          "desc3": "Design and development of a website aimed at showcasing services, strengthening brand identity, and facilitating customer acquisition.",
          "desc4": "Developed an attractive and optimized interface to clearly communicate the product and maximize user conversion."
        }
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
        "p4": "Note: I built this portfolio's AI Assistant from scratch with the Gemini API. Try it out in the bottom-right corner!",
        "tag": "Naza loves chocolate"
      },
      "contact": {
        "title": "Let's Talk",
        "subtitle1": "Do you have a job opportunity or a project in mind?",
        "subtitle2": "I'd love to hear about it.",
        "btn_cv": "View Resume",
        "footer": "Made with"
      },
      "chatbot": {
        "welcome": "Hi! I'm Nazareno's AI assistant. Do you have any questions about his experience, projects, or availability?",
        "suggested_1": "Summarize his profile",
        "suggested_2": "Tell me about his projects",
        "suggested_3": "How can I contact Nazareno?",
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
        "description": "What people I've worked with say.",

        "agustin_position": "Backend Developer",
        "agustin_text": "Working with Nazareno was a pleasure. He has strong technical skills and works exceptionally well with others. He consistently suggests improvements, solves problems before they grow, and is always willing to support the team. I highly recommend him.",

        "javier_position": "Founder & CEO at Dymo",
        "javier_text": "I had the pleasure of working with Nazareno on the redesign and development of our Help Center. He quickly understood our needs, built an intuitive user experience, and delivered high-quality work. His attention to detail and commitment exceeded our expectations.",

        "alex_position": "Technical Leader",
        "alex_text": "It was a pleasure working with Nazareno. He was always ready to solve challenges, support the team, and step in whenever needed. He has strong technical skills, learns quickly, and brings a positive attitude that makes him a great teammate.",

        "marcelo_position": "Backend Developer | Co-founder of Naztro",
        "marcelo_text": "Starting Naztro with Nazareno was a great experience. He consistently showed commitment, responsibility, and a proactive attitude. Along with his strong technical skills, he brings valuable ideas, looks for ways to improve, and creates a great environment for the team.",

        "javier_taboada_position": "Project Manager at Rave Dates",
        "javier_taboada_text": "Nazareno is an outstanding teammate: experienced, proactive, and collaborative. He always looks for solutions, suggests improvements, and contributes beyond his responsibilities. His commitment and teamwork make him someone who adds real value to any project."
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
