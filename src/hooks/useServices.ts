import { useContext } from "react";
import { ServicesContext } from "../contexts/ServicesContext";

function useServices() {
  const context = useContext(ServicesContext);
  if (!context)
    throw new Error(
      "ERROR: ServicesContext was used outside of ServicesProvider!"
    );
  return context;
}

export default useServices;
