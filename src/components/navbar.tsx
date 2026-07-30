import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

/*
<img src={auth.currentUser?.photoURL || ''} /> : Se la foto non è presente 
Typescript non accetta null e obbliga a settare una stringa vuota come alternativa.
*/
export const Navbar = () => {
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <nav className="navbar navbar-dark app-navbar shadow-sm">
      <div className="container d-flex flex-column flex-md-row gap-3">
        {/* Link di navigazione */}
        <Link className="navbar-brand fw-bold" to="/">
          Social Media
        </Link>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <Link className="nav-link" to="/">
            {' '}
            Home{' '}
          </Link>
          {!user ? (
            <Link className="nav-link" to="/login">
              {' '}
              Login{' '}
            </Link>
          ) : (
            <Link className="nav-link" to="/createpost">
              {' '}
              Create Post{' '}
            </Link>
          )}
          <Link className="nav-link" to="/login">
            {' '}
            Login{' '}
          </Link>
        </div>
        {/* Mostra i dati solamente quando user esiste */}
        {/* <> : è un React Fragment.
          Serve a raggruppare più elementi JSX senza aggiungere un ulteriore elemento HTML nel DOM.
          React richiede infatti che un’espressione JSX restituisca un solo elemento principale. 
      */}
        {user && (
          <div className="app-user ms-md-auto">
            <p className="app-user-name"> {auth.currentUser?.displayName}</p>
            <img className="app-user-avatar" src={auth.currentUser?.photoURL || 'utente'} />
            <button className="btn btn-sm btn-app-light" onClick={signUserOut}>
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
