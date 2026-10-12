import { getImageProps } from "next/image";

export const unsplashPhoto = (id, width = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

// Optimised `image-set()` for CSS backgrounds, built from next/image's srcSet.
export function backgroundImageSet({ src, width, height }) {
  const {
    props: { srcSet = "" },
  } = getImageProps({ src, width, height, alt: "" });

  const candidates = srcSet.split(", ").map((candidate) => {
    const [url, density] = candidate.split(" ");
    return `url("${url}") ${density}`;
  });

  return `image-set(${candidates.join(", ")})`;
}
