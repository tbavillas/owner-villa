"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const Swal = require("sweetalert2");

  const router = useRouter();

  const handleForm = (e) => {
    e.preventDefault();
    if (username && password) {
      if (username == password) {
        localStorage.setItem("data", password);
        router.push(`/villas/${password}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong Password",
        });
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://thebaliagent.com/api/data-villa");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    localStorage.removeItem("data");
    fetchData();
  }, []);

  const options = data.map((property) => ({
    value: property.beds24_property_id,
    label: property.property_name,
  }));

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <ClipLoader color="#36d7b7" size={50} />
          <style jsx>{`
            .loading-screen {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background: rgba(255, 255, 255, 0.8);
              position: fixed;
              width: 100%;
              top: 0;
              left: 0;
              z-index: 9999;
            }
          `}</style>
        </div>
      )}
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
              <form className="space-y-4 md:space-y-6" onSubmit={handleForm}>
                <div>
                  <Select
                    options={options}
                    placeholder={<div>Select Villa</div>}
                    onChange={(e) => setUsername(e.value)}
                    // instanceId={"wsad123wqwe"}
                  />
                </div>
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
                    required
                    onChange={(e) => setPassword(e.target.value)}
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
    </>
  );
}
