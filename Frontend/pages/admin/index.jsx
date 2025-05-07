import { useState } from "react";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Admin({ bejegyzesek, felhasznalo }) {
  const router = useRouter();
  if (!felhasznalo) return;

  const jovahagy = (bejegyzesID) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      redirect: "follow",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "http://127.0.0.1:8080/api/bejegyzes/" + bejegyzesID + "/jovahagy",
      requestOptions
    ).then(async (response) => {
      if (response.ok) {
        router.push(router.asPath, undefined);
        toast.success("Poszt jóváhagyva!");
      } else {
        const error = await response.json();
        toast.error("Hiba! " + error?.error);
      }
    });
  };
  const torles = (bejegyzesID) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "http://127.0.0.1:8080/api/bejegyzes/" + bejegyzesID,
      requestOptions
    ).then(async (response) => {
      if (response.ok) {
        router.push(router.asPath, undefined);        toast.success("Poszt törölve!");
      } else {
        const error = await response.json();
        toast.error("Hiba! " + error?.error);
      }
    });
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen bg-gray-700 ">
      <title>PótVarázsló</title>
      <Navbar felhasznalo={felhasznalo} />

      <div className=" text-center my-10 text-white text-3xl font-extrabold">
        <span className="shadow-lg">Összes bejegyzések</span>
      </div>

      <div className="flex flex-col gap-10  w-full items-center">
        {bejegyzesek?.map((item, index) => {
          return (
            <>
              <Post post={item} key={index} />
              <div className="flex gap-5 text-white ">
                <button
                  className="p-2 bg-gray-800 rounded-xl"
                  onClick={() => {
                    jovahagy(item?.bejegyzesID);
                  }}
                >
                  <Check size={24} weight="bold" />
                </button>
                <button
                  className="p-2 bg-gray-800 rounded-xl"
                  onClick={() => {
                    torles(item?.bejegyzesID);
                  }}
                >
                  <X size={24} weight="bold" />
                </button>
              </div>
            </>
          );
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

  const adat = await fetch("http://127.0.0.1:8080/api/bejegyzes/osszes", {
    headers: {
      cookie: ctx.req.headers?.cookie,
    },
  });

  const adatok = await adat.json();

  return {
    props: {
      felhasznalo: felhasznaloAdat,
      bejegyzesek: adatok,
    },
  };
};
