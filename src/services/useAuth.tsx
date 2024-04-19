import { useState, useEffect, useContext } from 'react';
import PathRoutes from '../routes/PathRoutes';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('@talphaToken') !== null);
  }, []);

  const register = async (data: any, navigate:any) => {
    try {
        const registerUrl = 'https://interview.t-alpha.com.br/api/auth/register';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(registerUrl, requestOptions);

        if (!response.ok) {
            throw new Error(`Failed to register: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        navigate(PathRoutes.LOGIN, {
            replace: true,
        });

        return responseData;
    } catch (error: any) {
        console.error('Registration error:', error.message);
        throw error;
    }
  };

  const signIn = async (data: any, navigate: any) => {
    try {
        const registerUrl = 'https://interview.t-alpha.com.br/api/auth/login';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(registerUrl, requestOptions);

        if (!response.ok) {
          throw new Error(`Failed to login: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        navigate(PathRoutes.HOME, {
            replace: true,
        });

        return responseData;
    } catch (error: any) {
        console.error('Login error:', error.message);
        throw error;
    }
  };

  return {
    isAuthenticated,
    register,
    signIn,
  };
};

export default useAuth;