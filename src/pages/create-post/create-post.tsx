import { CreateForm } from './create-form';

export const CreatePost = () => {
  return (
    <main className="container app-page">
      <h1 className="app-page-title text-center">Crea un nuovo post</h1>

      <div className="create-post-page">
        <CreateForm />
      </div>
    </main>
  );
};
