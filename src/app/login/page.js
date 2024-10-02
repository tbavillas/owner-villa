"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Login() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const checkUser = () => {
    const usercheck = password == 6789;
    if (usercheck) {
      return true;
    } else {
      return false;
    }
  };

  const sumbitData = (e) => {
    e.preventDefault();
    const a = checkUser();
    if (a == true) {
      localStorage.setItem("login", true);
      router.push("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong Password",
      });
    }
  };

  return (
    <main>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold">
            The Bali Agent
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight">
                Sign in
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={sumbitData}>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="rounded-lg block w-full p-2.5 border-2 border-black"
                    onChange={handlePassword}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start"></div>
                </div>

                <button
                  type="submit"
                  className="text-white bg-[#279384] font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
