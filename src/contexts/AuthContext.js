import React, { useContext, createContext, useState, useEffect } from "react";

import app, { auth, provider } from "../firebase";

import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();
  const [currentUserProfile, setCurrentUserProfile] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  function signup(email, password, firstName, lastName, username) {
    const db = app.firestore();
    try {
      return auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (credentials) => {
          const newprofile = {
            username: username,
            profileName: `${firstName} ${lastName}`,
            profilePhoto: "",
            profileHeadline: "",
            profileOrganization: "",
            profileOrganizationUrl: "",
            facebook: "",
            github: "",
            twitter: "",
            profileWebsite: "",
            linkedin: "",
            profileLocation: "",
            profileCountry: "",
            profileAboutMe: "",
          };
          await db.doc(`users/${credentials.user.uid}`).set(newprofile);
          return credentials.user;
        })
        .then(async (user) => {
          await user.updateProfile({
            displayName: `${firstName} ${lastName}`,
          });
        });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            user.admin = idTokenResult.claims.admin;
            setCurrentuser(user);
            setLoading(false);
          } else {
            setCurrentuser(user);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    upp();
  }, [currentUser]);

  const upp = async () => {
    const db = app.firestore();
    if (currentUser) {
      await db
        .doc(`users/${currentUser.uid}`)
        .get()
        .then((doc) => {
          setCurrentUserProfile(doc.data());
        });
    } else {
      return;
    }
  };

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updateDisplayName(displayName) {
    return currentUser
      .updateProfile({ displayName: displayName })
      .then(async () => {
        const db = app.firestore();
        await db
          .doc(`users/${currentUser.uid}`)
          .update({ profileName: displayName });
      });
  }
  function updateProfilePhoto(photourl) {
    return currentUser.updateProfile({ photoURL: photourl }).then(async () => {
      const db = app.firestore();
      await db
        .doc(`users/${currentUser.uid}`)
        .update({ profilePhoto: photourl });
    });
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateEmail,
    updatePassword,
    updateDisplayName,
    updateProfilePhoto,
    resetPassword,
    currentUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
