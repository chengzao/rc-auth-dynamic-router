import React, {
  useState,
  Dispatch,
  SetStateAction,
  createContext,
} from "react";

interface AppState {
  menus: any[];
  user: any;
}

interface AppContextProps extends AppState {
  setUser: Dispatch<SetStateAction<any>>;
  setMenus: Dispatch<SetStateAction<any[]>>;
}

const initState: AppState = {
  menus: [],
  user: {},
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
  value?: Partial<AppState>;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  value = {},
}) => {
  const state = { ...initState, ...value };
  const [user, setUser] = useState(state.user || {});
  const [menus, setMenus] = useState(state.menus || []);

  const contextValue = {
    user,
    menus,
    setUser,
    setMenus,
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
