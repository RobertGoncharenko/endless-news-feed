import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { AuthContext } from '../../../context';

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const logOut = () => {
    setIsAuth(false);
    localStorage.removeItem('auth')
  }
  return (
    <div className="navbar">
      {isAuth && <Button onClick={logOut}>
        Выйти
      </Button>
      }
      
    <div className="navbar__links">
      <Link to="/about">О Нас</Link>
      <Link to="/posts">Посты</Link>
    </div>
  </div>
  );
};

export default Navbar;