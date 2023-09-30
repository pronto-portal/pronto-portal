import React, { createContext, useContext, useMemo } from "react";
import { useLanguagesQuery } from "../../redux/reducers/apiReducer";
import { Language } from "../../types/ObjectTypes";

interface languagesProviderContext {
  languagesObject: Record<string, string>;
  languages: Language[];
  languageCodes: string[];
  getLanguageFromCode: (code: string) => string;
}

const LanguagesContext = createContext<languagesProviderContext>(
  {} as languagesProviderContext
);

export const LanguagesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data } = useLanguagesQuery({});

  const languages = useMemo(() => (data ? data.getLanguages : []), [data]);

  const languagesObject = useMemo(() => {
    return languages.reduce((acc, { code, name }) => {
      acc[code] = name;
      return acc;
    }, {} as Record<string, string>);
  }, [languages]);

  const languageCodes = useMemo(
    () => languages.map(({ code }) => code),
    [languages]
  );

  const getLanguageFromCode = (code: string) => {
    return languagesObject[code] || "";
  };

  return (
    <LanguagesContext.Provider
      value={{ languages, languagesObject, languageCodes, getLanguageFromCode }}
    >
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
