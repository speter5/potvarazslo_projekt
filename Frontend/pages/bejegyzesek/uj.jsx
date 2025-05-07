import Navbar from "@/components/Navbar";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

import * as commands from "@uiw/react-md-editor/commands";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function UjBejegyzes({ felhasznalo, hiba }) {
  const router = useRouter();
  const [tartalom, setTartalom] = useState("");
  const [cim, setCim] = useState("");
  const [autoTipus, setAutoTipus] = useState("");
  const [linkek, setLinkek] = useState([]);
  const [link, setLink] = useState("");

  const poszt = () => {
    const raw = JSON.stringify({
      cim: cim,
      tartalom: tartalom,
      autoTipus: autoTipus,
      linkek: linkek,
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      redirect: "follow",
      credentials: "include",
      body: raw,
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://127.0.0.1:8080/api/bejegyzes/uj", requestOptions).then(
      async (response) => {
        if (response.ok) {
          router.push("/");
          toast.success("Sikeres posztolás!");
        } else {
          const error = await response.json();
          toast.error("Hiba! " + error?.error);
        }
      }
    );
  };
  if (hiba != 200 || felhasznalo?.jog < 5)
    return (
      <div className="min-h-screen bg-gray-700 flex flex-col items-center justify-center">
        <h1 className="text-white font-bold text-4xl">
          Nincs jogod az oldal megtekintéséhez!
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center">
      <title suppressHydrationWarning>PótVarázsló / Új poszt</title>

      <Navbar felhasznalo={felhasznalo} />

      <div className="w-full px-4 sm:px-8 mt-10 flex justify-center">
        <div className="bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-xl w-full max-w-3xl flex flex-col gap-6">
          <h1 className="text-white text-2xl font-bold text-center">
            Új bejegyzés létrehozása
          </h1>

          <input
            required
            min={3}
            id="cim"
            placeholder="Cím"
            value={cim}
            type="text"
            className="bg-white px-4 py-2 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
            onChange={(e) => setCim(e.currentTarget.value)}
          />

          <input
            required
            min={3}
            id="autoTipus"
            placeholder="Autótípus"
            value={autoTipus}
            type="text"
            className="bg-white px-4 py-2 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
            onChange={(e) => setAutoTipus(e.currentTarget.value)}
          />

          <div className="flex flex-col gap-2">
            <p className="text-white text-sm">
              A linkek hozzáadásához nyomja meg az "Enter"-t
            </p>

            <input
              required
              id="linkek"
              placeholder="Link hozzáadása"
              type="url"
              value={link}
              className="bg-white px-4 py-2 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const value = link;

                  if (URL.canParse(link)) {
                    if (!linkek.includes(value)) {
                      setLinkek([...linkek, link]);
                    } else {
                      setLink("");
                    }
                  } else {
                    toast.error("Hibás link!");
                  }
                }
              }}
              onChange={(e) => {
                setLink(e.currentTarget.value);
              }}
            />

            <div className="flex flex-col gap-1">
              {linkek.map((item, index) => (
                <a
                  key={index}
                  href={item}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300 break-words"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                const value = link;

                if (URL.canParse(link)) {
                  if (!linkek.includes(value)) {
                    setLinkek([...linkek, link]);
                  } else {
                    setLink("");
                  }
                } else {
                  toast.error("Hibás link!");
                }
              }}
              className="px-6 py-3 rounded-xl bg-blue-600 transition text-white font-semibold shadow-md"
            >
              Új link hozzáadása
            </button>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg">
            <MDEditor
              className="bg-gray-100 dark:bg-gray-900 rounded-xl min-h-[400px]"
              value={tartalom}
              onChange={setTartalom}
            />
          </div>

          <button
            onClick={poszt}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-md"
          >
            Posztolás
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const felhasznalo = await fetch("http://127.0.0.1:8080/api/felhasznalo", {
    headers: {
      cookie: ctx.req.headers?.cookie,
    },
  });

  const felhasznaloAdat = await felhasznalo.json();

  return {
    props: {
      felhasznalo: felhasznaloAdat,
      //
      hiba: felhasznalo?.status,
    },
  };
};
