import { Plus } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
const { getAvatar } = require("@/components/avatar");

function Navbar({ felhasznalo }) {
  const router = useRouter();

  const Logout = () => {
    fetch(`http://127.0.0.1:8080/api/auth/logout`, {
      method: "POST",
      redirect: "follow",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      switch (res.status) {
        case 200:
          router.replace(router.asPath, undefined, {
            scroll: false,
          });
          toast.success("Sikeres kijelentkezés!");
          break;

        default:
          toast.error("Hiba!");
          break;
      }
    });
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center shadow-md w-full ">
      <Link href="/" className="text-xl font-bold">
        PótVarázsló
      </Link>
      <div className="space-x-4 flex items-center">
        {felhasznalo?.jog >= 5 && (
          <Link href="/bejegyzesek/uj">
            <Plus size={32} weight="bold" className="text-white" />
          </Link>
        )}
        {felhasznalo?.nev ? (
          <Link href="/NavFunk/fiok" className="hover:text-gray-300">
            <img
              src={getAvatar(felhasznalo?.email)}
              className="w-8 h-8 rounded-full bg-gray-200 "
            ></img>
          </Link>
        ) : (
          <Link href="/NavFunk/bejelentkezes" className="hover:text-gray-300 ">
            Bejelentkezés
          </Link>
        )}{" "}
        {felhasznalo?.jog >= 10 && <Link href="/admin">Admin</Link>}
        <Link href="/NavFunk/kapcsolat" className="hover:text-gray-300">
          Kapcsolat
        </Link>
        {felhasznalo?.nev && (
          <button onClick={Logout} className="hover:text-gray-300">
            Kijelentkezés
          </button>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
