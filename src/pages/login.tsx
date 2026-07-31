import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate('/');
  };

  return (
    <main className="container login-page">
      <section className="login-card">
        <h1 className="h3 mb-3">Accedi</h1>

        <p className="text-secondary mb-4">Accedi con Google per continuare.</p>

        <button className="btn btn-app-primary w-100" type="button" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </section>
    </main>
  );
};
