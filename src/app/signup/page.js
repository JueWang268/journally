'use client'
import '../../styles/auth.css';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config.js';
import { useRouter } from 'next/navigation.js';
// import { useUsers } from '../hooks/useUsers.js';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // const {
  //   loading,
  //   error,
  //   addUser,
  //   editUser,
  //   removeUser } = useUsers();

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
        // addUser(formData.email, )
        sessionStorage.setItem('user', true)
        setFormData('', '');
        router.push('/');
        console.log('signed up');
        console.log('pushed from sign up to page');
      }
    }
    catch {
      console.log(e);
    }
  };

  const handleSignUpButtonClick = () => {
    router.push('../signin');
    console.log('signin clicked')
  };

  return (
    <div className='auth-container'>
      <h2 >Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form>

      <button onClick={handleSignUpButtonClick}>Sign In</button>
    </div >
  );
}
