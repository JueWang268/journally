'use client'
import '../../styles/Auth.css';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config.js';
import { useRouter } from 'next/navigation.js';
import { createUser } from '../api/usersAPI.tsx';


export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  // const userSession = sessionStorage.getItem('user');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('User data:', formData);
    try {
      const result = await createUserWithEmailAndPassword(formData.email, formData.password);
      console.log({ result })
      if (result) {
        createUser(result.user.uid, formData.name, formData.email, formData.password);
        sessionStorage.setItem('user', true);
        router.push('../');
        console.log('pushed from sign up to page');
      }
    }
    catch (e) {
      console.log('errored')
      console.log(e);
    }
  };

  const handleLoginButtonClick = () => {
    router.push('../login');
    console.log('login clicked')
  };

  return (
    <div className='auth-page'>
      <div className='auth-container'>
        <div className='auth-content'>
          <h1 className='auth-title'>Sign Up</h1>
          <span className='auth-description'>Register your account</span>
          <form className='auth-form' onSubmit={handleSignUp}>
            <input
              className='auth-input'
              type="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              className='auth-input'
              type="email"
              name="email"
              placeholder="Username"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              className='auth-input'
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button className='auth-button' type="submit">Sign Up</button>
          </form>

          <div className='auth-redirect'>
            <span>Already have an account?</span>
            <button className='auth-redirect-button' onClick={handleLoginButtonClick}>Login</button>
          </div>

        </div >
      </div>
    </div>

  );
}
