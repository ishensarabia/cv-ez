import React from "react";
import logoImage from "../../assets/icons/CV-EZ_icon.png";

const Logo = ({
  vairant = "default", // default, dark
  size = "md", // sm, md, lg, xl or custom value
  className = "",
  alt = "CV-EZ Logo",
  onClick,
  ...props
}) => {
  // Size mapping for consistent sizing
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 56,
    xl: 80,
  };

  const logoSrc = logoImage;

  return (
    <img
      src={logoSrc}
      alt={alt}
      width={imageSize}
      height={imageSize}
      className={`block ${className} ${onClick ? "cursor-pointer" : ``}`}
      style={{
        width: `${imageSize}px`,
        height: `${imageSize}px`,
        objectFit: `contain`, // To prevent distortion of the image
      }}
      onClick={onClick}
      {...props}
    />
  );
};

export default Logo;
