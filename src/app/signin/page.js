
'use client'
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
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign In</h2>
      <form style={styles.form} onSubmit={handleSignIn}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Sign In</button>
      </form>

      <button onClick={handleSignUpButtonClick}>Sign Up</button>
    </div >
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7'
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '0.75rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};

// Add some hover effect for the button
styles.button[':hover'] = {
  backgroundColor: '#005bb5',
};