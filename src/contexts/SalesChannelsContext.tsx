import { createContext, useCallback, useReducer } from "react";
import { SalesChannelsErrorType } from "../utils/Types/utilTypes.ts";
import supabase from "../utils/supabase.ts";

// Types
import { SalesChannel } from "../utils/Types/modelTypes.ts";

interface State {
  salesChannelsLoading: boolean;
  salesChannelLoading: boolean;
  salesChannels: SalesChannel[] | [];
  salesChannel: SalesChannel | null;
  salesChannelsError: SalesChannelsErrorType | null;
}

type Action =
  | { type: "salesChannels/loading" }
  | { type: "salesChannel/loading" }
  | { type: "salesChannels/loaded"; payload: SalesChannel[] }
  | { type: "salesChannel/loaded"; payload: SalesChannel }
  | { type: "salesChannels/failedToLoad" }
  | { type: "salesChannel/failedToLoad" };

interface SalesChannelsContextType extends State {
  getSalesChannelsList: () => Promise<void>;
  getSalesChannel: (id: number) => Promise<void>;
}

// Context
const initialState: State = {
  salesChannelsLoading: false,
  salesChannelLoading: false,
  salesChannels: [],
  salesChannel: null,
  salesChannelsError: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "salesChannels/loading":
      return { ...state, salesChannelsLoading: true, salesChannelsError: null };
    case "salesChannel/loading":
      return { ...state, salesChannelLoading: true, salesChannelsError: null };
    case "salesChannels/loaded":
      return {
        ...state,
        salesChannelsLoading: false,
        salesChannelsError: null,
        salesChannels: action.payload,
      };
    case "salesChannel/loaded":
      return {
        ...state,
        salesChannelLoading: false,
        salesChannelsError: null,
        salesChannel: action.payload,
      };
    case "salesChannels/failedToLoad":
      return {
        ...state,
        salesChannelsLoading: false,
        salesChannelsError:
          "Sales channels failed to load." as SalesChannelsErrorType,
      };
    case "salesChannel/failedToLoad":
      return {
        ...state,
        salesChannelLoading: false,
        salesChannelsError:
          "Sales channels failed to load." as SalesChannelsErrorType,
      };
    default:
      throw new Error(`ERROR: Unknown action type of ${action}!`);
  }
}

const SalesChannelsContext = createContext<SalesChannelsContextType | null>(
  null
);

export default function SalesChannelsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    {
      salesChannels,
      salesChannel,
      salesChannelsLoading,
      salesChannelLoading,
      salesChannelsError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getSalesChannelsList = useCallback(async () => {
    dispatch({ type: "salesChannels/loading" });
    console.log("Fetching Sales channels!");

    const { data: salesChannels, error } = await supabase.rpc(
      "sales_channels_inventory_query"
    );

    if (salesChannels) {
      dispatch({ type: "salesChannels/loaded", payload: salesChannels });
      console.log("Successfully fetched Sales channels!");
    } else {
      dispatch({ type: "salesChannels/failedToLoad" });
      throw new Error(`ERROR: ${error?.message}`);
    }
  }, [salesChannels]);

  const getSalesChannel = useCallback(
    async (targetId: number) => {
      if (salesChannel?.id && salesChannel?.id == targetId) {
        console.log(
          `Sales channel #${salesChannel.id} is already fetched, skipping fetch!`
        );
        return;
      }
      dispatch({ type: "salesChannel/loading" });
      console.log("Fetching Sales channel!");

      const { data: SalesChannel, error } = await supabase
        .from("salesChannels")
        .select("*")
        .eq("id", targetId)
        .single();
      if (SalesChannel) {
        dispatch({ type: "salesChannel/loaded", payload: SalesChannel });
        console.log("Successfully fetched sales channel!");
      } else {
        dispatch({ type: "salesChannel/failedToLoad" });
        throw new Error(`ERROR: ${error?.message}`);
      }
    },
    [salesChannel]
  );

  return (
    <SalesChannelsContext.Provider
      value={{
        salesChannels,
        salesChannel,
        salesChannelsError,
        salesChannelLoading,
        salesChannelsLoading,
        getSalesChannel,
        getSalesChannelsList,
      }}
    >
      {children}
    </SalesChannelsContext.Provider>
  );
}

export { SalesChannelsContext };
