import React from "react";
import { Select } from "evergreen-ui";
import { useSelectedLanguage } from "../../context/language";

export const LanguageDropdown = ({ onChange }) => {
  const [languageItems] = React.useState([
    {
      label: "Svenska",
      value: "sv"
    },
    { label: "English", value: "en" }
  ]);
  const { selectedLanguage, setSelectedLanguage } = useSelectedLanguage();

  return (
    <Select
      width={90}
      onChange={e => {
        const language = e.target.value;

        setSelectedLanguage(language);
        onChange && onChange(language);
      }}
      value={selectedLanguage}
    >
      {languageItems.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Select>
  );
};
