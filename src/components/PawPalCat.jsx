import { useEffect, useState } from "react";

const FALLBACK_IMAGE = "/pawpal/pawpal-placeholder.png";

export default function PawPalCat({ alt, className = "", point, type = "comic", onClick }) {
  const preferredSrc =
    type === "real"
      ? point.realCatImageSrc || FALLBACK_IMAGE
      : point.comicCatImageSrc || point.realCatImageSrc || FALLBACK_IMAGE;
  const [src, setSrc] = useState(preferredSrc);

  useEffect(() => {
    setSrc(preferredSrc);
  }, [preferredSrc]);

  return (
    <button className={`cat-image-button ${className}`} type="button" onClick={onClick}>
      <img
        src={src}
        alt={alt || point.catName}
        onError={() => setSrc(FALLBACK_IMAGE)}
      />
    </button>
  );
}
