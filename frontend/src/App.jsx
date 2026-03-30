import { useEffect, useState } from "react";
//testing pipeline

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const API = "http://backend-svc:5000"; // K8s service name

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/data`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = async () => {
    if (!name) return;

    try {
      await fetch(`${API}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      setName("");
      fetchData();
    } catch (err) {
      console.error("Error adding item:", err);
    }
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