import { useEffect, useState } from 'react';
import { getLists } from '../../services/api';
import List from './List';
import ListForm from './ListForm';

export default function ListContainer() {
    const [lists, setLists] = useState([]);
    
    const fetchLists = async () => {
        const data = await getLists();
        setLists(data);
    };

    useEffect(() => {
        fetchLists()
    }, []);
    
    return (
        <div className="space-y-4">
            <ListForm onCreated={fetchLists} />
            {lists.length === 0 ? (
                <p className="text-gray-500">No hay listas todavía.</p>
            ) : (
            lists.map((list) => (
                <List key={list.id} list={list} onUpdated={fetchLists} />
            ))
            )}
        </div>
    );
}