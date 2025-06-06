import React, { useRef, useState } from "react";
import Header from "../components/Header";
import { validateForm } from "../utils/validateForm";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import "./LoginPage.css";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [isError, setIsError] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    email.current.value = "";
    password.current.value = "";
    setIsError("");
    if (!isSignInForm) {
      confirmPassword.current.value = "";
      name.current.value = "";
    }
    setIsSignInForm(!isSignInForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError("");
    let message;
    if (isSignInForm) {
      message = validateForm(email.current.value, password.current.value);
      setIsError(message);
      if (message === null) {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("SignIn successfull!");
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setIsError(errorCode + "-" + errorMessage);
          });
      }
    } else {
      message = validateForm(
        email.current.value,
        password.current.value,
        confirmPassword.current.value,
        name.current.value
      );
      setIsError(message);
      if (message === null) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value,
              photoURL: "/pics/netflix-prof-pic.jpg",
            })
              .then(() => {
                // Profile updated!
                const { uid, email, displayName } = auth.currentUser;
                dispatch(
                  addUser({ uid: uid, email: email, displayName: displayName })
                );
              })
              .catch((error) => {
                // An error occurred
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsError(errorCode + "-" + errorMessage);
              });
            console.log("Signup successfull!");
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setIsError(errorCode + "-" + errorMessage);
          });
      }
    }
  };

  return (
    <>
      <Header />
      <div className="login-main">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          {!isSignInForm && (
            <input type="text" placeholder="Full Name" ref={name} />
          )}
          <input type="email" placeholder="Email ID" ref={email} />
          <input type="password" placeholder="Password" ref={password} />
          {!isSignInForm && (
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmPassword}
            />
          )}
          <p id="error-mssg">{isError}</p>
          <input type="submit" value="Sign In" id="submit-form" />
          <p className="new-user">
            {isSignInForm ? "New to Netflix?" : "Already a Member?"}{" "}
            <a onClick={toggleSignInForm}>
              {isSignInForm ? "Sign Up Now" : "Sign In"}
            </a>{" "}
          </p>
        </form>
      </div>
    </>
  );
};
export default LoginPage;
