
import axios from 'axios';

export const registerUser = async (formData) => {
	try {
		const response = await axios.post('http://su24.34.juicyjisu.us/api/Register', formData);
		return response.data; // return token or user data
	} catch (error) {
		throw error.response?.data?.message || 'Signup failed';
	}
};
