import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { PhoneCall, SealCheck } from "@phosphor-icons/react";
const { getAvatar } = require("@/components/avatar");

export default function Felhasznalo({ felhasznalo, hiba }) {
  if (hiba !== 200)
    return (
      <div className="min-h-screen bg-gray-700 flex flex-col items-center">
        <title suppressHydrationWarning>PótVarázsló</title>
        <Navbar />

        <h1 className="text-white text-3xl mt-80 ">Hiba</h1>

        <h1 className="text-white text-3xl mt-80 ">
          {hiba == 401 && "Jelentkezz be az oldal megtekintéséhez!"}
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center ">
      <title suppressHydrationWarning>
        {"PótVarázsló / " + felhasznalo?.nev}
      </title>
      <Navbar felhasznalo={felhasznalo} />
      <div className="w-10/12 flex flex-col items-center gap-5">
        <img
          src={getAvatar(felhasznalo?.email)}
          className="w-48 h-48 rounded-full bg-gray-200 m-10 "
        ></img>

        <div className="flex items-center">
          <h1 className="mr-1 text-white font-bold text-3xl">
            {felhasznalo?.nev}
          </h1>
          {felhasznalo?.jog >= 5 && (
            <SealCheck size={25} weight="fill" className="text-blue-400" />
          )}
        </div>

        {felhasznalo?.jog == 5 && (
          <div className="flex">
            <PhoneCall size={30} weight="fill" className="text-white" />

            <h1 className="ml-2 text-white/70 text-xl">
              {felhasznalo?.telefonszam}
            </h1>
          </div>
        )}

        {felhasznalo?.jog == 5 && (
          <h1 className="text-white/70 text-xl">{felhasznalo?.email}</h1>
        )}

        {felhasznalo?.jog == 5 && (
          <div className="text-white text-3xl font-semibold ">
            Legutóbbi bejegyzéseim
          </div>
        )}

        <div className="w-full flex flex-col items-center gap-10">
          {felhasznalo?.bejegyzesek?.map((b) => {
            return <Post post={b} />;
          })}
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
      hiba: felhasznalo?.status,
    },
  };
};
