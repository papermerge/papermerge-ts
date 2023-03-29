import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/auth'
import ProtectedRoute from '../components/protected_route';


function App({ Component, pageProps }: AppProps) {
  // routes which don't need authentication
  const public_routes: Array<string> = ['/login'];

  return (
    <>
    <AuthProvider>
      <ProtectedRoute public_routes={public_routes}>
        <Component {...pageProps} />
      </ProtectedRoute>
    </AuthProvider>
    </>
  )
}

export default App;
