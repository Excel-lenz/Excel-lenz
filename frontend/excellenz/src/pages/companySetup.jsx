import { useState } from "react";
import "../styles/pages/companySetup.css";
import { usePopup } from "../context/popupContext";
import { useNavigate } from "react-router-dom";

function isUserLogin(navigate){

  
  
}


export default function CompanySetup() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  
  const { showWarning, showSuccess } = usePopup();



  const [formData, setFormData] = useState({
    companyName: "",
    legalForm: "",
    companyHeadquarters: "",
    economicSector: "",
    economicSectorOther: "",
    preferredCurrency: "",
    capital: "",
    goal: "",
  });

  const steps = [
    {
      key: "companyName",
      label: "Bitte gib deinen Unternehmensnamen ein:",
      placeholder: "Unternehmensname",
      type: "text",
    },
    {
      key: "legalForm",
      label: "Bitte gib die Rechtsform deines Unternehmens ein:",
      type: "select",
      options: ["GmbH", "UG", "AG", "e.K.", "GbR", "OHG", "KG", "SE", "Verein"],
    },
    {
      key: "companyHeadquarters",
      label: "Bitte gib den Unternehmenssitz ein:",
      placeholder: "Unternehmenssitz",
      type: "text",
    },
    {
      key: "economicSector",
      label: "Bitte wähle den Wirtschaftssektor:",
      type: "select",
      options: [
        "Landwirtschaft",
        "Industrie",
        "Produktion",
        "Handel",
        "IT & Software",
        "Finanzen",
        "Gesundheitswesen",
        "Bildung",
        "Logistik",
        "Tourismus",
        "Bauwesen",
        "Energie",
        "Sonstiges",
      ],
    },
    {
      key: "preferredCurrency",
      label: "Bitte wähle die bevorzugte Währung:",
      type: "select",
      options: ["EUR", "USD", "GBP", "CHF", "JPY", "CNY"],
    },
    {
      key: "capital",
      label: "Bitte gib dein aktuelles Kapital an:",
      placeholder: "Aktuelles Kapital",
      type: "text",
    },
    {
      key: "goal",
      label: "Bitte gib ein Zielkapital an:",
      placeholder: "Ziel Kapital",
      type: "text",
    }
    

  ];

  const currentStep = steps[step];

  const isCurrentStepValid =
    currentStep.key === "economicSector"
      ? formData.economicSector !== "" &&
        (formData.economicSector !== "Sonstiges" ||
          formData.economicSectorOther.trim() !== "")
      : formData[currentStep.key]?.toString().trim() !== "";

  async function createCompany() {
    const token = localStorage.getItem("access");

    const payload = {
      companyName: formData.companyName,
      companyLegalForm: formData.legalForm,
      companyLocation: formData.companyHeadquarters,
      companyType:
        formData.economicSector === "Sonstiges"
          ? formData.economicSectorOther
          : formData.economicSector,
      companyCurrency: formData.preferredCurrency,
      companyCapital: formData.capital,
      comapnyGoal: formData.goal,
    };

    try {
      const response = await fetch("http://localhost:8000/api/companies/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Fehler beim Erstellen:", errorData);

        showWarning("Fehler beim Erstellen. Bitte später erneut versuchen.");
        return;
      }

      const data = await response.json();
      console.log("Company erstellt:", data);

      showSuccess("Unternehmen erfolgreich erstellt.");

      // optional: navigation
      // navigate("/dashboard");

    } catch (error) {
      console.error("Netzwerkfehler:", error);

      showWarning("Netzwerkfehler. Bitte später erneut versuchen.");
    }
  }

  function handleNext() {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      createCompany();
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  return (
    <div className="companySetup">
      <header className="setup-title">
        <h1>Neues Unternehmen anlegen!</h1>
        <p>In dieser Ansicht können sie ein neues Unternehmen anlegen</p>
      </header>

      <main>
        <section className="window">
          <section className="inputBox">
            <label htmlFor={currentStep.key}>{currentStep.label}</label>

            {currentStep.type === "select" ? (
              <>
                <select
                  id={currentStep.key}
                  value={formData[currentStep.key]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [currentStep.key]: e.target.value,
                    })
                  }
                >
                  <option value="">Bitte auswählen</option>
                  {currentStep.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {currentStep.key === "economicSector" &&
                  formData.economicSector === "Sonstiges" && (
                    <input
                      type="text"
                      placeholder="Bitte Wirtschaftssektor angeben"
                      value={formData.economicSectorOther}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          economicSectorOther: e.target.value,
                        })
                      }
                    />
                  )}
              </>
            ) : (
              <input
                id={currentStep.key}
                type="text"
                placeholder={currentStep.placeholder}
                value={formData[currentStep.key]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [currentStep.key]: e.target.value,
                  })
                }
              />
            )}

            <div className="button-row">
              <button onClick={handleBack} disabled={step === 0}>
                Zurück
              </button>

              <button onClick={handleNext} disabled={!isCurrentStepValid}>
                {step === steps.length - 1 ? "Abschließen" : "Weiter"}
              </button>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}