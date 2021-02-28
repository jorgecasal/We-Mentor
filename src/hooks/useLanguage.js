import { useState } from "react";

export const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("sv");

  return {
    selectedLanguage,
    setSelectedLanguage
  };
};
