import Link from "next/link";
import { useState } from "react";
import { YoutubeLogo } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";

export default function Home({ bejegyzes, felhasznalo }) {
  const [kereso, setKereso] = useState("");
  const [talalatok, setTalalatok] = useState([]);
  const [filter, setFilter] = useState(null);

  const kereses = async () => {
    if (!kereso) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8080/api//bejegyzes/kereses/?szoveg=${kereso}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error(`Hiba: ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();
      setTalalatok(data);
    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen bg-gray-700 ">
      <title>PótVarázsló</title>
      <Navbar felhasznalo={felhasznalo} />

      {/* Kereső */}
      <div className="mt-10 flex justify-center">
        <input
          type="text"
          placeholder="Keresés..."
          value={kereso}
          onChange={(e) => {
            setKereso(e.target.value);
            if (e.target.value.length == 0) setTalalatok([]);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") kereses();
          }}
          className="bg-white px-4 py-2 rounded-lg w-1/2 text-black focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button
          className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={kereses}
        >
          Keresés
        </button>
      </div>

      <div className="mt-10 flex justify-center space-x-4">
        <button
          onClick={() => {
            if (filter == true) {
              setFilter(null);
            } else {
              setFilter(true);
            }
          }}
          className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition ${filter == true ? "bg-white hover:bg-white text-blue-600" : "bg-blue-600 text-white"}`}
        >
          Videó
        </button>
        <button
          onClick={() => {
            if (filter == false) {
              setFilter(null);
            } else {
              setFilter(false);
            }
          }}
          className={`px-4 py-2 rounded-lg hover:bg-blue-700 transition ${filter == false ? "bg-white hover:bg-white text-blue-600" : "bg-blue-600 text-white"}`}
        >
          Dokumentumok
        </button>
      </div>

      {kereso.length > 0 && talalatok.length > 0 && (
        <div className=" text-center my-10 text-white text-3xl font-extrabold">
          <span className="shadow-lg">Keresési találtaok</span>
        </div>
      )}
      {kereso.length > 0 && talalatok.length == 0 && (
        <div className=" text-center my-10 text-white text-3xl font-extrabold">
          <span className="shadow-lg">Nincs találat</span>
        </div>
      )}

      {kereso.length > 0 && talalatok.length > 0 && (
        <div className="flex flex-col gap-10  w-full items-center">
          {talalatok?.map((item, index) => {
            return <Post post={item} key={index} />;
          })}
        </div>
      )}
      <div className=" text-center my-10 text-white text-3xl font-extrabold">
        <span className="shadow-lg">Legutóbbi bejegyzések</span>
      </div>

      <div className="flex flex-col gap-10  w-full items-center">
        {bejegyzes
          ?.filter((f) => {
            if(filter != null){
              return f?.video == filter
            }else return f
          })
          ?.map((item, index) => {
            return <Post post={item} key={index} />;
          })}
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

  const adat = await fetch("http://127.0.0.1:8080/api/bejegyzes");

  const adatok = await adat.json();

  return {
    props: {
      felhasznalo: felhasznaloAdat,
      bejegyzes: adatok,
    },
  };
};
