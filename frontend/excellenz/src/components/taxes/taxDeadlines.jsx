import React from "react";
import "../../styles/components/taxes/taxDeadlines.css";

export default function TaxDeadlines({
    deadlines = [],
    locale = "de-DE",
    })
{

  const today = new Date();

  const getDaysUntilDeadline = (deadlineDate) => {
    const deadline = new Date(deadlineDate);

    return Math.ceil(
      (deadline - today) / (1000 * 60 * 60 * 24)
    );
  };

  const getDeadlineText = (days) => {
    if (days < 0) return "überfällig";
    if (days === 0) return "heute";
    if (days === 1) return "in 1 Tag";

    return `in ${days} Tagen`;
  };

  const getDeadlineClass = (days) => {
    if (days < 0) return "deadline-overdue";
    if (days <= 7) return "deadline-warning";

    return "deadline-normal";
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <div className="tax-deadlines-card">
      <div className="tax-deadlines-header">
        <h3>Nächste Steuerfristen</h3>
      </div>

      <div className="tax-deadlines-list">
        {deadlines.map((deadline) => {
          const daysUntilDeadline = getDaysUntilDeadline(deadline.date);

          return (
            <div className="tax-deadlines-row" key={deadline.id}>
              <span>{deadline.type}</span>

              <p className={getDeadlineClass(daysUntilDeadline)}>
                {getDeadlineText(daysUntilDeadline)}
              </p>

              <p>
                {formatDate(deadline.date)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}