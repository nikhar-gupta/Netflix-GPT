import React, { useEffect, useState } from "react";
import "./Header.css";
import useScreenSize from "../hooks/useScreenSize";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearch } from "../utils/gptSearchSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [browseList, setBrowseList] = useState(false);
  const [profileList, setProfileList] = useState(false);
  const screenSize = useScreenSize();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (screenSize.width >= 890) {
      setBrowseList(true);
    } else setBrowseList(false);
  }, [screenSize.width]);

  const handleBrowseBtn = () => {
    setProfileList(false);
    setBrowseList(!browseList);
  };
  const handleProfileBtn = () => {
    screenSize.width < 890 && setBrowseList(false);
    setProfileList(!profileList);
  };
  const handleSearchBtn = () => {
    setProfileList(false);
    dispatch(toggleGptSearch());
    screenSize.width < 890 && setBrowseList(false);
  };

  return (
    <div className="header-main">
      <div className="left">
        <img
          id="netflix-logo"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        />
        {user && screenSize.width < 890 && (
          <div className="browse-btn" onClick={handleBrowseBtn}>
            <p>Browse</p>
          </div>
        )}
        {user && browseList && (
          <ul className="nav-list">
            <li className="nav-item">
              <p>Home</p>
            </li>
            <li className="nav-item">
              <p>TV Shows</p>
            </li>
            <li className="nav-item">
              <p>Movies</p>
            </li>
            <li className="nav-item">
              <p>New & Popular</p>
            </li>
          </ul>
        )}
      </div>
      {user && (
        <div className="right">
          <div className="aiSearchBtn" onClick={handleSearchBtn}>
            <p>AI Search</p>
          </div>
          <img
            id="profile-pic"
            src="/pics/netflix-prof-pic.jpg"
            onClick={handleProfileBtn}
          />
          {profileList && (
            <ul className="profile-nav-list">
              <li className="profile-list-item">
                <p>My Account</p>
              </li>
              <li className="profile-list-item">
                <p onClick={handleSignOut}>Sign out of Netflix</p>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
