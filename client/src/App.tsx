import { useState } from "react";

import "./App.css";

function App() {
  const [hostname, setHostname] = useState<string>("");
  const [addresses, setAddresses] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    try {
      const response = await fetch(`http://localhost:3001/lookup?domain=${hostname}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to perform DNS lookup");
      }
      const data = await response.json();
      setAddresses(data.addresses);
      setError("");
    } catch (err) {
      setError("An error occurred during DNS lookup");
    }
  };

  return (
    <>
      <div className="App">
        <h1>DNS Lookup</h1>
        <input type="text" value={hostname} onChange={(e) => setHostname(e.target.value)} placeholder="Unesi ime domena..." />
        <button onClick={handleLookup}>Potvrdi</button>
        {error && <p className="error">{error}</p>}
        {addresses.length > 0 && (
          <div>
            <h2>IP adrese za {hostname}:</h2>
            <ul>
              {addresses.map((address, index) => (
                <li key={index}>{address}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
