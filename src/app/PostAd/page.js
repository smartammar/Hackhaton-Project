"use client";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { IoImagesSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { postAd } from "../firebase";

export default function PostAd() {
  const router = useRouter();
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
    Swal.fire("Ad Posted Succesfully")
    postAd(title, file[0]);
    router.push("/dashboard",{scroll: false})  
};

  return (
<div className="bg-img">
    <div>
    <div className="Signin-card12">
      <br />
      <div>
        <div>
          <textarea
            className="text-style"
            placeholder={placeholder}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>

        <div className="label-style">
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
        <button onClick={addData} className="btn-s">
          Post
        </button>
      </div>
    </div>
    </div>
</div>
  );
}