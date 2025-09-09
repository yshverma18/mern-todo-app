import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditItem() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/items/${id}`)
      .then(res => setName(res.data.name))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/items/${id}`, { name });
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Item</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4">Update</button>
      </form>
    </div>
  );
}

export default EditItem;
