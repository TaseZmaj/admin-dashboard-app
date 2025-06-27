import { useContext } from "react";
import { SalesChannelsContext } from "../contexts/SalesChannelsContext";

function useSalesChannels() {
  const context = useContext(SalesChannelsContext);
  if (!context)
    throw new Error(
      "ERROR: SalesChannelsContext was used outside of SalesChannelsProvider!"
    );
  return context;
}

export default useSalesChannels;
