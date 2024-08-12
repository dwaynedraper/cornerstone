import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Image from "next/image";
import HeroTwo from "@/components/HeroTwo";
import Content from "@/components/Content";
import ImageSection from "@/components/ImageSection";
import Values from "@/components/Values";
import LogoCloud from "@/components/LogoCloud";
import Team from "@/components/Team";

export default function Home() {
  return (
    <div className="bg-white">
      <main className="isolate">
        <Hero />
        <Content />
        <LogoCloud />
        <ImageSection />
        <Values />
        <HeroTwo />
      </main>
    </div>
  );
}
