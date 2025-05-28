import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const apiData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      user_type: userData.userType,
      phone_number: userData.phoneNumber,
    };

    const response = await axios.post(
      'https://sunuagri-backend.onrender.com/users/register',
      apiData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Erreur lors de la création de compte", error);

    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }

    throw error;
  }
};

