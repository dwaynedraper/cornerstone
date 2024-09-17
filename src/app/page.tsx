import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Image from "next/image";
import HeroTwo from "@/components/HeroTwo";
import Content from "@/components/Content";
import ImageSection from "@/components/ImageSection";
import Values from "@/components/Values";
import LogoCloud from "@/components/LogoCloud";
import Team from "@/components/Team";
import MyCarousel from "@/components/Carousel";
import { getImagesByFolder } from "@/utils/cloudinary"; // Ensure this path is correct
import OurServices from "@/components/OurServices";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-white">
      <main className="isolate">
        <Hero />
        <OurServices />
        <ImageSection
          image={{
            src: "https://img.freepik.com/free-photo/portrait-male-engineer-working-field-engineers-day-celebration_23-2151615117.jpg?t=st=1726604995~exp=1726608595~hmac=08822033b9210b4df6f4c9b8b463b914a3671312d847fbbdd29ddf08710f0d7a&w=1480",
            alt: "",
          }}
        />
        <WhyChooseUs />
        <ImageSection
          image={{
            src: "https://img.freepik.com/free-photo/image-engineering-objects-workplace-top-view-construction-concept-engineering-tools-vintage-tone-retro-filter-effect-soft-focus-selective-focus_1418-704.jpg?w=1480&t=st=1726605600~exp=1726606200~hmac=bc9f888b1de9ae9c2994e8ae955990f5ee7c6a7581310d5685d0a521106f57b7",
            alt: "",
          }}
        />
        <Footer />
      </main>
    </div>
  );
}
