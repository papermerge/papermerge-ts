import {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';
import { useRouter } from 'next/router'

import Cookies from 'js-cookie';
import api from '../services/api';
import type { AuthContextType } from '@/types';


const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  authenticate: () => {}
});


export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const authenticate = async (email: string, password: string) => {
    const { data: token } = await api.post('auth/login', { email, password })
    if (token) {
        console.log("Got token")
        Cookies.set('token', token, { expires: 60 })
        api.defaults.headers.Authorization = `Bearer ${token.token}`
        const { data: user } = await api.get('users/me')
        setUser(user)
        console.log("Got user", user)
    }
  };

  const logout = (redirectLocation: string) => {
    Cookies.remove("token");
    setUser(null);
    setLoading(false);
    console.log("Redirecting");
    router.push(redirectLocation || "/login");
  };

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token')
      if (token) {
          console.log("Got a token in the cookies, let's see if it is valid")
          api.defaults.headers.Authorization = `Bearer ${token}`
          const { data: user } = await api.get('users/me')
          if (user) {
            setUser(user);
          }
      }
      setLoading(false)
    }
    console.log("Inside use effect");
    loadUserFromCookies();
  }, []);


  let context_value: AuthContextType = {
    isAuthenticated: !!user,
    user,
    authenticate,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={context_value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
