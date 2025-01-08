"use client";
import LoginForm from "@/components/loginForm";
import RegisterForm from "@/components/registerForm";
import { useState } from "react";

export default function Forms() {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <div>
      {showRegister ? (
        <RegisterForm setShowRegister={setShowRegister} />
      ) : (
        <LoginForm setShowRegister={setShowRegister} />
      )}
    </div>
  );
}
