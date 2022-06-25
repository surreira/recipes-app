import ChevronRight from "@/components/icons/chevron-right";
import SearchIcon from "@/components/icons/search";
import Link from "next/link";

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps): JSX.Element {
  return (
    <header className="flex items-center justify-between w-full h-16 mt-7">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Link href="/">
          <a>
            <h1 className="flex items-center text-2xl font-black sm:items-start sm:text-4xl text-slate-800">
              Receitas{" "}
              <span className="inline-block px-2 py-px ml-1 text-xl font-black leading-none text-green-400 rounded-lg sm:text-3xl bg-slate-800">
                TM
              </span>
            </h1>
          </a>
        </Link>

        {title && (
          <div className="flex items-center space-x-2 text-slate-800">
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            <p className="leading-none text-md sm:text-xl text-slate-600">
              {title}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 text-slate-800">
        <SearchIcon className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>
    </header>
  );
}
