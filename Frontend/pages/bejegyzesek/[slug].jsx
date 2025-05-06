import Navbar from "@/components/Navbar";
import Link from "next/link";
import Markdown from "react-markdown";

export default function Bejegyzes({ bejegyzes, felhasznalo }) {
  if (!bejegyzes?.cim) {
    return (
      <div className="min-h-screen bg-gray-700 flex flex-col items-center justify-center">
        <h1 className="text-white font-bold text-4xl">
          Bejegyzés nem található!
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center">
      <title suppressHydrationWarning>{bejegyzes?.cim}</title>
      <Navbar />
      <div className="w-10/12">
        <h1 className="text-3xl text-white font-bold mt-10 ">
          {bejegyzes?.cim}
        </h1>

        <h1 className="text-2xl px-4 py-2 bg-slate-800 mb-5 mt-5 text-white rounded-lg w-fit text-white font-bold  ">
          {bejegyzes?.autoTipus}
        </h1>

        <Link
          className="font-mono hover:bg-slate-800 transition pl-2 pr-2 py-2 rounded-lg  text-white/90 text-2xl"
          href={"/felhasznalok/" + bejegyzes?.felhasznalo?.felhasznaloID}
        >
          @{bejegyzes?.felhasznalo?.nev}
        </Link>

        <div className=" mt-2 w-fit flex flex-col gap-10">
          {bejegyzes?.linkek?.map((l, i) => {
            const test =
              /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gim;

            return (
              <>
                <a
                  target="_blank"
                  className="text-blue-400 w-fit font-bold underline"
                  href={l}
                  key={i}
                >
                  {l}
                </a>
                {test?.test(l) && (
                  <iframe
                    width="560"
                    height="315"
                    src={
                      "https://www.youtube.com/embed/" +
                      l?.match(
                        /(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/)([^\s&\?\/\#]+)/
                      )[1]
                    }
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                )}
              </>
            );
          })}
        </div>

        <article class=" w-screen mb-10 mt-5 max-w-full prose prose-invert s">
          <Markdown>{bejegyzes?.tartalom}</Markdown>
        </article>

        <p className="mb-5 text-white/50">
          {new Date(bejegyzes?.datum)?.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch(
    "http://127.0.0.1:8080/api/bejegyzes/slug/" + ctx?.params?.slug
  );

  const data = await res.json();

  return {
    props: {
      bejegyzes: data,
    },
  };
};
