import TranzitLogo from "../../assets/Tranzit logo crno v2.svg";

interface Props {
  size: "small" | "medium" | "large";
}

export default function Logo({ size = "medium" }: Props) {
  let imgStyle = {};
  if (size === "small") imgStyle = { ...imgStyle, width: "150px" };
  if (size === "medium") imgStyle = { ...imgStyle, width: "200px" };
  if (size === "large") imgStyle = { ...imgStyle, width: "250px" };

  return <img style={imgStyle} src={TranzitLogo} />;
}
