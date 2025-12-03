import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB4ZhJ-mXKEeOcylLlg7d2patP3dX15T_s",
  authDomain: "bedanshelf-1007a.firebaseapp.com",
  databaseURL:
    "https://bedanshelf-1007a-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "bedanshelf-1007a",
  storageBucket: "bedanshelf-1007a.firebasestorage.app",
  messagingSenderId: "91144066154",
  appId: "1:91144066154:web:2b70b7d28383908c02a613",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
