import sanityClient from "@/lib/sanity";
import { SanityImage } from "@/types/data";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

interface FillImageProps {
  alt?: string;
  attribution?: string;
  className?: string;
  image: SanityImage;
}

export default function FillImage({
  alt,
  className,
  attribution,
  image,
}: FillImageProps): JSX.Element | null {
  const imageProps = useNextSanityImage(sanityClient, image);

  if (!imageProps) {
    return null;
  }

  return (
    <Image
      alt={alt}
      title={attribution}
      className={className}
      layout="fill"
      loader={imageProps.loader}
      priority
      quality={80}
      src={imageProps.src}
    />
  );
}
