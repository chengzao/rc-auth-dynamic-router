import React, { useReducer, Dispatch, createContext } from "react";

interface AppState {
  menus: any[];
  user: any;
}

interface AppContextProps extends AppState {
  dispatch: Dispatch<AppActions>;
}

// 定义action类型
type AppActions =
  | { type: "SET_USER"; payload: any }
  | { type: "SET_MENUS"; payload: any[] };

const initState: AppState = {
  menus: [],
  user: {},
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
  value?: Partial<AppState>;
}

const appReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_MENUS":
      return {
        ...state,
        menus: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  value = {},
}) => {
  const state = { ...initState, ...value };
  const [appState, dispatch] = useReducer(appReducer, state);

  const contextValue = {
    ...appState,
    dispatch,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within AppProvider");
  }

  return context;
};

export const withAppProvider = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  extraProps?: P
) => {
  return function AppProviderComponent(props: P) {
    return (
      <AppProvider>
        <WrappedComponent {...props} {...extraProps} />
      </AppProvider>
    );
  };
};
