"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { IoImagesSharp } from "react-icons/io5";
import Dashboard from "../dashboard/page";

import { postAd } from "../firebase";

export default function PostAd() {
  const [user, setUser] = useState("");
  const [file, setfile] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user-->", user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  let placeholder = `What's on your mind ${user.displayName}`;

  const addData = () => {
    postAd(title, file[0]);
  };

  return (
    <div>
        <Dashboard />
      <br />
      <div>
        <div>
          <textarea
            placeholder={placeholder}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="fileUpload" className="custom-file-upload">
            <IoImagesSharp />
          </label>

          <input
            onChange={(e) => setfile(e.target.files)}
            type="file"
            id="fileUpload"
            style={{ display: "none", cursor: "pointer" }}
          />
        </div>
        <br />
        <button onClick={addData} style={{ border: "2px solid black" }}>
          Post
        </button>
      </div>
    </div>
  );
}
