import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import DarkModeButton from "./DarkModeButton";
import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";

function Header() {
  return (
    <header>
      <div className="grid grid-cols-3 p-10 items-center">
        <Bars3Icon className="h-8 w-8 cursor-pointer" href="/" />
        <Link href="/" prefetch={false}>
          {/* text-[min(24vw,40px)] */}
          <h1 className="font-serif text-4xl text-center">
            The{" "}
            <span className="underline decoration-6 decoration-orange-400">
              Live
            </span>{" "}
            News
          </h1>
          {/* <p className="font-serif text-xsl text-center">
						Brought to you by: FDrive
					</p> */}
        </Link>
        <div className="flex items-center justify-end space-x-2">
          <DarkModeButton />

          <button className="hidden md:inline bg-slate-900 text-white px-4 lg:px-8 py-2 lg:py-3 rounded-full dark:bg-slate-800">
            Subscribe
          </button>
        </div>
      </div>

      {/* NavLinks */}
      <NavLinks />

      {/* SearchBox */}
      <SearchBox />
    </header>
  );
}

export default Header;
