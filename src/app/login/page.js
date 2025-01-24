'use client'
import '../../styles/Auth.css';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation.js';
import { UserAuth } from '../context/AuthContext.js';

export default function Page() {
  const {
    user, authLoading,
    userSignIn, userSignUp,
    googleSignIn,
    userSignOut
  } = UserAuth();
  const router = useRouter();

  const [authErrorMessage, setAuthErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      router.push('../dashboard');
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await userSignIn(formData.email, formData.password);

    if (result.user) {
      router.push('../');
      console.log('Successful login.');
    }
    else {
      setFormData({
        ...formData,
        password: '',
      });
      setAuthErrorMessage(result.error);
    }
  };

  const handleSignUpButtonClick = () => {
    router.push('../signup');
  };

  const handleRedirectMarketing = () => {
    router.push('../marketing');
  };

  if (authLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw'
        }}
      >
        <Image src="/assets/loading.gif" alt="Logo" width={50} height={50} priority draggable='false' unselectable='true' />
      </div>
    );
  }



  return (
    <div className='auth-page'>
      <div className='auth-container'>
        <div className='auth-content'>
          <Image src="/journally-logo.png" alt="Logo" width={75} height={75} priority />
          <h1 className='auth-title'>Login</h1>
          <span className='auth-description'>Sign into your account</span>

          {authErrorMessage && <span className="auth-error-message">{authErrorMessage}</span>}

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

          {/* <button
            onClick={handleRedirectMarketing}
            className='auth-button'
            style={{
              marginTop: '1rem',
              marginBottom: '1rem',
              fontSize: '1rem'
            }}
          >
            Marketing
          </button> */}

        </div >
      </div>
    </div>
  );
}