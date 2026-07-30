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
    <form className="create-post-form" onSubmit={handleSubmit(onCreatePost)}>
      {/*
        In JSX, ogni elemento deve essere chiuso. Per gli elementi vuoti si usa '/>'
     */}
      <div className="mb-3">
        <label className="form-label" htmlFor="post-title">
          Give an attractive Title
        </label>

        <input
          id="post-title"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          placeholder="Title..."
          {...register('title')}
        />
        <p className="field-error">{errors.title?.message}</p>
      </div>
      <div className="mb-3">
        <p style={{ color: 'red' }}>{errors.title?.message}</p>
        <textarea
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          placeholder="Description..."
          {...register('description')}
        />
        <p className="field-error" style={{ color: 'red' }}>
          {errors.description?.message}
        </p>
      </div>
      <button className="btn btn-app-light w-100 fw-semibold" type="submit">
        {' '}
        Create{' '}
      </button>
    </form>
  );
};
