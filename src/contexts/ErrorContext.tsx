import { useReducer, createContext } from "react";

interface State {
  error: boolean;
  errorType: ErrorType;
  errorMessage: string;
}

type Action =
  | {
      type: "loginError";
      payload: LoginErrorPayload;
    }
  | {
      type: "resetErrors";
    };

interface ErrorContextType extends State {
  loginError: (errorPackage: LoginErrorPayload) => void;
  resetErrors: () => void;
}

type ErrorType = "invalidUsername" | "invalidPassword" | "";

interface LoginErrorPayload {
  errorMessage: string;
  errorType: ErrorType;
}

const initialState: State = {
  error: false,
  errorMessage: "",
  errorType: "",
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "loginError":
      return {
        ...state,
        error: true,
        errorMessage: action.payload.errorMessage,
        errorType: action.payload.errorType,
      };
    case "resetErrors":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
}

const ErrorContext = createContext<ErrorContextType | null>(null);

export default function ErrorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ error, errorMessage, errorType }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function resetErrors() {
    dispatch({ type: "resetErrors" });
  }

  function loginError(errorPayload: LoginErrorPayload) {
    dispatch({ type: "loginError", payload: errorPayload });
  }

  return (
    <ErrorContext
      value={{
        error,
        errorType,
        errorMessage,
        loginError,
        resetErrors,
      }}
    >
      {children}
    </ErrorContext>
  );
}

export { ErrorContext };
