import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/auth'
import ProtectedRoute from '../components/protected_route';
import { NextPage } from "next";
import Head from "next/head";

type CustomPage = NextPage & {
  requires_auth?: boolean;
};

interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: CustomPage;
}

function App({ Component, pageProps }: CustomAppProps) {
  // Add your protected routes here
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
