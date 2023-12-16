import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyBB264OdwpFVncz4n2Lc79cHbDQvID2mrs",
//   authDomain: "mrb-todo-app.firebaseapp.com",
//   projectId: "mrb-todo-app",
//   storageBucket: "mrb-todo-app.appspot.com",
//   messagingSenderId: "459914540564",
//   appId: "1:459914540564:web:bbe386a00c3715dd825901",
// };

// export const app = initializeApp(firebaseConfig);
