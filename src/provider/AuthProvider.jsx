/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { Toaster } from "react-hot-toast";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    // console.log(loading, user);
  
    const createNewUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const userLogin = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
  const signInWithGoogle = () => {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
  };
  const updateUserProfile = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  };

    const authInfo = {
      user,
      setUser,
      createNewUser,
      logOut,
      userLogin,
      loading,
      signInWithGoogle,
      email,
      setEmail,
      updateUserProfile
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => {
        unsubscribe();
      };
    }, []);
  
    return (
      <AuthContext.Provider value={authInfo}>{children}
      <Toaster />
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;