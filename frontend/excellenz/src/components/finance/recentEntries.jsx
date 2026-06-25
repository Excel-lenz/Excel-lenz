
import React from "react";
import "../../styles/components/finance/recentEntries.css";
import { formatCurrency, getCurrencySymbol, normalizeCurrencySettings } from "../../utils/currency";

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default function RecentEntries({ transactions = [], currencySettings }) {
  const settings = normalizeCurrencySettings(currencySettings);
  const currencySymbol = getCurrencySymbol(settings);

  const recentTransactions = [...transactions]
    .sort((left, right) => new Date(right.created_at) - new Date(left.created_at))
    .slice(0, 3);

  return (
    <div className="recentEntriesCard">
      <div className="recentEntriesHeader">
        <h3>Letzte Eingaben</h3>

        <button>Alle anzeigen</button>
      </div>

      <div className="recentEntriesList">
        {recentTransactions.length === 0 && (
          <div className="entryItem">
            <div className="entryContent">
              <h4>Noch keine Einträge</h4>
              <p>Sobald Transaktionen vorhanden sind, erscheinen sie hier.</p>
            </div>
          </div>
        )}

        {recentTransactions.map((transaction) => (
          <div className="entryItem" key={transaction.id}>
            <div className={`entryIcon ${transaction.type === "expense" ? "orange" : "green"}`}>
              {currencySymbol}
            </div>

            <div className="entryContent">
              <h4>{transaction.name}</h4>
              <p>{transaction.category} — {formatCurrency(transaction.total ?? transaction.price * transaction.quantity, settings)}</p>
            </div>

            <span className="entryDate">
              {transaction.created_at ? dateFormatter.format(new Date(transaction.created_at)) : "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}