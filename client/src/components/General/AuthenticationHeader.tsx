import { Link } from "react-router-dom";
import lumiIndigo from "../../images/lumi-indigo-600.svg";

export interface AuthenticationHeaderProps {
  title: string;
}

export default function AuthenticationHeader({
  title,
}: AuthenticationHeaderProps) {
  return (
    <header className="sm:mx-auto sm:w-full sm:max-w-md">
      <Link to="/">
        <img alt="Lumi" src={lumiIndigo} className="mx-auto h-24 w-auto" />
      </Link>
      <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        {title}
      </h2>
    </header>
  );
}
