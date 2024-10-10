
import './App.css';
import NavbarComponent from './componets/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Layout from './componets/Layout';
import NotFound from './pages/not-found/NotFound';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import HomePage from './pages/home/Home';
import MovieList from './pages/movielist/MovieList';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/movies' element={<MovieList/>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
