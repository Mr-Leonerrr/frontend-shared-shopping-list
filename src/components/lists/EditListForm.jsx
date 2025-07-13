import { useState } from 'react';
import { updateList } from '../../services/api';

export default function EditListForm({ list, onSaved, onCancel }) {
  const [name, setName] = useState(list.name || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await updateList(list.id, { name });
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            placeholder="Nombre de la lista"
        />
        <input
            type="text"
            value={list.description || ''}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            placeholder="Descripción de la lista"
        />
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
            Guardar
        </button>
        <button type="button" onClick={onCancel} className="text-gray-500 hover:underline">
            Cancelar
        </button>
    </form>
  );
}
