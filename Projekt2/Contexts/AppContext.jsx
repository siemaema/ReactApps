import React, { createContext, useContext, useState } from "react";

// Tworzymy kontekst
const AppContext = createContext();

// Hook do używania kontekstu
export const useAppContext = () => {
  return useContext(AppContext);
};

// Provider dla aplikacji
export const AppProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false); // Stan użytkownika zalogowanego
  const [user, setUser] = useState(null); // Stan przechowujący informacje o użytkowniku
  const [filter, setFilter] = useState(""); // Stan filtra do wyszukiwania
  const [category, setCategory] = useState(""); // Kategoria filtrująca produkty

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        filter,
        setFilter,
        category,
        setCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
