import Link from "next/link";
import DarkModeButton from "./DarkModeButton";
import HamburgerMenu from "./HamburgerMenu";
import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-100/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-3 px-6 py-5 items-center">
        <HamburgerMenu />

        <Link href="/">
          <h1 className="font-serif text-3xl lg:text-4xl text-center tracking-tight">
            The{" "}
            <span className="underline decoration-4 decoration-orange-400 underline-offset-4">
              Live
            </span>{" "}
            News
          </h1>
        </Link>

        <div className="flex items-center justify-end space-x-3">
          <DarkModeButton />
          <button className="hidden md:inline bg-slate-900 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>

      <NavLinks />
      <SearchBox />
    </header>
  );
}

export default Header;
