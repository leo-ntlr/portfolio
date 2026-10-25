import { Assistant } from "@/components/Assistant";
import { CommandPalette } from "@/components/CommandPalette";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Contact, EducationSection, ExperienceSection, ProfileStats, Projects } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="container">
        <Hero />
        <ProfileStats />
        <Projects />
        <ExperienceSection />
        <EducationSection />
        <Assistant />
        <Contact />
      </main>
      <CommandPalette />
    </>
  );
}
