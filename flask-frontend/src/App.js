import React, { useState, useEffect } from "react";
import { REACT_APP_BACKEND_URL } from "./config";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  console.log(`${REACT_APP_BACKEND_URL}/items`);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/items`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          setMessage("Failed to fetch items.");
        }
      } catch (error) {
        setMessage("Error occurred.");
        console.error("Error:", error);
      }
    };

    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: item }),
      });

      if (response.ok) {
        setItems((prevItems) => [...prevItems, item]);
        setItem(""); // Clear the input field
      } else {
        setMessage("Failed to add item.");
      }
    } catch (error) {
      setMessage("Error occurred.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Add and Display Items</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter item name"
        />
        <button type="submit">Add Item</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
