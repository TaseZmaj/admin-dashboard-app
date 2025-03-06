import { useReducer, createContext } from "react";

type User = {
  username: string;
  password: string;
} | null;

type State = {
  user: User;
  isAuthenticated: boolean;
};

type Action =
  | { type: "login"; payload: User }
  | { type: "logout" }
  | { type: "changePassword"; payload: string };

type AuthContextType =
  | {
      user: User;
      isAuthenticated: boolean;
      logIn: (username: string, password: string) => void;
      logOut: () => void;
      changePassword: (password: string) => void;
    }
  | undefined;

const AuthContext = createContext<AuthContextType>(undefined);

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return initialState;
    case "changePassword":
      if (state.user)
        return {
          ...state,
          user: { username: state.user.username, password: action.payload },
        };
      return state;
    default:
      throw new Error("Invalid action type");
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;

  function logIn(username: string, password: string) {
    if (
      username === ADMINISTRATOR_USER.username &&
      password === ADMINISTRATOR_USER.password
    )
      dispatch({ type: "login", payload: { username, password } });
  }
  function logOut() {
    dispatch({ type: "logout" });
  }
  function changePassword(newPassword: string) {
    if (state.user) dispatch({ type: "changePassword", payload: newPassword });
  }

  return (
    <AuthContext
      value={{
        user,
        isAuthenticated,
        logIn,
        logOut,
        changePassword,
      }}
    >
      {children}
    </AuthContext>
  );
}

// TODO: create .env to store Administrator password and username
const ADMINISTRATOR_USER = {
  username: "Stefan Tasevski",
  password: "password",
  avatar: "",
};

export default AuthProvider;
export { AuthContext };
