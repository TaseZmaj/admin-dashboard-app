import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";

function useErrors() {
  const context = useContext(ErrorContext);
  if (!context) throw new Error("ErrorContext was used outside ErrorProvider");
  return context;
}

export default useErrors;
