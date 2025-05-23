import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export const categoryService = {
    async getAllCategories() {
        const response = await axios.get(`${API_URL}/api/categories`);
        return response.data;
    }
}
 

// for admin
export const createCategory = async (category: string) => {
    const response = await axios.post(`${API_URL}/api/categories`, { name: category });
    return response.data;
}   
 
export const deleteCategory = async (id: string) => {
    const response = await axios.delete(`${API_URL}/api/categories/${id}`);
    return response.data;
}
export const updateCategory = async (id: string, category: string) => {
    const response = await axios.put(`${API_URL}/api/categories/${id}`, { name: category });
    return response.data;
}