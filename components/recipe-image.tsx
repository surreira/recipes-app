import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import sanityClient from "../lib/sanity";
import { SanityImage } from "../typings";

interface ComponentProps {
  alt: string;
  className: string;
  image: SanityImage;
}

export const RecipeImage = ({ alt, className, image }: ComponentProps) => {
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
};
