'use client'
import '../../styles/Auth.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation.js';
import { createUser } from '../api/usersAPI.tsx';
import { UserAuth } from '../context/AuthContext.js';

export default function SignUpPage() {
  const {
    user, authLoading, authError,
    userSignIn, userSignUp,
    googleSignIn,
    userSignOut
  } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('../');
    }
  }, [user, router]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    try {
      const result = userSignUp(formData.email, formData.password);
      if (result) {
        createUser(result.user.uid, formData.name, formData.email, formData.password);
        router.push('../');
        console.log('pushed from signup to page');
      }
    }
    catch (e) {
      console.log(e);
    }
  };

  const handleLoginButtonClick = () => {
    router.push('../login');
  };

  if (authLoading) {
    return <div><span>Loading...</span></div>;
  }

  return (
    <div className='auth-page'>
      <div className='auth-container'>
        <div className='auth-content'>
          <Image src="/journally-logo.png" alt="Logo" width={75} height={75} priority={false} />
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
          <div className='auth-redirect-line'>
            <span>Already have an account? </span>
            <button className='auth-redirect-button' onClick={handleLoginButtonClick}>Login</button>
          </div>

        </div >
      </div>
    </div>

  );
}
