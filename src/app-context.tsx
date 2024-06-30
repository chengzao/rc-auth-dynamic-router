import React, { useState } from 'react';

interface initStateProps {
  menus: any[]
  user: any
  setState: (...args: any[]) => void
}

const initState: initStateProps = {
  menus: [],
  user: {},
  setState: () => {}
}

export const AppContext = React.createContext<initStateProps>(initState);


export const AppProvider = (props: any) => {
  const { value } = props;

  const [state, setState] = useState({...initState, ...value});

  return (
    <AppContext.Provider value={{...state, setState}}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error('AppContext must be used within AppProvider');
  }

  return context;
}
