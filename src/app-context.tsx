import React, { useState } from "react";

interface initStateProps {
  menus: any[];
  user: any;
  setUser: (...args: any[]) => void;
  setMenus: (...args: any[]) => void;
}

const initState: initStateProps = {
  menus: [],
  user: {},
  setUser: () => {},
  setMenus: () => {},
};

export const AppContext = React.createContext<initStateProps>(initState);

export const AppProvider = (props: any) => {
  const value = props.value || {};
  const state = { ...initState, ...value };
  const [user, setUser] = useState(state.user || {});
  const [menus, setMenus] = useState(state.menus || []);

  return (
    <AppContext.Provider
      value={{ ...initState, user, menus, setUser, setMenus }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within AppProvider");
  }

  return context;
};
