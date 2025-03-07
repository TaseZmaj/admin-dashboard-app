import { createContext, useReducer } from "react";

interface State {
  error: boolean;
  errorMessage: string;
  // TODO: Maybe add another state here errorType, so you dont have to use .include in the
  //components
}

type Action =
  | { type: "usernameError"; payload: string }
  | { type: "passwordError"; payload: string }
  | {
      type: "resetError";
    };

interface ErrorContextType {
  error: boolean;
  errorMessage: string;
  usernameError: () => void;
  passwordError: () => void;
  resetErrors: () => void;
}

const initialState: State = {
  error: false,
  errorMessage: "",
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "usernameError":
      return { ...state, error: true };
    case "passwordError":
      return { ...state, error: true, errorMessage: action.payload };
    case "resetError":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
}

const ErrorContext = createContext<ErrorContextType | null>(null);

function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [{ error, errorMessage }, dispatch] = useReducer(reducer, initialState);

  function resetErrors() {
    dispatch({ type: "resetError" });
  }

  function usernameError() {
    dispatch({ type: "usernameError", payload: "Invalid username!" });
  }
  function passwordError() {
    dispatch({ type: "passwordError", payload: "Invalid password!" });
  }

  return (
    <ErrorContext
      value={{
        error,
        errorMessage,
        usernameError,
        passwordError,
        resetErrors,
      }}
    >
      {children}
    </ErrorContext>
  );
}

export default ErrorProvider;
export { ErrorContext };
