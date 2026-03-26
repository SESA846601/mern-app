import { useEffect, useState } from "react";
import React from 'react';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const API = "http://backend-svc:5000"; // K8s service name

  const fetchData = () => {
    fetch(`${API}/data`)
      .then(res => res.json())
      .then(setData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = () => {
    fetch(`${API}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    }).then(() => {
      setName("");
      fetchData();
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>MERN Demo</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {data.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;