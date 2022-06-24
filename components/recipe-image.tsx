import sanityClient from "@/lib/sanity";
import { SanityImage } from "@/types/data";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

interface RecipeImageProps {
  alt: string;
  className: string;
  image: SanityImage;
}

export default function RecipeImage({
  alt,
  className,
  image,
}: RecipeImageProps): JSX.Element | null {
  const imageProps = useNextSanityImage(sanityClient, image);

  if (!imageProps) {
    return null;
  }

  return (
    <Image
      alt={alt}
      className={className}
      layout="fill"
      loader={imageProps.loader}
      priority
      quality={80}
      sizes="(max-width: 1024px) 100vw, 320px"
      src={imageProps.src}
      objectFit="cover"
      objectPosition="center center"
    />
  );
}
