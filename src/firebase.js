import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmkRFkM9cZpe1lHbP2uZBntHyag-1BTuk",
  authDomain: "toyidea-react-app.firebaseapp.com",
  projectId: "toyidea-react-app",
  storageBucket: "toyidea-react-app.appspot.com",
  messagingSenderId: "812419706364",
  appId: "1:812419706364:web:250830e6e4d4258a9fd679"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export 
const auth = getAuth(app);
// const auth = getAuth(app);

// export { app, auth };
// export default app;
export { app, auth };