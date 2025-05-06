import { useState } from "react";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";

export default function Admin({ bejegyzes, felhasznalo }) {
    if(!felhasznalo) return
  console.log(bejegyzes);
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen bg-gray-700 ">
      <title>PótVarázsló</title>
      <Navbar felhasznalo={felhasznalo} />

      <div className=" text-center my-10 text-white text-3xl font-extrabold">
        <span className="shadow-lg">Összes bejegyzések</span>
      </div>

      <div className="flex flex-col gap-10  w-full items-center">
        {/*   {bejegyzes?.map((item, index) => {
          return <Post post={item} key={index} />;
        })} */}
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

  const adat = await fetch("http://127.0.0.1:8080/api/felhasznalo");

  const adatok = await adat.json();

  return {
    props: {
      felhasznalo: felhasznaloAdat,
      bejegyzes: adatok,
    },
  };
};
