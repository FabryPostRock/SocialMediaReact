import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

/*
<img src={auth.currentUser?.photoURL || ''} /> : Se la foto non è presente 
Typescript non accetta null e obbliga a settare una stringa vuota come alternativa.
*/
export const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <div>
        <p> {auth.currentUser?.displayName}</p>
        <img src={auth.currentUser?.photoURL || ''} width="20" height="20" />
      </div>
    </div>
  );
};
