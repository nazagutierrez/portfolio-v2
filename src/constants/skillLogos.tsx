import type { LogoItem } from "@/components/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiFirebase,
  SiFigma,
  SiVite,
  SiGithub,
  SiCss3,
  SiHtml5,
  SiFramer,
} from "react-icons/si";

const iconStyle = (color: string) => ({
  fontSize: "inherit",
  color,
  filter: "drop-shadow(0 0 6px rgba(255,255,255,0.08))",
  transition: "filter 0.3s ease",
});

const WithTooltip = ({ children, title }: { children: React.ReactNode, title: string }) => (
  <div className="group/tooltip relative flex items-center justify-center cursor-default">
    {children}
    <div className="absolute -top-10 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-main-black/90 border border-main-white/10 text-main-white text-xs px-2.5 py-1.5 rounded-md pointer-events-none whitespace-nowrap z-50">
      {title}
    </div>
  </div>
);

export const skillLogos: LogoItem[] = [
  {
    node: <WithTooltip title="React"><SiReact style={iconStyle("#61DAFB")} /></WithTooltip>,
    title: "React",
  },
  {
    node: <WithTooltip title="Next.js"><SiNextdotjs style={iconStyle("#e9e9d5")} /></WithTooltip>,
    title: "Next.js",
  },
  {
    node: <WithTooltip title="TypeScript"><SiTypescript style={iconStyle("#3178C6")} /></WithTooltip>,
    title: "TypeScript",
  },
  {
    node: <WithTooltip title="JavaScript"><SiJavascript style={iconStyle("#F7DF1E")} /></WithTooltip>,
    title: "JavaScript",
  },
  {
    node: <WithTooltip title="TailwindCSS"><SiTailwindcss style={iconStyle("#06B6D4")} /></WithTooltip>,
    title: "TailwindCSS",
  },
  {
    node: <WithTooltip title="Node.js"><SiNodedotjs style={iconStyle("#339933")} /></WithTooltip>,
    title: "Node.js",
  },
  {
    node: <WithTooltip title="Git"><SiGit style={iconStyle("#F05032")} /></WithTooltip>,
    title: "Git",
  },
  {
    node: <WithTooltip title="Firebase"><SiFirebase style={iconStyle("#FFCA28")} /></WithTooltip>,
    title: "Firebase",
  },
  {
    node: <WithTooltip title="Figma"><SiFigma style={iconStyle("#F24E1E")} /></WithTooltip>,
    title: "Figma",
  },
  {
    node: <WithTooltip title="Vite"><SiVite style={iconStyle("#646CFF")} /></WithTooltip>,
    title: "Vite",
  },
  {
    node: <WithTooltip title="GitHub"><SiGithub style={iconStyle("#e9e9d5")} /></WithTooltip>,
    title: "GitHub",
  },
  {
    node: <WithTooltip title="CSS3"><SiCss3 style={iconStyle("#1572B6")} /></WithTooltip>,
    title: "CSS3",
  },
  {
    node: <WithTooltip title="HTML5"><SiHtml5 style={iconStyle("#E34F26")} /></WithTooltip>,
    title: "HTML5",
  },
  {
    node: <WithTooltip title="Framer Motion"><SiFramer style={iconStyle("#0055FF")} /></WithTooltip>,
    title: "Framer Motion",
  },
];
