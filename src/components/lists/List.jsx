import ItemRow from '../items/ItemRow';
import ItemForm from '../items/ItemForm';

export default function List({ list, onUpdated }) {
    return (
        <div className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{list.name}</h2>
            <ul className="list-disc ml-6 text-gray-700">
                {list.items?.map((item) => (
                    <ItemRow key={item.id} item={item} onUpdated={onUpdated} />
                ))}
            </ul>
            <ItemForm listId={list.id} onAdded={onUpdated} />
        </div>
    )
}
