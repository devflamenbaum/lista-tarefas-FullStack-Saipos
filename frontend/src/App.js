import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <GlobalStyles />
      <ToastContainer autoClose={3000} />
      <Header />
      <Footer />
    </>
  );
}

export default App;
