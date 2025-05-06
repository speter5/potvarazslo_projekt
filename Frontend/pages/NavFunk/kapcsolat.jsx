import Link from "next/link";
import { useState } from "react";
import { YoutubeLogo } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";

export default function Bejelentkezés({ bejegyzes }) {
  const Login = (email, password) => {
    fetch(`https://127.0.0.1:8080/api/auth/login`, {
      method: "POST",
      redirect: "follow",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      switch (res.status) {
        case 200:
          alert("bejelnetkezve");
          break;

        default:
          alert("hiba");
          break;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-600 text-white flex flex-col items-center">
      <title>PótVarázsló | Kapcsolat</title>
      <Navbar />

      <h1 className="text-5xl font-extrabold mt-16 mb-20 text-center tracking-wide animate-fade-in">
        Elérhetőségeink
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-5xl px-6 gap-12 mb-24">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full md:w-1/2 text-center hover:scale-105 transition-transform">
          <p className="text-2xl font-semibold mb-2">Gál Levente</p>
          <p className="text-lg text-gray-300">gal.levente@example.com</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full md:w-1/2 text-center hover:scale-105 transition-transform">
          <p className="text-2xl font-semibold mb-2">Siroki Péter</p>
          <p className="text-lg text-gray-300">siroki.peter@example.com</p>
        </div>
      </div>

      <div className="mb-12 text-center">
        <p className="text-xl md:text-2xl font-medium">📞 +36 30 123 4567</p>
      </div>
    </div>
  );
}
export const getServerSideProps = async () => {
  const res = await fetch("http://127.0.0.1:8080/api/bejegyzes");

  const data = await res.json();

  return {
    props: {
      bejegyzes: data,
    },
  };
};
