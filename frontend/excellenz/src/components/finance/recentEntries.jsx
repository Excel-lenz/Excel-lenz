
import React from "react";
import "../../styles/components/finance/recentEntries.css";

export default function RecentEntries() {
  return (
    <div className="recentEntriesCard">
      <div className="recentEntriesHeader">
        <h3>Letzte Eingaben</h3>

        <button>Alle anzeigen</button>
      </div>

      <div className="recentEntriesList">

        <div className="entryItem">
          <div className="entryIcon green">
            €
          </div>

          <div className="entryContent">
            <h4>Einnahme hinzugefügt</h4>
            <p>Webdesign Projekt — €4.500</p>
          </div>

          <span className="entryDate">
            Heute
          </span>
        </div>

        <div className="entryItem">
          <div className="entryIcon blue">
            €
          </div>

          <div className="entryContent">
            <h4>Fixkosten aktualisiert</h4>
            <p>Büromiete — €1.200</p>
          </div>

          <span className="entryDate">
            Gestern
          </span>
        </div>

        <div className="entryItem">
          <div className="entryIcon orange">
            €
          </div>

          <div className="entryContent">
            <h4>Investition hinzugefügt</h4>
            <p>MacBook Pro — €2.199</p>
          </div>

          <span className="entryDate">
            20.05
          </span>
        </div>

      </div>
    </div>
  );
}