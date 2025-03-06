import { useReducer, createContext } from "react";

// Mozebi ke glavi so null
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
}

// TODO: create .env to store Administrator password and username

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return <AuthContext value={{ user, isAuthenticated }}></AuthContext>;
}

export default AuthProvider;
