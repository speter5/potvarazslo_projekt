import Link from "next/link";
import { useState } from "react";
import { YoutubeLogo } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function Bejelentkezés({ bejegyzes }) {
  const router = useRouter();

  const [regMode, setRegMode] = useState(false);
  const [mechMode, setMechMode] = useState(false);
  const [email, setEmail] = useState("");
  const [jelszo, setJelszo] = useState("");
  const [telefonszam, setTelefonszam] = useState("");
  const [felhasznaloNev, setFelhasznalonev] = useState("");


  const Login = (email, jelszo) => {
    fetch(
      `http://127.0.0.1:8080/api/auth/login?email=${email}&password=${jelszo}`,
      {
        method: "POST",
        redirect: "follow",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      switch (res.status) {
        case 200:
          toast.success("Sikeres bejelentkezés!");
          router.replace("/");
          break;

        default:
          toast.error("Hiba!");
          break;
      }
    });
  };

  const Register = (email, jelszo, felhasznaloNev, telefonszam) => {
    fetch(`https://127.0.0.1:8080/api/auth/signup`, {
      method: "POST",
      redirect: "follow",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nev: felhasznaloNev,
        email: email,
        jelszo: jelszo,
        telefonszam: telefonszam,
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
    <div className="bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen  bg-gray-700 ">
      <title>PótVarázsló</title>
      <Navbar />

      <div className="mt-30 gap-5 flex flex-col justify-center items-center">
        {regMode && (
          <input
            type="text"
            placeholder="Felhasználónév..."
            className="bg-white px-4 py-2 rounded-lg w-xs text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={felhasznaloNev}
            onChange={(e) => setFelhasznalonev(e.target.value)}
          />
        )}
        <input
          type="email"
          id="email"
          placeholder="Email..."
          className="bg-white px-4 py-2 rounded-lg w-xs text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Jelszó..."
          className="bg-white px-4 py-2 rounded-lg w-xs text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
          value={jelszo}
          onChange={(e) => setJelszo(e.target.value)}
        />
        {regMode && mechMode && (
          <input
            type="tel"
            id="phone"
            placeholder="Telefonszám..."
            className="bg-white px-4 py-2 rounded-lg w-xs text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={telefonszam}
            onChange={(e) => setTelefonszam(e.target.value)}
          />
        )}
         {regMode && <div class="flex">
          <div class="flex items-center h-5">
            <input
              id="helper-checkbox"
              aria-describedby="helper-checkbox-text"
              type="checkbox"
              value={mechMode}
              onChange={(event) => {
                setMechMode(!mechMode);
              }}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div class="ms-2 text-sm">
            <label
              for="helper-checkbox"
              class="font-medium text-gray-900 dark:text-gray-300"
            >
              Szerelő vagyok
            </label>
            <p
              id="helper-checkbox-text"
              class="text-xs font-normal text-gray-500 dark:text-gray-300"
            >
              Csak akkor pipáld be a mezőt ha szerelő vagy és jelentkezni
              szeretnél
            </p>
          </div>
        </div>}
        <button
          onClick={() => {
            if (regMode == false) {
              Login(email, jelszo);
            }
            setRegMode(false);
          }}
          className="ml-4 px-6 py-2 bg-white text-black  rounded-lg hover:bg-gray-200 transition"
        >
          Bejelentkezés
        </button>
        <button
          onClick={() => {
            if (regMode == true) {
              Register(email,jelszo,felhasznaloNev,telefonszam)
            }
            setRegMode(true);
          }}
          className="font-semibold ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Regisztráció
        </button>{" "}
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
