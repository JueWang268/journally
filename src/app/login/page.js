
'use client'
import '../../styles/auth.css';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config.js';
import { useRouter } from 'next/navigation.js';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  // const userSession = sessionStorage.getItem('user');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log('User data:', formData);
    try {
      const result = await signInWithEmailAndPassword(formData.email, formData.password);
      console.log({ result })
      if (result) {
        sessionStorage.setItem('user', true);
        router.push('../');
        console.log('pushed from login to page');
      }
    }
    catch {
      console.log('errored somewhere in login');
      console.log(e);
    }
  };

  const handleSignUpButtonClick = () => {
    router.push('../signup');
    console.log('signup clicked')
  };

  return (
    <div className='auth-container'>
      <h2 className='auth-title'>Login</h2>
      <form className='auth-form' onSubmit={handleLogin}>
        <input
          className='auth-input'
          type="email"
          name="email"
          placeholder="Email"
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
        <button className='auth-button' type="submit">Login</button>
      </form>

      <button className='auth-button' onClick={handleSignUpButtonClick}>Sign Up</button>
    </div >
  );
}