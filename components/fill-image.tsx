import sanityClient from "@/lib/sanity";
import { SanityImage } from "@/types/data";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

interface FillImageProps {
  alt?: string;
  attribution?: string;
  className?: string;
  height?: number;
  image: SanityImage;
  width?: number;
}

export default function FillImage({
  alt = "",
  attribution = "",
  className = "",
  height = 210,
  image,
  width = 360,
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
      layout="responsive"
      width={width}
      height={height}
      loader={imageProps.loader}
      priority
      quality={80}
      src={imageProps.src}
      objectFit="cover"
      objectPosition="center center"
    />
  );
}
