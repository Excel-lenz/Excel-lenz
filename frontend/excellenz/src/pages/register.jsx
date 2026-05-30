 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoOfficial from '../assets/logo.png';

function Register() {
  const navigate = useNavigate();
  
  // Control del paso actual del formulario guiado
  const [currentStep, setCurrentStep] = useState(1);

  // Estado unificado para los datos del usuario y la empresa
  const [formData, setFormData] = useState({
    // Datos de usuario
    email: '',
    phone: '',
    birthday: '',
    password: '',
    confirmPassword: '',
    // Datos de la empresa (Requeridos por el jefe de programación)
    companyName: '',
    rechtsform: '',
    dienstleistungsektor: ''
  });

  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Manejador de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Avanzar al siguiente paso con validación previa
  const nextStep = () => {
    setError('');
    
    if (currentStep === 1) {
      // Validaciones del paso 1 (Usuario)
      if (!formData.email || !formData.phone || !formData.birthday || !formData.password || !formData.confirmPassword) {
        setError('Bitte füllen Sie alle Felder aus.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Die Passwörter stimmen nicht überein.');
        return;
      }
    } else if (currentStep === 2) {
      // Validaciones del paso 2 (Company Name)
      if (!formData.companyName) {
        setError('Bitte geben Sie den Unternehmensnamen an.');
        return;
      }
    } else if (currentStep === 3) {
      // Validaciones del paso 3 (Rechtsform)
      if (!formData.rechtsform) {
        setError('Bitte wählen Sie eine Rechtsform.');
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
  };

  // Retroceder al paso anterior
  const prevStep = () => {
    setError('');
    setCurrentStep((prev) => prev - 1);
  };

  // Envío final del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.dienstleistungsektor) {
      setError('Bitte wählen Sie einen Dienstleistungssektor.');
      return;
    }

    try {
      // Registro final y envío de datos al backend
      console.log('Registrierungsdaten:', formData);
      setIsSubmitted(true);
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <div className="register-container" style={styles.container}>
      <div className="register-card" style={styles.card}>
        
        {/* Logo Oficial */}
        <div style={styles.logoContainer}>
          <img src={logoOfficial} alt="Offizielles Logo" style={styles.logo} />
        </div>

        <h2 style={styles.title}>Registrierung</h2>

        {/* Indicador de pasos visual para el usuario */}
        {!isSubmitted && (
          <div style={styles.stepIndicator}>
            <span style={currentStep === 1 ? styles.activeStep : styles.inactiveStep}>1. Konto</span>
            <span style={styles.stepSeparator}>&gt;</span>
            <span style={currentStep === 2 ? styles.activeStep : styles.inactiveStep}>2. Firma</span>
            <span style={styles.stepSeparator}>&gt;</span>
            <span style={currentStep === 3 ? styles.activeStep : styles.inactiveStep}>3. Rechtsform</span>
            <span style={styles.stepSeparator}>&gt;</span>
            <span style={currentStep === 4 ? styles.activeStep : styles.inactiveStep}>4. Sektor</span>
          </div>
        )}

        {error && <p style={styles.errorText}>{error}</p>}

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            
            {/* PASO 1: Datos de la Cuenta de Usuario */}
            {currentStep === 1 && (
              <div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>E-Mail-Adresse</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="beispiel@email.com"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Telefonnummer</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="+49 123 456789"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Geburtsdatum</label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Passwort</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="********"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Passwort confirmar</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="********"
                  />
                </div>

                <button type="button" onClick={nextStep} style={styles.button}>Weiter</button>
              </div>
            )}

            {/* PASO 2: Creación de Empresa - Nombre (Company Name) */}
            {currentStep === 2 && (
              <div>
                <h3 style={styles.sectionSubtitle}>Schritt 1: Name des Unternehmens</h3>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Name der Company</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="Meine Firma GmbH"
                  />
                </div>
                <div style={styles.buttonGroup}>
                  <button type="button" onClick={prevStep} style={styles.buttonSecondary}>Zurück</button>
                  <button type="button" onClick={nextStep} style={styles.button}>Weiter</button>
                </div>
              </div>
            )}

            {/* PASO 3: Creación de Empresa - Rechtsform (Forma Legal) */}
            {currentStep === 3 && (
              <div>
                <h3 style={styles.sectionSubtitle}>Schritt 2: Rechtsform wählen</h3>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Rechtsform</label>
                  <select
                    name="rechtsform"
                    value={formData.rechtsform}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  >
                    <option value="">-- Bitte wählen --</option>
                    <option value="GmbH">GmbH</option>
                    <option value="UG">UG (haftungsbeschränkt)</option>
                    <option value="AG">AG</option>
                    <option value="Einzelunternehmen">Einzelunternehmen</option>
                    <option value="GbR">GbR</option>
                  </select>
                </div>
                <div style={styles.buttonGroup}>
                  <button type="button" onClick={prevStep} style={styles.buttonSecondary}>Zurück</button>
                  <button type="button" onClick={nextStep} style={styles.button}>Weiter</button>
                </div>
              </div>
            )}

            {/* PASO 4: Creación de Empresa - Dienstleistungssektor (Sector de Servicios) */}
            {currentStep === 4 && (
              <div>
                <h3 style={styles.sectionSubtitle}>Schritt 3: Dienstleistungssektor</h3>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Sektor</label>
                  <select
                    name="dienstleistungsektor"
                    value={formData.dienstleistungsektor}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  >
                    <option value="">-- Bitte wählen --</option>
                    <option value="IT-Dienstleistungen">IT / Softwareentwicklung</option>
                    <option value="Finanzen">Finanzen & Beratung</option>
                    <option value="Handwerk">Handwerk & Bauwesen</option>
                    <option value="Logistik">Logistik & Transport</option>
                    <option value="Marketing">Marketing & Kommunikation</option>
                  </select>
                </div>
                <div style={styles.buttonGroup}>
                  <button type="button" onClick={prevStep} style={styles.buttonSecondary}>Zurück</button>
                  <button type="submit" style={styles.button}>Registrierung abschließen</button>
                </div>
              </div>
            )}

          </form>
        ) : (
          /* Mensaje Final de Éxito */
          <div style={styles.successMessage}>
            <h3>Fast fertig!</h3>
            <p>Das Konto für <strong>{formData.companyName}</strong> wurde erfolgreich angelegt.</p>
            <p>Wir haben einen Bestätigungslink an <strong>{formData.email}</strong> gesendet. Bitte überprüfen Sie Ihren Posteingang.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Estilos utilizando la paleta oficial del proyecto
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#0c1c1c', 
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  card: {
    backgroundColor: '#0c1c1c',
    padding: '40px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '480px',
    border: '1px solid #1B9A57', 
    boxShadow: '0 4px 20px rgba(46, 204, 113, 0.15)',
    textAlign: 'center'
  },
  logoContainer: {
    marginBottom: '15px'
  },
  logo: {
    maxWidth: '110px',
    height: 'auto'
  },
  title: {
    color: '#FFFFFF',
    marginBottom: '10px',
    fontSize: '26px',
    fontWeight: 'bold'
  },
  stepIndicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '25px',
    fontSize: '12px'
  },
  activeStep: {
    color: '#2ECC71',
    fontWeight: 'bold',
    borderBottom: '2px solid #2ECC71',
    paddingBottom: '2px'
  },
  inactiveStep: {
    color: '#52D68C',
    opacity: 0.6
  },
  stepSeparator: {
    color: '#1B9A57',
    margin: '0 8px'
  },
  sectionSubtitle: {
    color: '#FFFFFF',
    fontSize: '16px',
    marginBottom: '20px',
    textAlign: 'left',
    borderLeft: '3px solid #2ECC71',
    paddingLeft: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  inputGroup: {
    marginBottom: '18px'
  },
  label: {
    display: 'block',
    color: '#FFFFFF',
    marginBottom: '8px',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '4px',
    border: '1px solid #1B9A57', 
    backgroundColor: '#0c1c1c',
    color: '#FFFFFF',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '15px'
  },
  button: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#2ECC71', 
    color: '#0c1c1c', 
    border: 'none',
    borderRadius: '4px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  buttonSecondary: {
    padding: '12px 20px',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    border: '1px solid #1B9A57',
    borderRadius: '4px',
    fontSize: '15px',
    cursor: 'pointer'
  },
  errorText: {
    color: '#f53420', 
    marginBottom: '16px',
    fontSize: '14px',
    textAlign: 'left'
  },
  successMessage: {
    color: '#FFFFFF',
    padding: '20px',
    lineHeight: '1.6',
    textAlign: 'left'
  }
};

export default Register;