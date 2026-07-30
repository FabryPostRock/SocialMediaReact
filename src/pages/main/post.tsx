import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { Post as IPost } from './main';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
  post: IPost;
}

interface Like {
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, 'likes');
  /*
  likesRef : specify which collection
  where: a firebase method
  postId == post.id : è una condizione che specifica che devono essere raggruppati
                i like sui post (postId) che corrispondono al post che bisogna renderizzare (post.id).
  */
  const likesDoc = query(likesRef, where('postId', '==', post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };
  const addLike = async () => {
    await addDoc(likesRef, { userId: user?.uid, postId: post.id });
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1> {post.title}</h1>
      </div>
      <div className="body">
        <p> {post.description}</p>
      </div>
      <div className="footer">
        <p> {post.username}</p>
        {/*<>&#128078;</> : il fragment è aggiunto per distinguere la parte js da quella html*/}
        <button onClick={addLike}> {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} </button>
        {/*likeAmount && : Visuliazzo 'Likes:' solo se c'è almeno un like*/}
        {likes && <p> Likes: {likes?.length}</p>}
      </div>
    </div>
  );
};
