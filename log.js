import './App.css';
import Footer from './Footer';

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link ,NavLink } from 'react-router-dom';
 

const Text2 = () => { 
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // State variable to hold the error message

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/log', values)
      .then(res => {
        if (res.data.Login) {
          // Check the user type
          if (res.data.UserType === 'client') {
            navigate('/welcomepage');
          } else if (res.data.UserType === 'avocat') {
            navigate('/Home');
          } else if (res.data.UserType === 'admin') {
            navigate('/Contact');
          }
        } else {
          setErrorMessage("Email ou Mot de passe incorrect");
        }
        console.log(res);
        
      })
      .catch(err => console.log(err));
  };
     
  

  return( 
    <>
    <header>
    <nav className="navbar flex pt-5">
      <img className="img1 ml-10 mr-20" src='photo/logo.png' alt='LawExpertise' />
      <NavLink to='/'>Accueil</NavLink>
      <NavLink to='/'>Avocats</NavLink>
      <NavLink to='/Apropos'>A propos</NavLink>
      <NavLink to='/Blog'>Blog</NavLink>
      <NavLink to='/Service'>Services</NavLink>

      <NavLink to='/Contact'>Contacter nous</NavLink>
      <NavLink to='/sign'>S'inscrire</NavLink>
      <NavLink to='/log'>Se connecter</NavLink>
    </nav>
  </header>
    <body className="bodys">
      <div className="card">
        <div className="card-content">
          <div className="card-title">
            <h2>LOGIN</h2>
            <div className="underline-title"></div>
          </div>
          <form method="post" className="form" onSubmit={handleSubmit}>
            <label for="user-email"> Email </label>
            <input
              id="user-email"
              className="form-content"
              name="email"
              autocomplete="on"
              onChange={handleInput}
              required />
            <div className="form-border "></div>
            <label for="user-password">Password </label>
            <input
              id="user-password"
              className="form-content"
              name="password"
              onChange={handleInput}
              required />
            {errorMessage && (
              <p style={{ color: "red" }}>{errorMessage}</p>
            )}
            <div className="form-border"></div>
            <button className="submit-btn" name="submit" value="LOGIN">LOGIN</button>
            <Link to="/sign" className='btn btn-default w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>

          </form>
        </div>      </div>

    </body><Footer /></>
  );
}
 
export default Text2;
