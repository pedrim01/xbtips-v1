import firebase from "../firebase/config";
import { createContext, ReactNode, useEffect, useState } from "react";
import User from "../model/User";
import Cookies from "js-cookie";
import router from "next/router";

interface AuthFirebaseContextProps {
  user?: User | null;
  loading?: boolean;
  signin?: (email: string, password: string) => Promise<void>;
  signup?: (email: string, password: string) => Promise<void>;

  loginGoogle?: () => Promise<void>;
  signOut?: () => Promise<void>;
}

async function userNormalize(userFirebase: firebase.User): Promise<User> {
  const token = await userFirebase.getIdToken();

  return {
    uid: userFirebase.uid,
    name: userFirebase.displayName,
    email: userFirebase.email,
    token,
    provider: userFirebase.providerId,
    imageUrl: userFirebase.photoURL,
  };
}

function managerCookie(logged: boolean) {
  if (logged) {
    Cookies.set("admin-template-xbtips-auth", `${logged}`, {
      expires: 7,
    });
  } else {
    Cookies.remove("admin-template-xbtips-auth");
  }
}

const AuthFirebaseContext = createContext<AuthFirebaseContextProps>({});

export function AuthFirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function configSession(userFirebase: firebase.User | null) {
    if (userFirebase?.email) {
      const user = await userNormalize(userFirebase);
      setUser(user);
      managerCookie(true);
      setLoading(false);
      return user.email;
    } else {
      setUser(null);
      managerCookie(false);
      setLoading(false);
      return false;
    }
  }

  async function signin(email:string, password:string) {
    try {
      const resp = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      await configSession(resp.user);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }

  async function signup(email:string, password:string) {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await configSession(resp.user);
      router.push('/');
    } finally {
      setLoading(false);
    }
  }

  async function loginGoogle() {
    

    try {
      const resp = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

      await configSession(resp.user);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await configSession(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (Cookies.get('admin-template-xbtips-auth')) {
      const cancel = firebase.auth().onIdTokenChanged(configSession);

      return () => cancel();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthFirebaseContext.Provider
      value={{
        user,
        loading,
        signin,
        signup,
        loginGoogle,
        signOut
      }}
    >
      {children}
    </AuthFirebaseContext.Provider>
  );
}

export default AuthFirebaseContext;