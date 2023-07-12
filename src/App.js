import './assets/css/App.css';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './layouts/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import UserForm from './components/form/UserForm';
import Profile from './components/profile/Profile';


function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000} />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/form' element={<UserForm />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/*' element={<main><div className='display-row container'>Page Not Found</div></main>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
