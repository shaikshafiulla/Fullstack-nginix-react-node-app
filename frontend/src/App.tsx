import { useEffect, useState } from "react";
import { api } from "./api";

interface Item {
  _id?: string;
  title: string;
  description?: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getAll = async () => {
    const res = await api.get("/items");
    setItems(res.data);
  };

  const addItem = async () => {
    await api.post("/items", { title, description });
    setTitle("");
    setDescription("");
    getAll();
  };

  const remove = async (id?: string) => {
    if (id) {
      await api.delete(`/items/${id}`);
      getAll();
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getAll();
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>CRUD Items</h1>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <b>{item.title}</b> — {item.description}
            <button onClick={() => remove(item._id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
