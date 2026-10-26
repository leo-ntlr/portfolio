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
  company: string;
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
  name: { en: "[YOUR NAME]", fr: "[VOTRE NOM]" } as Text,
  initials: "[YN]",
  email: "you@example.com",
  city: { en: "[YOUR CITY]", fr: "[VOTRE VILLE]" } as Text,
  /** Professional photo under /public, e.g. "/photo.jpg". Empty shows a placeholder. */
  photo: "/photo.jpg",
  links: {
    linkedin: "https://www.linkedin.com/in/[your-profile]",
    github: "https://github.com/[your-username]",
    cv: "/cv.pdf",
  },
  headline: {
    en: ["Complex problems.", "Simple solutions."],
    fr: ["Problèmes complexes.", "Solutions simples."],
  } as Record<Lang, [string, string]>,
  /** Availability line shown to the assistant and in the hero. */
  availability: {
    en: "Available from [START DATE], open to remote and relocation.",
    fr: "Disponible à partir du [DATE], ouvert au télétravail et à la mobilité.",
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
      { en: "[YOUR MAIN STACK]", fr: "[VOTRE STACK]" },
      { en: "[N] production projects", fr: "[N] projets en production" },
      { en: "Available from [START DATE]", fr: "Disponible à partir du [DATE]" },
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
      { en: "[YOUR LANGUAGES]", fr: "[VOS LANGAGES]" },
      { en: "[N] software projects", fr: "[N] projets logiciels" },
      { en: "Available from [START DATE]", fr: "Disponible à partir du [DATE]" },
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
      { en: "[SQL, PYTHON, BI TOOL]", fr: "[SQL, PYTHON, OUTIL BI]" },
      { en: "[N] data projects", fr: "[N] projets data" },
      { en: "Available from [START DATE]", fr: "Disponible à partir du [DATE]" },
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
      { en: "[YOUR AI STACK]", fr: "[VOTRE STACK IA]" },
      { en: "[N] AI solutions", fr: "[N] solutions IA" },
      { en: "Available from [START DATE]", fr: "Disponible à partir du [DATE]" },
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
      { en: "[YOUR NETWORK STACK]", fr: "[VOTRE STACK RÉSEAU]" },
      { en: "[YOUR CERTIFICATIONS]", fr: "[VOS CERTIFICATIONS]" },
      { en: "Available from [START DATE]", fr: "Disponible à partir du [DATE]" },
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
      { en: "[YOUR TOOLS AND SYSTEMS]", fr: "[VOS OUTILS ET SYSTÈMES]" },
      { en: "[N] machines or users supported", fr: "[N] postes ou utilisateurs suivis" },
      { en: "Available from [START DATE]", fr: "Disponible à partir du [DATE]" },
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
      { en: "[YOUR DOMAINS]", fr: "[VOS DOMAINES]" },
      { en: "[N] client missions", fr: "[N] missions client" },
      { en: "Available from [START DATE]", fr: "Disponible à partir du [DATE]" },
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
      { en: "[YOUR DESIGN TOOLS]", fr: "[VOS OUTILS DESIGN]" },
      { en: "[N] interfaces", fr: "[N] interfaces" },
      { en: "Available from [START DATE]", fr: "Disponible à partir du [DATE]" },
    ],
    icon: "M3 21l3-1 12-12-2-2L4 18zM14 6l2 2M15 3l6 6",
  },
];

export const stats: { value: string; label: Text }[] = [
  { value: "[N]", label: { en: "projects shipped", fr: "projets livrés" } },
  { value: "[N]", label: { en: "internships completed", fr: "stages réalisés" } },
  { value: "[N]", label: { en: "technologies in daily use", fr: "technologies utilisées au quotidien" } },
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

const jobSummary: Text = {
  en: "[What you did and what changed because of it.]",
  fr: "[Ce que vous avez fait et ce que ça a changé.]",
};
const jobDates: Text = { en: "[START] — [END]", fr: "[DÉBUT] — [FIN]" };

export const experience: Experience[] = [
  { dates: jobDates, title: { en: "[INTERNSHIP TITLE]", fr: "[INTITULÉ DU STAGE]" }, company: "[COMPANY]", city: "[CITY]", summary: jobSummary },
  { dates: jobDates, title: { en: "[INTERNSHIP TITLE]", fr: "[INTITULÉ DU STAGE]" }, company: "[COMPANY]", city: "[CITY]", summary: jobSummary },
  { dates: jobDates, title: { en: "[PROJECT OR ROLE TITLE]", fr: "[INTITULÉ DU PROJET OU DU POSTE]" }, company: "[COMPANY]", city: "[CITY]", summary: jobSummary },
];

export const education: Degree[] = [
  {
    dates: jobDates,
    degree: { en: "[DEGREE — e.g. Bachelor in Computer Science]", fr: "[DIPLÔME — ex. Baccalauréat en informatique]" },
    school: { en: "[SCHOOL / UNIVERSITY] · [CITY]", fr: "[ÉCOLE / UNIVERSITÉ] · [VILLE]" },
    details: { en: "[Specialization, honors, GPA or key courses.]", fr: "[Spécialisation, mention, moyenne ou cours clés.]" },
  },
  {
    dates: jobDates,
    degree: { en: "[DIPLOMA — e.g. Technical diploma in IT]", fr: "[DIPLÔME — ex. DEC en techniques de l'informatique]" },
    school: { en: "[SCHOOL] · [CITY]", fr: "[ÉCOLE] · [VILLE]" },
    details: { en: "[Specialization, honors or key courses.]", fr: "[Spécialisation, mention ou cours clés.]" },
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
  { name: { en: "French", fr: "Français" }, level: { en: "[LEVEL — e.g. Native]", fr: "[NIVEAU — ex. Langue maternelle]" } },
  { name: { en: "English", fr: "Anglais" }, level: { en: "[LEVEL — e.g. Fluent (C1)]", fr: "[NIVEAU — ex. Courant (C1)]" } },
];

export const awards: { year: string; text: Text }[] = [
  { year: "[YEAR]", text: { en: "[AWARD, HACKATHON OR COMPETITION]", fr: "[PRIX, HACKATHON OU COMPÉTITION]" } },
  { year: "[YEAR]", text: { en: "[VOLUNTEERING OR ASSOCIATION ROLE]", fr: "[BÉNÉVOLAT OU RÔLE ASSOCIATIF]" } },
  { year: "[YEAR]", text: { en: "[PUBLICATION, TALK OR OPEN-SOURCE CONTRIBUTION]", fr: "[PUBLICATION, CONFÉRENCE OU CONTRIBUTION OPEN SOURCE]" } },
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
