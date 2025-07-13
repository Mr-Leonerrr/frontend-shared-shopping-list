import { useState } from 'react';
import { updateItem, deleteItem } from '../../services/api';

export default function ItemRow({ item, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    note: item.note || null,
  });
	const [isCompleted, setIsCompleted] = useState(item.isCompleted || false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }));
  };

	const handleCheckboxToggle = async () => {
    const newValue = !isCompleted;
    setIsCompleted(newValue);
    await updateItem(item.id, { isCompleted: newValue });
    onUpdated?.();
  };

  const handleUpdate = async () => {
    await updateItem(item.id, { ...form });
    setIsEditing(false);
    onUpdated?.();
  };

  const handleDelete = async () => {
    if (confirm('¿Eliminar este ítem?')) {
      await deleteItem(item.id);
      onUpdated?.();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b pb-2">
			<input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxToggle}
        className="form-checkbox h-5 w-5 text-green-600"
      />

      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-32"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-20"
            step="0.01"
          />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-20"
            min="1"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          >
            Guardar
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          <div className={`flex-1 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
            <span className="font-semibold">{item.name}</span>{' '}
            <span className={`text-sm ${isCompleted ? 'text-gray-400' : 'text-black'}`}>
              (${item.price} x {item.quantity})
            </span>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:underline"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
          >
            Eliminar
          </button>
        </>
      )}
    </div>
  );
}
