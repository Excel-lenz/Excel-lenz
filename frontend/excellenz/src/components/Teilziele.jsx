import React, { useState } from 'react';

export default function Teilziele() {
  const [teilziele, setTeilziele] = useState([
    'Erstes Etappenziel erreichen',
    'Finanzbericht für Monat 1 erstellen'
  ]);
  const [inputText, setInputText] = useState('');

  const handleAddTeilziel = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      setTeilziele([...teilziele, inputText.trim()]);
      setInputText('');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '400px', margin: '20px auto' }}>
      <h2 style={{ fontSize: '20px', color: '#2c3e50' }}>Teilziele hinzufügen #35</h2>
      <p style={{ fontSize: '13px', color: '#7f8c8d' }}>Große Ziele sollen in Teilziele zerlegt werden können.</p>
      
      <form onSubmit={handleAddTeilziel} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          id="subgoal"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Neues Teilziel..."
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Hinzufügen
        </button>
      </form>

      <div>
        <h3 style={{ fontSize: '15px' }}>Aktuelle Teilziele:</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {teilziele.map((ziel, index) => (
            <li key={index} style={{ background: '#f2f2f2', padding: '8px', marginTop: '5px', borderRadius: '4px' }}>
              • {ziel}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}