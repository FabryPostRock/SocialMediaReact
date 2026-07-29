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
    <div className="navbar">
      {/* Link di navigazione */}
      <div className="links">
        <Link to="/"> Home</Link>
        <Link to="/login"> Login</Link>
      </div>
      <div className="user">
        {/* Mostra i dati solamente quando user esiste */}
        {/* <> : è un React Fragment.
            Serve a raggruppare più elementi JSX senza aggiungere un ulteriore elemento HTML nel DOM.
            React richiede infatti che un’espressione JSX restituisca un solo elemento principale. 
        */}
        {user && (
          <>
            <p> {auth.currentUser?.displayName}</p>
            <img src={auth.currentUser?.photoURL || ''} width="20" height="20" />
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};
