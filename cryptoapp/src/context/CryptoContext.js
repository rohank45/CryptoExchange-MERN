import React, { createContext, useContext, useEffect, useState } from "react";

const CryptoC = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbols, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <CryptoC.Provider value={{ currency, setCurrency, symbols }}>
      {children}
    </CryptoC.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(CryptoC);
};
