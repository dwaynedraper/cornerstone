interface ImageSectionProps {
  image: {
    src: string;
    alt: string;
  };
}

export default function ImageSection({ image }: ImageSectionProps) {
  return (
    <div className="xl:mx-auto xl:max-w-7xl xl:px-8 pb-16">
      <img
        alt={image.alt}
        src={image.src}
        className="aspect-[5/2] w-full object-cover rounded-xl"
      />
    </div>
  );
}
