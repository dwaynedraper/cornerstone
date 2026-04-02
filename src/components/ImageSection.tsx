import Image from "next/image";

interface ImageSectionProps {
  image: {
    src: string;
    alt: string;
  };
}

export default function ImageSection({ image }: ImageSectionProps) {
  return (
    <div className="xl:mx-auto xl:max-w-7xl xl:px-8 py-8">
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <Image
          alt={image.alt}
          src={image.src}
          width={1920}
          height={768}
          className="aspect-[5/2] w-full object-cover"
        />
      </div>
    </div>
  );
}
