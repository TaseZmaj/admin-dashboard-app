import { useTheme } from "@emotion/react";
import LightTranzitLogo from "../../assets/Tranzit logo belo v2.svg";
import DarkTranzitLogo from "../../assets/Tranzit logo crno v2.svg";

interface Props {
  size?: "tiny" | "small" | "medium" | "large" | "extra large";
}

const IMG_WIDTH = {
  tiny: "6rem",
  small: "8rem",
  medium: "10rem",
  large: "12.5rem",
  "extra large": "15rem",
};

export default function Logo({ size = "medium" }: Props) {
  let imgStyle = {
    width: IMG_WIDTH[size],
  };
  const theme = useTheme();

  return (
    <img
      style={imgStyle}
      src={theme.palette.mode === "dark" ? LightTranzitLogo : DarkTranzitLogo}
      alt="Tranzit Logo"
    />
  );
}
