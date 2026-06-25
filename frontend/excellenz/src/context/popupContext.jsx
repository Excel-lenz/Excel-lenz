import { createContext, useContext, useState } from "react";
import { WarningPopup, SuccessPopup, InfoPopup } from "../components/popup";

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [popup, setPopup] = useState(null);

  const showWarning = (message) =>
  setPopup({ type: "warning", text: message, id: Date.now() });

    const showSuccess = (message) =>
    setPopup({ type: "success", text: message, id: Date.now() });

    const showInfo = (message) =>
    setPopup({ type: "info", text: message, id: Date.now() });

  const clearPopup = () => setPopup(null);

  return (
    <PopupContext.Provider value={{ showWarning, showSuccess, showInfo }}>
      {children}

      {popup?.type === "warning" && (
        <WarningPopup
          key={popup.id}
          text={popup.text}
          duration={3000}
        />
      )}

      {popup?.type === "success" && (
        <SuccessPopup
          key={popup.id}
          text={popup.text}
          duration={3000}
        />
      )}

      {popup?.type === "info" && (
        <InfoPopup
          key={popup.id}
          text={popup.text}
          duration={3000}
        />
      )}
    </PopupContext.Provider>
  );
}

export const usePopup = () => useContext(PopupContext);