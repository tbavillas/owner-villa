"use client";

import React, { useEffect, useState } from "react";

export default function Villas() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://www.thebaliagent.com/api/data-villa");
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

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;



  return (
    <main>
      <div className="flex">
        <div className="border-solid-1">Block 1</div>
        <div className="border-solid-1">Block 2</div>
        <div></div>
      </div>
    </main>
  );
}
