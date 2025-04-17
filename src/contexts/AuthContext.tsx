import { useReducer, createContext } from "react";

//Types
interface State {
  username: string;
  isAuthenticated: boolean;
}

type Action = { type: "login"; payload: string } | { type: "logout" };

interface AuthContextType extends State {
  logIn: (username: string, password: string) => void;
  logOut: () => void;
}

// Context
const initialState: State = {
  username: "",
  isAuthenticated: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "login":
      return { ...state, username: action.payload, isAuthenticated: true };
    case "logout":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ username, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function logIn(username: string, password: string) {
    if (
      username === import.meta.env.VITE_ADMIN_USERNAME &&
      password === import.meta.env.VITE_ADMIN_PASSWORD
    )
      dispatch({ type: "login", payload: username });
  }
  function logOut() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext
      value={{
        username,
        isAuthenticated,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
export { AuthContext };
