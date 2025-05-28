export type UserData = { 
    name: string;
    email: string;
    password: string;
    userType: string;
    phoneNumber: string;
};
  
  
export type UserLoginData = {
    email: string;
    password: string
}
  

interface DecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
  userType: string;
}

export const storeAuthData = (token: string, userId: string, userType: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType);
  }
};
