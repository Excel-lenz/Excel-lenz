import React from "react";
import { useState } from "react";
import "../styles/components/popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Popup({color, title, text}){

    const [visible, setVisible] = useState(true);

    if (!visible) return null;


    return(
        <div className="popupbox" style={{ borderColor: color }}>
            <div className="popuptitle"> {title} </div>
            <div className="popuptext"> {text} </div>
            <div className="popupbutton" onClick={() => setVisible(false)}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
        );
}

export function WarningPopup({text = "Es ist etwas schiefgelaufen"}){
    return(
        <Popup
            color = {"#f53420"}
            title = {"Warnung!"}
            text = {text}
        />
    );
}

export function SuccessPopup({text ="Aufgabe wurde erfüllt"}){
    return(
        <Popup
            color = {"#2ECC71"}
            title = {"Erfolgreich"}
            text = {text}
        />
    );
}

export function InfoPopup({text ="Passen sie auf"}){
    return(
        <Popup
            color = {"#2C3E40"}
            title = {"Hinweis:"}
            text = {text}
        />
    );
}