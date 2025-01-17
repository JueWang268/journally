'use client'
import '../../styles/Auth.css';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation.js';
import { UserAuth } from '../context/AuthContext.js';

export default function Page() {
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

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const result = userSignIn(formData.email, formData.password);
      console.log({ result })
      if (result) {
        router.push('../');
        console.log('pushed from login to page');
      }
    }
    catch {
      console.log(e);
    }
  };

  const handleSignUpButtonClick = () => {
    router.push('../signup');
  };

  const handleRedirectMarketing = () => {
    router.push('../marketing2');
  };

  if (authLoading) {
    return <div><span>Loading...</span></div>;
  }

  return (
    <div className='auth-page'>

      <div className='auth-container'>
        <div className='auth-content'>
          <Image src="/journally-logo.png" alt="Logo" width={75} height={75} priority={false} />
          <h1 className='auth-title'>Login</h1>
          <span className='auth-description'>Sign into your account</span>
          <form className='auth-form' onSubmit={handleLogin}>
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
            <button className='auth-button' type="submit">Login</button>
          </form>
          <img
            className='google-auth-button'
            src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" // Google Sign-In button image
            alt="Sign in with Google"
            onClick={googleSignIn}
          />
          <div className='auth-redirect'>
            <div className='auth-redirect-line'>
              <span>Forgot Password? </span>
              <button className='auth-redirect-button' onClick={null}>Click here</button>
              <span> to reset</span>
            </div>
            <button className='auth-redirect-button' onClick={handleSignUpButtonClick}>Register new account</button>
          </div>

          {/* TODO: DELETE TEMPORARY BUTTON */}
          <button
            onClick={handleRedirectMarketing}
            className='auth-button'
            style={{
              marginTop: '1rem',
              marginBottom: '1rem',
              fontSize: '1rem'
            }}
          >
            Marketing2
          </button>

        </div >
      </div>
    </div>
  );
}