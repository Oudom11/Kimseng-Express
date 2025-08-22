
import axios from 'axios';

export const registerUser = async (formData) => {
	try {
		const response = await axios.post('http://127.0.0.1:8000/api/Register', formData);
		return response.data; // return token or user data
	} catch (error) {
		throw error.response?.data?.message || 'Signup failed';
	}
};
