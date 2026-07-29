import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';

/*
<img src={auth.currentUser?.photoURL || ''} /> : Se la foto non è presente 
Typescript non accetta null e obbliga a settare una stringa vuota come alternativa.
*/
export const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <div>
        <p> {auth.currentUser?.displayName}</p>
        <img src={auth.currentUser?.photoURL || ''} width="100" height="100" />
      </div>
    </div>
  );
};
