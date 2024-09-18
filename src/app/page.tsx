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
            src: "/subdivision.jpg",
            alt: "",
          }}
        />
        <WhyChooseUs />
        <ImageSection
          image={{
            src: "/engineer.jpg",
            alt: "",
          }}
        />
        <Footer />
      </main>
    </div>
  );
}
