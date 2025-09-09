import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("/api/items")
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/items/${id}`);
    setItems(items.filter(item => item._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Items</h1>
      {items.map(item => (
        <div key={item._id} className="p-4 mb-2 border rounded flex justify-between">
          <span>{item.name}</span>
          <div>
            <Link to={`/edit/${item._id}`} className="px-2 text-blue-600">Edit</Link>
            <button onClick={() => handleDelete(item._id)} className="text-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
