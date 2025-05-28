import axios from 'axios';

export const loginUser = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post(
      'https://sunuagri-backend.onrender.com/auth/login',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      }
    );

    if (response.data.access_token && response.data.user_type && response.data.user_name) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('userType', response.data.user_type);
      localStorage.setItem('userName', response.data.user_name);
    }

    return response;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};

