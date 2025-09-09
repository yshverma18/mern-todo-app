import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/items", { name });
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Item</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          type="text" 
          placeholder="Item name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4">Add</button>
      </form>
    </div>
  );
}

export default AddItem;
