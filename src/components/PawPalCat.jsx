import { useEffect, useState } from "react";

export default function PawPalCat({ alt, className = "", point, type = "comic", onClick }) {
  const preferredSrc =
    type === "real"
      ? point.realCatImageSrc
      : point.comicCatImageSrc || point.realCatImageSrc;
  const [src, setSrc] = useState(preferredSrc);
  const [hasImageError, setHasImageError] = useState(!preferredSrc);

  useEffect(() => {
    setSrc(preferredSrc);
    setHasImageError(!preferredSrc);
  }, [preferredSrc]);

  return (
    <button className={`cat-image-button ${className}`} type="button" onClick={onClick}>
      {hasImageError ? (
        <div className="pawpal" aria-label={alt || point.catName}>
          <div className="pawpal-ear pawpal-ear-left" />
          <div className="pawpal-ear pawpal-ear-right" />
          <div className="pawpal-face">
            <span className="pawpal-eye" />
            <span className="pawpal-eye" />
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt || point.catName}
          onError={() => setHasImageError(true)}
        />
      )}
    </button>
  );
}
