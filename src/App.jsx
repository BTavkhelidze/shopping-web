import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className='min-h-dvh bg-amber-100'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/newProduct' element={<NewProduct />} />
          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
