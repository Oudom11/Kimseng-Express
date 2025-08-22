import axios from 'axios';

export const bookTrip = async (bookingData, isGuest = false) => {
  const url = isGuest
    ? 'http://127.0.0.1:8000/api/bookings/guest'
    : 'http://127.0.0.1:8000/api/bookings';

  const config = {};
  if (!isGuest) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
  }

  const response = await axios.post(url, bookingData, config);
  return response.data;
};
