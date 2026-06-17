import { createContext, useContext, useState } from "react";
import Erfolgsanimation from "./erfolgsanimation";

const ErfolgsContext = createContext();

export function ErfolgsProvider({ children }) {
  const [successData, setSuccessData] = useState(null);

  const zeigeErfolg = (data) => {
    console.log("Erfolg ausgelöst:", data);

    setSuccessData(data);

    setTimeout(() => {
      console.log("Erfolgsanimation wird ausgeblendet");
      setSuccessData(null);
    }, 4000);
  };

  return (
    <ErfolgsContext.Provider value={{ zeigeErfolg }}>
      {children}

      {successData && (
        <Erfolgsanimation data={successData} />
      )}
    </ErfolgsContext.Provider>
  );
}

export const useErfolg = () => useContext(ErfolgsContext);