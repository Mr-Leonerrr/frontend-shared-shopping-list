import { useState } from 'react'
import { createList } from '../../services/api'

export default function ListForm({ onCreated }) {
    const [name, setName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name) return
        await createList({ name })
        setName('')
        onCreated()
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border px-3 py-2 rounded w-full"
                placeholder="Nombre de la lista"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Crear
            </button>
        </form>
    )
}
