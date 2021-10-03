import React, { createContext, useState } from "react";

interface AppState {
  error?: string;
  token?: string;
  secureId?: string;
  currentOperation: string;
  loading: boolean;
  subscriptionResponse?: string;
}

type AppContextType = {
  state: AppState;
  setState: (value: any) => void;
};

const initialState: AppState = {
  currentOperation: "token",
  loading: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
