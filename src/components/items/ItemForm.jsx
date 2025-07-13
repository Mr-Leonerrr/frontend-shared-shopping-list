import { useState } from 'react';
import { addItemToList } from '../../services/api';

export default function ItemForm({ listId, onAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !listId) return;

    await addItemToList({
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      listId
    });

    // Reset
    setName('');
    setPrice('');
    setQuantity(1);
    onAdded?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2 flex-wrap">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-2 py-1 rounded w-full"
        placeholder="Nombre del ítem"
        required
      />

      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border px-2 py-1 rounded w-24"
        placeholder="Precio"
        required
      />

      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border px-2 py-1 rounded w-24"
        placeholder="Cantidad"
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        Añadir
      </button>
    </form>
  );
}
