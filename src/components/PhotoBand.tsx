import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

/** Full-width project photo between sections, as on the live home page. */
export default function PhotoBand({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="bg-paper py-8 xl:mx-auto xl:max-w-7xl xl:px-8">
      <Reveal>
        <div className="relative aspect-[5/2] overflow-hidden rounded-md border border-ink/10 shadow-md">
          <Image src={src} alt={alt} fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
        </div>
      </Reveal>
    </section>
  );
}
