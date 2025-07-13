import { useEffect, useState } from 'react';
import { getLists, deleteList } from '../../services/api';
import List from './List';
import ListForm from './ListForm';

export default function ListContainer() {
    const [lists, setLists] = useState([]);
    
    const fetchLists = async () => {
        const data = await getLists();
        setLists(data);
    };

    const handleDelete = async (id) => {
        await deleteList(id);
        fetchLists();
    };

    useEffect(() => {
        fetchLists()
    }, []);
    
    return (
        <div>
            <ListForm onCreated={fetchLists} />
            <div className="mt-4 space-y-4">
                {lists.map((list) => (
                    <List 
                        key={list.id} 
                        list={list} 
                        onUpdated={fetchLists} 
                        onDeleted={handleDelete} 
                    />
                ))}
            </div>
        </div>
    );
}