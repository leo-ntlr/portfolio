// All portfolio content lives here. Replace every [PLACEHOLDER] with your own
// information; each text has an English (en) and a French (fr) version.

export type Lang = "en" | "fr";
export type Text = Record<Lang, string>;

export type RoleId =
  | "dev"
  | "soft"
  | "data"
  | "ai"
  | "net"
  | "support"
  | "consult"
  | "design";

export interface Role {
  id: RoleId;
  label: Text;
  short: Text;
  pitch: Text;
  /** Four lines shown in the Profile card: focus, tools, track record, availability. */
  facts: [Text, Text, Text, Text];
  /** Technologies and tools for this profile, shown as chips under the Profile card. */
  stack: Text[];
  /** SVG path (24×24 viewBox, stroked) used on the cube face. */
  icon: string;
}

export interface Project {
  title: Text;
  category: Text;
  summary: Text;
  tech: string[];
  roles: RoleId[];
  /** Image path under /public, e.g. "/projects/dashboard.png". Empty shows a placeholder. */
  image: string;
  caseStudyUrl: string;
  githubUrl: string;
}

export interface Experience {
  dates: Text;
  title: Text;
  /** Organization; a Text when it needs translating, empty when there is none. */
  company: string | Text;
  city: string;
  summary: Text;
}

export interface Degree {
  dates: Text;
  degree: Text;
  school: Text;
  details: Text;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url: string;
  roles: RoleId[];
}

export const profile = {
  name: { en: "Leonel Ryan Ntuh Takam", fr: "Leonel Ryan Ntuh Takam" } as Text,
  initials: "leo_ntlr",
  email: "ryantakam12@gmail.com",
  city: { en: "Anywhere, remote or on site", fr: "Partout, à distance ou sur place" } as Text,
  /** Professional photo under /public, e.g. "/photo.jpg". Empty shows a placeholder. */
  photo: "/photo.jpg",
  links: {
    linkedin: "https://www.linkedin.com/in/ryan-takam",
    github: "https://github.com/leo-ntlr",
    cv: "/cv.pdf",
  },
  headline: {
    en: ["Complex problems.", "Simple solutions."],
    fr: ["Problèmes complexes.", "Solutions simples."],
  } as Record<Lang, [string, string]>,
  /** Availability line shown to the assistant and in the hero. */
  availability: {
    en: "Available now, for remote or on-site roles, anywhere.",
    fr: "Disponible immédiatement, à distance ou sur place, partout.",
  } as Text,
};

export const roles: Role[] = [
  {
    id: "dev",
    label: { en: "Web & mobile dev", fr: "Dev web et mobile" },
    short: { en: "web & mobile", fr: "web et mobile" },
    pitch: {
      en: "Web and mobile developer who ships clean, fast apps end to end, from database to the screen in your pocket.",
      fr: "Développeur web et mobile qui livre des applications rapides et propres, de la base de données jusqu'à l'écran du téléphone.",
    },
    facts: [
      { en: "Web and mobile applications", fr: "Applications web et mobiles" },
      { en: "React, Next.js, TypeScript, Node.js, React Native", fr: "React, Next.js, TypeScript, Node.js, React Native" },
      { en: "[N] production projects", fr: "[N] projets en production" },
      { en: "Available now", fr: "Disponible immédiatement" },
    ],
    stack: [
      { en: "JavaScript", fr: "JavaScript" },
      { en: "TypeScript", fr: "TypeScript" },
      { en: "HTML", fr: "HTML" },
      { en: "CSS", fr: "CSS" },
      { en: "React", fr: "React" },
      { en: "Next.js", fr: "Next.js" },
      { en: "Vue.js", fr: "Vue.js" },
      { en: "Node.js", fr: "Node.js" },
      { en: "Tailwind CSS", fr: "Tailwind CSS" },
      { en: "React Native", fr: "React Native" },
      { en: "Flutter / Dart", fr: "Flutter / Dart" },
      { en: "Kotlin", fr: "Kotlin" },
    ],
    icon: "M8 6l-6 6 6 6M16 6l6 6-6 6",
  },
  {
    id: "soft",
    label: { en: "Software dev", fr: "Dev logiciel" },
    short: { en: "software", fr: "logiciels" },
    pitch: {
      en: "I build reliable software and desktop tools that automate the work and keep running.",
      fr: "Je développe des logiciels et des outils fiables qui automatisent le travail et tiennent dans la durée.",
    },
    facts: [
      { en: "Software and desktop applications", fr: "Logiciels et applications de bureau" },
      { en: "Java, C#, C++, Python, Laravel", fr: "Java, C#, C++, Python, Laravel" },
      { en: "[N] software projects", fr: "[N] projets logiciels" },
      { en: "Available now", fr: "Disponible immédiatement" },
    ],
    stack: [
      { en: "Java", fr: "Java" },
      { en: "C#", fr: "C#" },
      { en: "C++", fr: "C++" },
      { en: "C", fr: "C" },
      { en: "Python", fr: "Python" },
      { en: "Laravel", fr: "Laravel" },
      { en: "SQL", fr: "SQL" },
      { en: "Git", fr: "Git" },
    ],
    icon: "M3 4h18v12H3zM8 20h8M12 16v4M7 8l2 2-2 2M11 12h4",
  },
  {
    id: "data",
    label: { en: "Data analyst", fr: "Analyste de données" },
    short: { en: "data", fr: "data" },
    pitch: {
      en: "I turn raw data into decisions: clean pipelines, clear dashboards and answers people act on.",
      fr: "Je transforme les données brutes en décisions : pipelines propres, tableaux de bord clairs et réponses concrètes.",
    },
    facts: [
      { en: "Analysis and dashboards", fr: "Analyse et tableaux de bord" },
      { en: "SQL, Python, R, Tableau, Pandas", fr: "SQL, Python, R, Tableau, Pandas" },
      { en: "[N] data projects", fr: "[N] projets data" },
      { en: "Available now", fr: "Disponible immédiatement" },
    ],
    stack: [
      { en: "SQL", fr: "SQL" },
      { en: "Python", fr: "Python" },
      { en: "R", fr: "R" },
      { en: "Excel", fr: "Excel" },
      { en: "Tableau", fr: "Tableau" },
      { en: "Pandas", fr: "Pandas" },
      { en: "NumPy", fr: "NumPy" },
      { en: "Matplotlib / Seaborn", fr: "Matplotlib / Seaborn" },
      { en: "Jupyter", fr: "Jupyter" },
      { en: "PostgreSQL", fr: "PostgreSQL" },
      { en: "MySQL", fr: "MySQL" },
    ],
    icon: "M4 20V10M10 20V4M16 20v-7M2 20h20",
  },
  {
    id: "ai",
    label: { en: "AI / ML", fr: "IA / ML" },
    short: { en: "AI", fr: "IA" },
    pitch: {
      en: "I design practical AI solutions, from model to product, that solve real business problems.",
      fr: "Je conçois des solutions IA concrètes, du modèle au produit, qui règlent de vrais problèmes métier.",
    },
    facts: [
      { en: "Applied AI and LLM applications", fr: "IA appliquée et applications LLM" },
      { en: "Python, PyTorch, TensorFlow, scikit-learn, LLM APIs", fr: "Python, PyTorch, TensorFlow, scikit-learn, API LLM" },
      { en: "[N] AI solutions", fr: "[N] solutions IA" },
      { en: "Available now", fr: "Disponible immédiatement" },
    ],
    stack: [
      { en: "Python", fr: "Python" },
      { en: "scikit-learn", fr: "scikit-learn" },
      { en: "TensorFlow", fr: "TensorFlow" },
      { en: "PyTorch", fr: "PyTorch" },
      { en: "API LLM (Claude, OpenAI)", fr: "API LLM (Claude, OpenAI)" },
      { en: "Pandas", fr: "Pandas" },
      { en: "NumPy", fr: "NumPy" },
      { en: "OpenCV", fr: "OpenCV" },
    ],
    icon: "M12 2v4M12 18v4M2 12h4M18 12h4M7 7h10v10H7zM10 10h4v4h-4z",
  },
  {
    id: "net",
    label: { en: "Networking", fr: "Réseautique" },
    short: { en: "network", fr: "réseau" },
    pitch: {
      en: "I design, secure and automate networks that stay up, with infrastructure as code.",
      fr: "Je conçois, sécurise et automatise des réseaux fiables, avec l'infrastructure as code.",
    },
    facts: [
      { en: "Network and infrastructure", fr: "Réseau et infrastructure" },
      { en: "Cisco IOS, routing and switching, firewalls, VPN, Windows Server", fr: "Cisco IOS, routage et commutation, pare-feu, VPN, Windows Server" },
      { en: "[YOUR CERTIFICATIONS]", fr: "[VOS CERTIFICATIONS]" },
      { en: "Available now", fr: "Disponible immédiatement" },
    ],
    stack: [
      { en: "Cisco IOS", fr: "Cisco IOS" },
      { en: "TCP/IP", fr: "TCP/IP" },
      { en: "Routing (OSPF, EIGRP, BGP)", fr: "Routage (OSPF, EIGRP, BGP)" },
      { en: "VLANs and switching", fr: "VLAN et commutation" },
      { en: "Firewalls (pfSense, Fortinet)", fr: "Pare-feu (pfSense, Fortinet)" },
      { en: "VPN", fr: "VPN" },
      { en: "Packet Tracer / GNS3", fr: "Packet Tracer / GNS3" },
      { en: "Windows Server", fr: "Windows Server" },
      { en: "Linux", fr: "Linux" },
      { en: "DNS / DHCP", fr: "DNS / DHCP" },
      { en: "Wi-Fi", fr: "Wi-Fi" },
      { en: "PowerShell / Bash", fr: "PowerShell / Bash" },
    ],
    icon: "M10 2h4v4h-4zM3 18h4v4H3zM17 18h4v4h-4zM12 6v6M5 18v-3h14v3",
  },
  {
    id: "support",
    label: { en: "IT support & maintenance", fr: "Maintenance informatique" },
    short: { en: "maintenance", fr: "maintenance" },
    pitch: {
      en: "I keep machines and software healthy: diagnosis, repair, updates and support people can count on.",
      fr: "Je garde le matériel et les logiciels en bonne santé : diagnostic, réparation, mises à jour et support fiable.",
    },
    facts: [
      { en: "Hardware and software maintenance", fr: "Maintenance matérielle et logicielle" },
      { en: "Windows, macOS, Linux, Active Directory, Microsoft 365", fr: "Windows, macOS, Linux, Active Directory, Microsoft 365" },
      { en: "[N] machines or users supported", fr: "[N] postes ou utilisateurs suivis" },
      { en: "Available now", fr: "Disponible immédiatement" },
    ],
    stack: [
      { en: "Windows 10 / 11", fr: "Windows 10 / 11" },
      { en: "macOS", fr: "macOS" },
      { en: "Linux", fr: "Linux" },
      { en: "Microsoft 365", fr: "Microsoft 365" },
      { en: "Active Directory", fr: "Active Directory" },
      { en: "PowerShell", fr: "PowerShell" },
      { en: "PC building and repair", fr: "Montage et réparation de PC" },
      { en: "Printers and peripherals", fr: "Imprimantes et périphériques" },
      { en: "Backup and restore", fr: "Sauvegarde et restauration" },
      { en: "Antivirus and endpoint security", fr: "Antivirus et sécurité du poste" },
      { en: "Networking basics (TCP/IP)", fr: "Réseau de base (TCP/IP)" },
      { en: "Virtualisation (VMware, Hyper-V)", fr: "Virtualisation (VMware, Hyper-V)" },
      { en: "Remote support (TeamViewer, AnyDesk)", fr: "Prise en main à distance (TeamViewer, AnyDesk)" },
    ],
    icon: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z",
  },
  {
    id: "consult",
    label: { en: "IT consulting", fr: "Conseil en informatique" },
    short: { en: "consulting", fr: "conseil" },
    pitch: {
      en: "I listen to the business, find the real problem, and deliver the technical solution that fits.",
      fr: "J'écoute le métier, je trouve le vrai problème et je livre la solution technique adaptée.",
    },
    facts: [
      { en: "Audit and solution design", fr: "Audit et conception de solutions" },
      { en: "Requirements analysis, Agile / Scrum, AWS, Azure, cybersecurity", fr: "Analyse des besoins, Agile / Scrum, AWS, Azure, cybersécurité" },
      { en: "[N] client missions", fr: "[N] missions client" },
      { en: "Available now", fr: "Disponible immédiatement" },
    ],
    stack: [
      { en: "Requirements analysis", fr: "Analyse des besoins" },
      { en: "Agile / Scrum project management", fr: "Gestion de projet Agile / Scrum" },
      { en: "Specifications writing", fr: "Cahier des charges" },
      { en: "AWS", fr: "AWS" },
      { en: "Microsoft Azure", fr: "Microsoft Azure" },
      { en: "Cybersecurity (ISO 27001)", fr: "Cybersécurité (ISO 27001)" },
      { en: "Advanced Excel", fr: "Excel avancé" },
      { en: "Training and presenting", fr: "Formation et présentation" },
    ],
    icon: "M3 7h18v13H3zM8 7V4h8v3M3 13h18",
  },
  {
    id: "design",
    label: { en: "UI design", fr: "Design UI" },
    short: { en: "design", fr: "design" },
    pitch: {
      en: "I design interfaces people understand at first glance, and I can build them too.",
      fr: "Je conçois des interfaces compréhensibles au premier coup d'œil, et je sais aussi les coder.",
    },
    facts: [
      { en: "UI/UX and prototyping", fr: "UI/UX et prototypage" },
      { en: "Figma, Adobe XD, Photoshop, Illustrator, Framer", fr: "Figma, Adobe XD, Photoshop, Illustrator, Framer" },
      { en: "[N] interfaces", fr: "[N] interfaces" },
      { en: "Available now", fr: "Disponible immédiatement" },
    ],
    stack: [
      { en: "Figma", fr: "Figma" },
      { en: "Adobe XD", fr: "Adobe XD" },
      { en: "Photoshop", fr: "Photoshop" },
      { en: "Illustrator", fr: "Illustrator" },
      { en: "Canva", fr: "Canva" },
      { en: "Framer", fr: "Framer" },
      { en: "Design system", fr: "Design system" },
      { en: "User research", fr: "Recherche utilisateur" },
      { en: "Typography and color", fr: "Typographie et couleur" },
      { en: "HTML / CSS", fr: "HTML / CSS" },
      { en: "After Effects (animations)", fr: "After Effects (animations)" },
    ],
    icon: "M3 21l3-1 12-12-2-2L4 18zM14 6l2 2M15 3l6 6",
  },
];

export const stats: { value: string; label: Text }[] = [
  { value: "[N]", label: { en: "projects shipped", fr: "projets livrés" } },
  { value: "2", label: { en: "internships completed", fr: "stages réalisés" } },
  // Counted from the role stacks above.
  { value: `${new Set(roles.flatMap((r) => r.stack.map((t) => t.en))).size}+`, label: { en: "technologies and tools mastered", fr: "technologies et outils maîtrisés" } },
  { value: "[N]", label: { en: "AI solutions delivered", fr: "solutions IA livrées" } },
];

const projectSummary: Text = {
  en: "[One sentence: the problem, what you built, and the result.]",
  fr: "[Une phrase : le problème, ce que vous avez construit, et le résultat.]",
};

export const projects: Project[] = [
  { title: { en: "[MOBILE APP PROJECT]", fr: "[PROJET APPLICATION MOBILE]" }, category: { en: "Mobile · iOS / Android", fr: "Mobile · iOS / Android" }, summary: projectSummary, tech: ["[MOBILE FRAMEWORK]", "[BACK-END]", "[STORE]"], roles: ["dev", "design"], image: "", caseStudyUrl: "#", githubUrl: "#" },
  { title: { en: "[SOFTWARE PROJECT]", fr: "[PROJET LOGICIEL]" }, category: { en: "Software · desktop", fr: "Logiciel · bureau" }, summary: projectSummary, tech: ["[LANGUAGE]", "[FRAMEWORK]", "[DATABASE]"], roles: ["soft", "dev"], image: "", caseStudyUrl: "#", githubUrl: "#" },
  { title: { en: "[MAINTENANCE / IT SUPPORT MISSION]", fr: "[MISSION MAINTENANCE / SUPPORT]" }, category: { en: "Hardware · software · support", fr: "Matériel · logiciel · support" }, summary: projectSummary, tech: ["[SYSTEMS]", "[DIAGNOSTICS]", "[TOOLS]"], roles: ["support", "net"], image: "", caseStudyUrl: "#", githubUrl: "#" },
  { title: { en: "[WEB APP PROJECT]", fr: "[PROJET APPLICATION WEB]" }, category: { en: "Full-stack · web", fr: "Full-stack · web" }, summary: projectSummary, tech: ["[FRONT-END]", "[BACK-END]", "[DATABASE]"], roles: ["dev", "design"], image: "", caseStudyUrl: "#", githubUrl: "#" },
  { title: { en: "[DASHBOARD PROJECT]", fr: "[PROJET TABLEAU DE BORD]" }, category: { en: "Data · analytics", fr: "Données · analyse" }, summary: projectSummary, tech: ["[SQL]", "[PYTHON]", "[BI]"], roles: ["data", "consult"], image: "", caseStudyUrl: "#", githubUrl: "#" },
  { title: { en: "[AI SOLUTION PROJECT]", fr: "[PROJET SOLUTION IA]" }, category: { en: "AI · automation", fr: "IA · automatisation" }, summary: projectSummary, tech: ["[MODEL / API]", "[PYTHON]", "[DEPLOY]"], roles: ["ai", "dev", "consult"], image: "", caseStudyUrl: "#", githubUrl: "#" },
  { title: { en: "[NETWORK PROJECT]", fr: "[PROJET RÉSEAU]" }, category: { en: "Network · infrastructure", fr: "Réseau · infrastructure" }, summary: projectSummary, tech: ["[ROUTING]", "[SECURITY]", "[AUTOMATION]"], roles: ["net"], image: "", caseStudyUrl: "#", githubUrl: "#" },
  { title: { en: "[INTERNSHIP DELIVERABLE]", fr: "[LIVRABLE DE STAGE]" }, category: { en: "Client mission", fr: "Mission client" }, summary: projectSummary, tech: ["[TOOL]", "[TOOL]", "[TOOL]"], roles: ["consult", "net", "data", "support"], image: "", caseStudyUrl: "#", githubUrl: "#" },
  { title: { en: "[UI / PROTOTYPE PROJECT]", fr: "[PROJET UI / PROTOTYPE]" }, category: { en: "Design · interface", fr: "Design · interface" }, summary: projectSummary, tech: ["[DESIGN TOOL]", "[FRAMEWORK]"], roles: ["design", "dev"], image: "", caseStudyUrl: "#", githubUrl: "#" },
];

export const experience: Experience[] = [
  {
    dates: { en: "Present", fr: "Aujourd'hui" },
    title: { en: "Founder and CEO", fr: "Fondateur et PDG" },
    company: "Nexorithm",
    city: "",
    summary: {
      en: "I lead an IT consulting startup and its team: AI consulting that helps SMBs automate repetitive tasks, AI and data strategy, data consulting, IT security, custom development, and cloud and IT consulting.",
      fr: "Je dirige une startup de services-conseils en informatique et son équipe : conseil en IA pour aider les PME à automatiser leurs tâches répétitives, stratégie IA et données, conseil en données, sécurité informatique, développement sur mesure, infonuagique et TI.",
    },
  },
  {
    dates: { en: "Present", fr: "Aujourd'hui" },
    title: { en: "Researcher in financial and data analysis", fr: "Chercheur en analyse financière et analyse de données" },
    company: "",
    city: "",
    summary: {
      en: "Financial analysis and data analysis to support data-driven decision making.",
      fr: "Analyse financière et analyse de données pour appuyer une prise de décision fondée sur les données.",
    },
  },
  {
    dates: { en: "Summer 2026", fr: "Été 2026" },
    title: { en: "Research intern", fr: "Stagiaire chercheur" },
    company: "Université du Québec en Outaouais (UQO)",
    city: "",
    summary: {
      en: "Trained and evaluated machine learning and deep learning models, and wrote Python scripts to automate the data processing pipeline.",
      fr: "Entraînement et évaluation de modèles d'apprentissage automatique et profond, et scripts Python pour automatiser le pipeline de traitement des données.",
    },
  },
  {
    dates: { en: "2025 — 2026", fr: "2025 — 2026" },
    title: { en: "Computer science and French tutor", fr: "Tuteur en informatique et en français" },
    company: "Cégep de Saint-Jérôme",
    city: "",
    summary: {
      en: "One-on-one support for students in programming and French: explaining complex concepts clearly and helping them solve problems.",
      fr: "Accompagnement personnalisé d'étudiants en programmation et en français : explication claire de concepts complexes et aide à la résolution de problèmes.",
    },
  },
  {
    dates: { en: "2024", fr: "2024" },
    title: { en: "IT consulting intern", fr: "Stagiaire consultant en informatique" },
    company: "Datnek",
    city: "",
    summary: {
      en: "Analyzed clients' IT needs, proposed suitable solutions, and designed and built websites.",
      fr: "Analyse des besoins informatiques des clients, proposition de solutions adaptées, conception et développement de sites web.",
    },
  },
  {
    dates: { en: "2022 — present", fr: "2022 — aujourd'hui" },
    title: { en: "Web developer", fr: "Développeur web" },
    company: "Freelance",
    city: "",
    summary: {
      en: "Websites and web apps from mockup to launch, with debugging, optimization and end-to-end project management.",
      fr: "Sites et applications web de la maquette à la mise en ligne, avec débogage, optimisation et gestion de projet de A à Z.",
    },
  },
  {
    dates: { en: "2024 — 2025", fr: "2024 — 2025" },
    title: { en: "General manager (volunteer)", fr: "Gérant polyvalent (bénévole)" },
    company: "Fondation 4M",
    city: "",
    summary: {
      en: "Managed IT hardware and production equipment, and trained new volunteers on tools and procedures.",
      fr: "Gestion du matériel informatique et des équipements de production, et formation des nouveaux bénévoles aux outils et aux procédures.",
    },
  },
];

export const education: Degree[] = [
  {
    dates: { en: "2025 — 2028 (in progress)", fr: "2025 — 2028 (en cours)" },
    degree: { en: "DEC (Diploma of College Studies) in Computer Science Technology", fr: "DEC en techniques de l'informatique" },
    school: { en: "Cégep de Saint-Jérôme · Saint-Jérôme, QC", fr: "Cégep de Saint-Jérôme · Saint-Jérôme (Québec)" },
    details: { en: "Three-year technical program.", fr: "Programme technique de trois ans." },
  },
];

export const certifications: Certification[] = [
  { name: "[CERTIFICATION — e.g. CCNA]", issuer: "[Cisco]", year: "[YEAR]", url: "#", roles: ["net", "support"] },
  { name: "[CERTIFICATION — e.g. CompTIA A+]", issuer: "[CompTIA]", year: "[YEAR]", url: "#", roles: ["support"] },
  { name: "[CERTIFICATION — e.g. AWS Cloud Practitioner]", issuer: "[Amazon Web Services]", year: "[YEAR]", url: "#", roles: ["dev", "soft", "consult"] },
  { name: "[CERTIFICATION — e.g. Google Data Analytics]", issuer: "[Google]", year: "[YEAR]", url: "#", roles: ["data"] },
  { name: "[CERTIFICATION — e.g. Azure AI Fundamentals]", issuer: "[Microsoft]", year: "[YEAR]", url: "#", roles: ["ai", "data"] },
  { name: "[CERTIFICATION — e.g. Google UX Design]", issuer: "[Google]", year: "[YEAR]", url: "#", roles: ["design"] },
];

export const spokenLanguages: { name: Text; level: Text }[] = [
  { name: { en: "French", fr: "Français" }, level: { en: "Native", fr: "Langue maternelle" } },
  { name: { en: "English", fr: "Anglais" }, level: { en: "Excellent", fr: "Excellent" } },
];

export const awards: { year: string; text: Text }[] = [
  {
    year: "2026",
    text: {
      en: "Winner, LAVIA hackathon: an AI platform that adapts teachers' course content to the student groups in their classroom (neurodivergent students, international students…)",
      fr: "Gagnant du hackathon du LAVIA : une plateforme IA qui adapte le contenu pédagogique des enseignants aux groupes d'étudiants de leur classe (neurodivergents, étudiants internationaux…)",
    },
  },
  {
    year: "2026",
    text: {
      en: "Local winner for the Laurentides region, OSEntreprendre competition, with my clothing brand StreetRoots",
      fr: "Lauréat local pour la région des Laurentides au concours OSEntreprendre, avec ma marque de vêtements StreetRoots",
    },
  },
  {
    year: "2026",
    text: {
      en: "Top 50 of 208 participants, Association mathématique du Québec competition",
      fr: "Top 50 sur 208 participants au concours de l'Association mathématique du Québec",
    },
  },
];

/** Talks and exhibitions. */
export const talks: Text[] = [
  {
    en: "Speaker: presented my project on classifying white-matter tract trajectories to Cégep de Saint-Jérôme students",
    fr: "Conférencier : présentation de mon projet de classification de la trajectoire de la matière blanche aux étudiants du Cégep de Saint-Jérôme",
  },
  {
    en: "Exhibitor at the conference on the impact of AI on young people, Centre clinique de Montréal",
    fr: "Exposant à la conférence sur l'impact de l'IA chez les jeunes, Centre clinique de Montréal",
  },
];

/** Volunteering and community involvement. */
export const volunteering: Text[] = [
  { en: "Author of books that satirize social issues", fr: "Auteur de livres qui font la satire des faits sociaux" },
  { en: "Computer science tutor, Cégep de Saint-Jérôme", fr: "Tuteur en informatique, Cégep de Saint-Jérôme" },
  { en: "French tutor, Cégep de Saint-Jérôme", fr: "Tuteur en français, Cégep de Saint-Jérôme" },
  {
    en: "Member of the first cohort of the Research Track (Parcours recherche), Cégep de Saint-Jérôme: scientific research activities in various fields and company visits",
    fr: "Membre de la première cohorte du Parcours recherche du Cégep de Saint-Jérôme : activités de recherche scientifique dans divers domaines et visites en entreprise",
  },
  { en: "Member of the Quartier général de l'audace", fr: "Membre du Quartier général de l'audace" },
  { en: "Volunteer, L'École des grands", fr: "Bénévole à L'École des grands" },
  { en: "Volunteer, Fondation 4M", fr: "Bénévole pour la Fondation 4M" },
  { en: "Volunteer, Tim Hortons Foundation", fr: "Bénévole pour la Fondation Tim Hortons" },
  { en: "Participant, Gabriel-Major intercollegiate literature competition", fr: "Participant au concours de littérature intercollégial Gabriel-Major" },
];

/** Skills used by the search and by the assistant; each points to the role it belongs to. */
export const skills: { name: Text; role: RoleId; keywords: string }[] = [
  { name: { en: "Web development", fr: "Développement web" }, role: "dev", keywords: "react javascript typescript html css node frontend backend" },
  { name: { en: "Mobile apps", fr: "Applications mobiles" }, role: "dev", keywords: "mobile android ios flutter react native kotlin swift app" },
  { name: { en: "Software engineering", fr: "Génie logiciel" }, role: "soft", keywords: "software logiciel desktop java c# c++ python .net" },
  { name: { en: "Hardware & software maintenance", fr: "Maintenance matérielle et logicielle" }, role: "support", keywords: "maintenance hardware materiel repair reparation support helpdesk windows linux pc" },
  { name: { en: "Data analysis", fr: "Analyse de données" }, role: "data", keywords: "sql python excel power bi tableau pandas statistics" },
  { name: { en: "Machine learning", fr: "Machine learning" }, role: "ai", keywords: "ml ai ia llm deep learning tensorflow pytorch prediction" },
  { name: { en: "Networks", fr: "Réseaux" }, role: "net", keywords: "cisco routing switching tcp ip lan wan vpn reseau" },
  { name: { en: "Cloud", fr: "Cloud" }, role: "net", keywords: "aws azure gcp devops docker kubernetes" },
  { name: { en: "Cybersecurity", fr: "Cybersécurité" }, role: "net", keywords: "security securite firewall pentest soc" },
  { name: { en: "UI / UX", fr: "UI / UX" }, role: "design", keywords: "figma ux ui prototype" },
  { name: { en: "IT consulting", fr: "Conseil en informatique" }, role: "consult", keywords: "consulting conseil audit strategy" },
];
