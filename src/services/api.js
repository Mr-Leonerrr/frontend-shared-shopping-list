import axios from 'axios'

const API_BASE = 'http://localhost:3000' // Cambia esto según tu backend

export const getLists = async () => {
    const res = await axios.get(`${API_BASE}/lists`)
    return res.data
}

export const createList = async (data) => {
    data.ownerId = 1 // Asigna un ID de propietario por defecto
    await axios.post(`${API_BASE}/lists`, data)
}

export const addItemToList = async (item) => {
    await axios.post(`${API_BASE}/items`, item)
}

export async function updateItem(id, data) {
    try {
      const res = await axios.patch(`${API_BASE}/items/${id}`, data);
      return res.data;
    } catch (err) {
      console.error('Error al actualizar ítem', err);
      throw err;
    }
  }
  
export async function deleteItem(id) {
    try {
      const res = await axios.delete(`${API_BASE}/items/${id}`);
      return res.data;
    } catch (err) {
      console.error('Error al eliminar ítem', err);
      throw err;
    }
}
  