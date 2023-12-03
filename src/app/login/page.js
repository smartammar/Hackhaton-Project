"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loggin } from "../firebase";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { authentication } from "../firebase";

export default function login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoggin = async () => {
    try {
      await loggin(email, password);
      router.push("/dashboard", { scroll: false });
    } catch (e) {
      alert(e.message);
    }
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        router.push("/dashboard", { scroll: false });
        console.log(re);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onRegister = () => {
    router.push("/register", { scroll: false });
  };

  return (
    <div
      className="Signin-card"
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <h3
        style={{
          color: "blue",
          fontSize: "25px",
          fontFamily: "cursive",
          paddingRight: "100px",
          paddingBottom: "50px",
          paddingTop: "10px",
        }}
      >
        Sign In
      </h3>

      <input
        style={{
          height: "30px",
          width: "300px",
          marginRight: "10px",
          marginBottom: "30px",
        }}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        style={{ height: "30px", width: "300px" }}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password "
      />
      <div style={{ display: "flex" }}>
        <button className="style-btns" onClick={onLoggin}>
          Sign in
        </button>
        <button className="style-btns" onClick={signInWithFacebook}>
          <img
            style={{ position: "absolute", width: "13px" }}
            src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png"
          />
          Facebook Login
        </button>
      </div>
      <p style={{ marginRight: "100px", marginTop: "50px" }}>
        Don't have an account.{" "}
        <span style={{ cursor: "pointer", color: "blue" }} onClick={onRegister}>
          Click here
        </span>
      </p>
    </div>
  );
}
