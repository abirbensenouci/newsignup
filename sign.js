
import './App.css';
import Footer from './Footer';

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
 

function SignUpForm(props) {
  const handleSignInClick = () => {
    const overlay_container = document.querySelector(".container .overlay-container");
    const overlay = document.querySelector(".container .overlay-container .overlay");
    const signInForm = document.querySelector(".container .sign-in-form");
    const signUpForm = document.querySelector(".container .sign-up-form");
    overlay_container.style.transform = "translateX(100%)";
    overlay.style.transform = "translateX(-50%)";
    signInForm.classList.add("active");
    signUpForm.classList.remove("active");
  };

  const handleSignUpClick = () => {
    const overlay_container = document.querySelector(".container .overlay-container");
    const overlay = document.querySelector(".container .overlay-container .overlay");
    const signInForm = document.querySelector(".container .sign-in-form");
    const signUpForm = document.querySelector(".container .sign-up-form");
    overlay_container.style.transform = "translateX(0)";
    overlay.style.transform = "translateX(0)";
    signUpForm.classList.add("active");
    signInForm.classList.remove("active");
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
 

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    prenom: '',
    email: '',
    password: '',
    passwordc: '',
    codebareau: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    prenom: '',
    email: '',
    password: '',
    passwordc: '',
    codebareau: ''
  });

  const handleInput = (event) => {

    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    let err = Validation(values);
    if (err === false) {
      return;
    } else {
     
      axios.post('http://localhost:8081/sign', values)
        .then(res => {
          navigate('/WelcomePage');  
        }).catch(err => console.log(err));
         props.history.push(`/welcome/${firstName}/${lastName}`);
    }
  }


  function Validation(values) {
    let formIsValid = true;
    const errorsCopy = { ...errors };

    // Validate name
    if (!values.name) {
      errorsCopy.name = 'Le nom est requis';
      formIsValid = false;
    } else {
      errorsCopy.name = '';
      formIsValid = true;
    }

    // Validate prenom
    if (!values.prenom) {
      errorsCopy.prenom = 'Le prénom est requis';
      formIsValid = false;
    } else {
      errorsCopy.prenom = '';
      formIsValid = true;
    }

    // validate code barrau
    if (!values.codebareau) {
      errorsCopy.codebareau = 'Le code barrau est requis';
      formIsValid = false;
    } else if (values.codebareau.length < 8) {
      errorsCopy.codebareau = 'code barrau invalide';
      formIsValid = false;
    } else {
      errorsCopy.codebareau = '';
      formIsValid = true;

    }

    // Validate email
    if (!values.email) {
      errorsCopy.email = 'L\'email est requis';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errorsCopy.email = 'Email invalide';
      formIsValid = false;
    } else {
      errorsCopy.email = '';
      formIsValid = true;

    }

    // Validate password
    if (!values.password) {
      errorsCopy.password = 'Le mot de passe est requis';
      formIsValid = false;
    } else if (values.password.length < 6) {
      errorsCopy.password = 'Le mot de passe doit contenir au moins 6 caractères';
      formIsValid = false;
    } else {
      errorsCopy.password = '';
      formIsValid = true;

    }

    // Validate confirmation password
    if (!values.passwordc) {
      errorsCopy.passwordc = 'confirmer votre mot de passe';
      formIsValid = false;
    } else if (values.passwordc !== values.password) {
      errorsCopy.passwordc = 'les mots de passe sont pas identiques';
      formIsValid = false;
    } else {
      errorsCopy.passwordc = '';
      formIsValid = true;

    }

    setErrors(errorsCopy);
    return formIsValid; // return the opposite boolean value
  }




  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  return (
    <>
      <header className='pb-10'>
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
      <section>
        <div className="container mt-10">
          <div className="form sign-in-form">
            <div className="wrapper">
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', align_items: 'center' }}>
                  <img className='ml-10' src='photo/23.png' alt='' style={{ width: "60px", height: "70px" }} />
                  <h1 className='ml-10'>Avocat</h1>
                </div>
                <div className='m-2 mb-0 pb-0'>
                <input className='mb-0' type="text" placeholder="Nom" name='name' onChange={(event) => {handleInput(event); handleFirstNameChange(event)}} value={firstName} />
                  {errors.name && <p className="error-msg mt-0 pt-0">{errors.name}</p>}
                </div>
                <div className='mt-0'>
                  <input type="text" placeholder="Prénom" name='prenom' onChange={(event) => {handleInput(event); handleLastNameChange(event)}} value={lastName}/>
                  {errors.prenom && <p className="error-msg">{errors.prenom}</p>}
                </div>
                <div className='mt-0'>
                  <input type="text" placeholder="votre code bareau" name='codebareau' onChange={handleInput} />
                  {errors.codebareau && <p className="error-msg">{errors.codebareau}</p>}
                </div>

                <div className='mt-0'>
                  <input type="email" placeholder="Email" name='email' onChange={handleInput} />
                  {errors.email && <p className="error-msg">{errors.email}</p>}
                </div>

                <div className='mt-0'>
                  <input type="password" placeholder="password" name='password' onChange={handleInput} />
                  {errors.password && <p className="error-msg">{errors.password}</p>}
                </div>

                <div className='mt-0'>
                  <input type="password" placeholder="confirmer password" name='passwordc' onChange={handleInput} />
                  {errors.passwordc && <p className="error-msg">{errors.passwordc}</p>}
                </div>

                <button type="submit" className='ml-12'>Sign Up</button>
              </form>
            </div>
          </div>
          <div className="form sign-up-form active">
            <div className="wrapper">
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', align_items: 'center' }}>
                  <img className='ml-10' src='photo/24.png' alt='' style={{ width: "60px", height: "60px" }} />
                  <h1 className='ml-10'>Client</h1>
                </div>
                <div className='m-2 mb-0 pb-0'>
                  <input className='mb-0' type="text" placeholder="Nom" name='name' onChange={handleInput} />
                  {errors.name && <p className="error-msg mt-0 pt-0">{errors.name}</p>}
                </div>
                <div className='mt-0'>
                  <input type="text" placeholder="Prénom" name='prenom' onChange={handleInput} />
                  {errors.prenom && <p className="error-msg">{errors.prenom}</p>}
                </div>


                <div className='mt-0'>
                  <input type="email" placeholder="Email" name='email' onChange={handleInput} />
                  {errors.email && <p className="error-msg">{errors.email}</p>}
                </div>

                <div className='mt-0'>
                  <input type="password" placeholder="password" name='password' onChange={handleInput} />
                  {errors.password && <p className="error-msg">{errors.password}</p>}
                </div>

                <div className='mt-0'>
                  <input type="password" placeholder="confirmer password" name='passwordc' onChange={handleInput} />
                  {errors.passwordc && <p className="error-msg">{errors.passwordc}</p>}
                </div>

                <button type="submit" className='ml-12'>Sign Up</button>
              </form>
            </div>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-left">

                <h1 className=' ml-20'>Êtes vous Avocat</h1>
                <button id="signInButton" onClick={handleSignInClick}>Cliquez ici</button>
              </div>
              <div className="overlay-right">


                <h1 className='ml-20'>Êtes vous Client</h1>
                <button id="signUpButton" onClick={handleSignUpClick}>Cliquez ici</button>
              </div>
            </div>
          </div>
        </div>
      </section><Footer /></>

  );
}

export default SignUpForm;
