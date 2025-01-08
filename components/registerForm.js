"use client";
import { useForm } from "react-hook-form";
import { registerAction } from "@/actions";
import { useState } from "react";

export default function RegisterForm({ setShowRegister }) {
  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    reset();
    const result = await registerAction(formData);

    if (!result.ok) {
      displayRegisterError(result.error.message);
    }
  };

  const displayRegisterError = (message) => {
    setRegisterError(message);
    setTimeout(() => {
      setRegisterError(null);
    }, 2000);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-4 text-center text-2xl font-bold">Register</h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-gray-800"
          >
            Email:
          </label>
          <input
            {...register("email", {
              required: { value: true, message: "Email is required" },
              minLength: { value: 5, message: "Minimum 5 characters" },
              maxLength: { value: 200, message: "Maximum 200 characters" },
            })}
            type="text"
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-gray-800"
          />
          {errors.email?.message && (
            <p className="mt-2 text-sm text-red-500">
              {errors.email.message.toString()}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block font-medium text-gray-800"
          >
            Password:
          </label>
          <input
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: { value: 5, message: "Minimum 5 characters" },
              maxLength: { value: 200, message: "Maximum 200 characters" },
            })}
            type="password"
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-gray-800"
          />
          {errors.password?.message && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message.toString()}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-black px-4 py-2 text-white transition duration-200 hover:bg-gray-700"
        >
          Register
        </button>
      </form>
      {registerError && (
        <p className="mt-2 text-sm text-red-500">{registerError}</p>
      )}
      <p className="mb-6 mt-4">
        Already have an account?{" "}
        <span
          className="cursor-pointer underline underline-offset-2 transition hover:text-gray-500"
          onClick={() => setShowRegister(false)}
        >
          Log in
        </span>
      </p>
    </>
  );
}
