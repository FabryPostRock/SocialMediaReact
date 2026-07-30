# Create First Collection

Firestore è NoSQL, i dati sono definiti tramite una collection che contiene diversi riferimenti chiamati document a cui sono collegati dei json fields.

La prima cosa da fare è creare lo schema Firestore della collection che nell'esempio è chiamata 'post' da React.

Lo si fa direttamente da browser nell'interfaccia di firestore inserendo un primo documento bozza che poi si può cancellare ma in questo modo si è creata una nuova collection.

# Abilitare la scrittura su Firestore

Quando viene creato il db la Rule/Permission di default è :

```text
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

La riga `allow read, write: if false` significa che nessuno può scrivere o leggere.
Per abilitarlo in modo facile si può impostare a 'true' la condizione: `allow read, write: if true`

Un modo più restrittivo può essere impostare che l'accesso in scrittura sia consentito solo ad un utente esistente e l'utente che scrive deve coincidere con quello loggato :

`allow write: if request.auth != null && request.auth.uid == request.resource.data.userId ;`

I post possono essere letti solo se l'utente è autenticato.

`allow read: if request.auth != null ;`

Quindi nel complesso risulta:

```text
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow write: if request.auth != null && request.auth.uid == request.resource.data.userId ;
      allow read: if request.auth != null ;
    }
  }
}
```

# File di configurazione Firebase/Firestore

```typescript
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'XXXXXXXXX',
  authDomain: 'XXXXXXXXXXXX',
  projectId: 'XXXXXXXXXX',
  storageBucket: 'XXXXXXXXXXXXXX',
  messagingSenderId: 'XXXXXXXX',
  appId: '1:XXXXXXXXXXXXXXXXXXXX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
```
