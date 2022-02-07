import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, Dispatch, FC, useReducer } from "react";
import { ICoffeeStore } from ".";

type InitialStateType = {
  coffeeStores: ICoffeeStore[];
  latLong: string;
};

const initialState = { latLong: "", coffeeStores: [] };

export const StoreContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (
  state: InitialStateType,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return { ...state, latLong: action.payload.latLong };
    case ACTION_TYPES.SET_COFFEE_STORES:
      return { ...state, coffeeStores: action.payload.coffeeStores };
    default:
      throw new Error("Unknown action type : " + action.type);
  }
};

const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
