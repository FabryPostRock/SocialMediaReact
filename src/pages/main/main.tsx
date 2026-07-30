/* from firestore library we can choose between:
- getDocs: to get multiple docs
- getDoc: for a single doc
*/
import { collection, doc, documentSnapshotFromJSON, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './post';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

/*
Thanks to firebase it's not necessary to use ReactQuery to Query data
given that firebase has it's own methods.
*/
export const Main = () => {
  // we use useState to save the data we get back from the request
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postRef = collection(db, 'post');
  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <main className="container app-page">
      <h1 className="app-page-title text-center">Post recenti</h1>

      {postsList === null ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" aria-label="Caricamento dei post" />
        </div>
      ) : postsList.length === 0 ? (
        <div className="app-empty-state">Non è ancora stato pubblicato nessun post.</div>
      ) : (
        <div className="posts-grid">
          {/*
      Questa scrittura è una arrow function con return implicito: 
      (post) => (
        <Post post={post} />
      )
      ed è equivalente a :
      (post) => {
        return <Post post={post} />;
      }
      */}
          {postsList.map((post) => (
            /*
            <Post post={post} /> : Crea un’istanza del componente React Post e gli passa una prop chiamata post, 
            il cui valore è la variabile post corrente del map().
            Il post corrente quindi viene passato come prop.
            Aggiungere sempre la proprietà 'key' per mappare correttamente oggetti iterabili 
          */
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
};
