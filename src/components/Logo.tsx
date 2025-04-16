import { useColorScheme } from "@mui/material";
import LightTranzitLogo from "../assets/logos/Tranzit logo belo v2.svg";
import DarkTranzitLogo from "../assets/logos/Tranzit logo crno v2.svg";
import { useNavigate } from "react-router";

interface LogoProps {
  size?: "tiny" | "small" | "medium" | "large" | "extra large";
  homeLink?: boolean;
}

const IMG_WIDTH = {
  tiny: "6rem",
  small: "8rem",
  medium: "10rem",
  large: "12.5rem",
  "extra large": "15rem",
};

// TODO: Fix logo size inconsistency between light and dark mode

export default function Logo({ size = "medium", homeLink = false }: LogoProps) {
  const navigate = useNavigate();
  let imgStyle = {
    width: IMG_WIDTH[size],
    cursor: homeLink ? "pointer" : "default",
  };

  // TODO: Make these 2 lines below an abstraction and add them to Utils
  const { mode, systemMode } = useColorScheme();
  const resolvedMode = (systemMode || mode) as "light" | "dark";

  return (
    <img
      onClick={homeLink ? () => navigate("/") : () => null}
      style={imgStyle}
      src={resolvedMode === "dark" ? LightTranzitLogo : DarkTranzitLogo}
      alt="Tranzit Logo"
    />
  );
}
