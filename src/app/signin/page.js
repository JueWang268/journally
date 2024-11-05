
'use client'
import '../../styles/auth.css';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config.js';
import { useRouter } from 'next/navigation.js';
import { useUsers } from '../hooks/useUsers.js';

export default function SignInPage() {
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('User data:', formData);
    try {
      const result = await signInWithEmailAndPassword(formData.email, formData.password);
      console.log({ result })
      if (result) {
        sessionStorage.setItem('user', true)
        setFormData('', '');
        router.push('/');
        console.log('signed in');
        console.log('pushed from sign in to page');
      }
    }
    catch {
      console.log(e);
    }
  };

  const handleSignUpButtonClick = () => {
    router.push('../signup');
    console.log('signup clicked')
  };

  return (
    <div className='auth-container'>
      <h2 >Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>

      <button onClick={handleSignUpButtonClick}>Sign Up</button>
    </div >
  );
}