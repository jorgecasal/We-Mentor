import React, { createContext, useContext } from "react";

import { useLanguage } from "../hooks/useLanguage";

export const SelectedLanguageContext = createContext();

export const SelectedLanguageProvider = ({ children }) => {
  const state = useLanguage();

  return (
    <SelectedLanguageContext.Provider value={state}>
      {children}
    </SelectedLanguageContext.Provider>
  );
};

export const useSelectedLanguage = () => useContext(SelectedLanguageContext);
