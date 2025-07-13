import { useState } from 'react';
import EditListForm from './EditListForm';
import ItemRow from '../items/ItemRow';
import ItemForm from '../items/ItemForm';

export default function List({ list, onUpdated, onDeleted }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="border rounded p-4 shadow mb-4">
            { isEditing ? (
                <EditListForm
                    list={list}
                    onCancel={() => setIsEditing(false)}
                    onSaved={() => {
                        setIsEditing(false);
                        onUpdated();
                    }}
                />
            ) : (
                <>
                 <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">{list.name}</h2>
                    <div className="space-x-2">
                        <button
                         onClick={() => setIsEditing(true)}
                        className="text-blue-500 hover:underline"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => {
                                if (confirm('¿Estás seguro de que quieres eliminar esta lista?')) {
                                    onDeleted(list.id);
                                }
                            }}
                            className="text-red-500 hover:underline">
                            Eliminar
                        </button>
                    </div>
                 </div>
                 <ul className="list-disc ml-6 text-gray-700">
                    {list.items?.map((item) => (
                        <ItemRow key={item.id} item={item} onUpdated={onUpdated} />
                    ))}
                </ul>
                <ItemForm listId={list.id} onAdded={onUpdated} />
            </>
            )}
        </div>
    );
}
