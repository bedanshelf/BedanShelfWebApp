import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "../Config/FirebaseConfig";
import { ref, get, set } from "firebase/database";
import type { User } from "../Components/Context/AuthContext";

// REGISTER USER
export async function registerUser(
  email: string,
  password: string,
  name: string,
  role: string
) {
  const auth = getAuth();
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  const uid = userCred.user.uid;

  await set(ref(db, "users/" + uid), {
    name,
    email,
    role,
  });

  return uid;
}

// LOGIN USER
export async function loginUser(
  email: string,
  password: string
): Promise<User> {
  const auth = getAuth();
  const userCred = await signInWithEmailAndPassword(auth, email, password);

  const uid = userCred.user.uid;
  const profileSnap = await get(ref(db, "users/" + uid));

  if (!profileSnap.exists()) throw new Error("User profile not found!");

  const profile = profileSnap.val();

  const user: User = {
    uid,
    email: profile.email,
    name: profile.name,
    role: Array.isArray(profile.role) ? profile.role : [profile.role],
  };

  // Save to localStorage for persistence
  localStorage.setItem("currentUser", JSON.stringify(user));

  return user;
}

// LOGOUT USER
export async function logoutUser() {
  const auth = getAuth();
  await signOut(auth);

  // Remove user from localStorage
  localStorage.removeItem("currentUser");
  console.log("logout auth service triggered.");
}

// GET CURRENT USER FROM LOCALSTORAGE
export function getCurrentUser(): User | null {
  const userData = localStorage.getItem("currentUser");
  if (!userData) return null;
  try {
    return JSON.parse(userData) as User;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    return null;
  }
}
