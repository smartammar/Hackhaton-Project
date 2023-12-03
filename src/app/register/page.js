"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registered } from "../firebase";

export default function register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");

  const signUp = async () => {
    try {
      await registered(email, password, fullname, age);
      alert("Sign Up Succesfully");
      router.push("/login", { scroll: false });
    } catch (e) {
      alert(e.message);
    }
  };

  const onLoggin = () => {
    router.push("/login", { scroll: false });
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
        Sign Up
      </h3>
      <input
        style={{
          height: "30px",
          width: "300px",
          marginRight: "80px",
          marginBottom: "30px",
        }}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="write fullname here"
      />
      <input
        style={{
          marginRight: "80px",
          height: "30px",
          width: "300px",
          marginBottom: "30px",
        }}
        type="number"
        onChange={(e) => setAge(e.target.value)}
        placeholder="write age here"
      />
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
        <button className="style-btns2" onClick={signUp}>
          Sign Up
        </button>
      </div>
      <p style={{ marginRight: "100px", marginTop: "50px" }}>
        Don't have an account.{" "}
        <span style={{ cursor: "pointer", color: "blue" }} onClick={onLoggin}>
          Click here
        </span>
      </p>
    </div>
  );
}
``;
