import { ImgHTMLAttributes } from "react";

type AppLogoIconProps = ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
  alt?: string;
};

export default function AppLogoIcon({
  src = "/favicon.png",   
  alt = "App Logo",
  ...props
}: AppLogoIconProps) {
  return <img src={src} alt={alt} {...props} />;
}
