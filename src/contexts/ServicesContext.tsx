import { createContext, useCallback, useReducer } from "react";
import { ServicesErrorType } from "../utils/Types/utilTypes.ts";
import supabase from "../utils/supabase.ts";

// Types
import { Service } from "../utils/Types/modelTypes.ts";

interface State {
  servicesLoading: boolean;
  serviceLoading: boolean;
  services: Service[] | [];
  service: Service | null;
  servicesError: ServicesErrorType | null;
}

type Action =
  | { type: "services/loading" }
  | { type: "service/loading" }
  | { type: "services/loaded"; payload: Service[] }
  | { type: "service/loaded"; payload: Service }
  | { type: "services/failedToLoad" }
  | { type: "service/failedToLoad" };

interface ServicesContextType extends State {
  getServicesList: () => Promise<void>;
  getService: (id: number) => Promise<void>;
}

// Context
const initialState: State = {
  servicesLoading: false,
  serviceLoading: false,
  services: [],
  service: null,
  servicesError: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "services/loading":
      return { ...state, servicesLoading: true, servicesError: null };
    case "service/loading":
      return { ...state, serviceLoading: true, servicesError: null };
    case "services/loaded":
      return {
        ...state,
        servicesLoading: false,
        servicesError: null,
        services: action.payload,
      };
    case "service/loaded":
      return {
        ...state,
        serviceLoading: false,
        servicesError: null,
        service: action.payload,
      };
    case "services/failedToLoad":
      return {
        ...state,
        servicesLoading: false,
        servicesError: "Services failed to load." as ServicesErrorType,
      };
    case "service/failedToLoad":
      return {
        ...state,
        serviceLoading: false,
        servicesError: "Service failed to load." as ServicesErrorType,
      };
    default:
      throw new Error(`ERROR: Unknown action type of ${action}!`);
  }
}

const ServicesContext = createContext<ServicesContextType | null>(null);

export default function ServicesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    { services, service, servicesLoading, serviceLoading, servicesError },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getServicesList = useCallback(async () => {
    dispatch({ type: "services/loading" });
    console.log("Fetching services!");

    const { data: Services, error } = await supabase.rpc(
      "services_inventory_query"
    );

    if (Services) {
      dispatch({ type: "services/loaded", payload: Services });
      console.log("Successfully fetched services!");
    } else {
      dispatch({ type: "services/failedToLoad" });
      throw new Error(`ERROR: ${error?.message}`);
    }
  }, [services]);

  const getService = useCallback(
    async (targetId: number) => {
      if (service?.id && service?.id == targetId) {
        console.log(
          `Service #${service.id} is already fetched, skipping fetch!`
        );
        return;
      }
      dispatch({ type: "service/loading" });
      console.log("Fetching service!");

      const { data: Service, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", targetId)
        .single();
      if (Service) {
        dispatch({ type: "service/loaded", payload: Service });
        console.log("Successfully fetched service!");
      } else {
        dispatch({ type: "service/failedToLoad" });
        throw new Error(`ERROR: ${error?.message}`);
      }
    },
    [service]
  );

  return (
    <ServicesContext.Provider
      value={{
        services,
        service,
        servicesError,
        serviceLoading,
        servicesLoading,
        getService,
        getServicesList,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export { ServicesContext };
