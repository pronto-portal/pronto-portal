import React, { createContext, useContext } from "react";
import { iso6393 } from "iso-639-3";

interface languagesProviderContext {
  languages: string[];
}

const LanguagesContext = createContext<languagesProviderContext>(
  {} as languagesProviderContext
);

export const LanguagesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const languages = iso6393
    .filter((lang) => lang.type === "living" && lang.scope === "individual")
    .map((lang) => lang.name);
  return (
    <LanguagesContext.Provider value={{ languages }}>
      {children}
    </LanguagesContext.Provider>
  );
};

export const useLanguages = () => {
  const data = useContext(LanguagesContext);
  if (!data)
    throw new Error("Must be in a languagesProvider to use Languages Context");

  return data;
};
