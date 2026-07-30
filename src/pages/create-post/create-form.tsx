import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
/*
una collection è la collection chiamata 'post' che abbiamo creato su firestore
a cui è associato un document con un identificativo.
Ad ogni azione sulla collection 'post' si aggiunge di fatto un documento.
*/
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required('You must add a title.'),
    description: yup.string().required('You must add a description.'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, 'post');

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    } as CreateFormData);
  };
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      {/*
        In JSX, ogni elemento deve essere chiuso. Per gli elementi vuoti si usa '/>'
     */}
      <input placeholder="Title..." {...register('title')} />
      <p style={{ color: 'red' }}>{errors.title?.message}</p>
      <textarea placeholder="Description..." {...register('description')} />
      <p style={{ color: 'red' }}>{errors.description?.message}</p>
      <input type="submit" />
    </form>
  );
};
