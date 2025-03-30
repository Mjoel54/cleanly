import { Link } from "react-router-dom";

export interface AuthenticationFooterProps {
  linkPath: string;
  linkText: string;
  paragraphText: string;
}

export default function AuthenticationFooter({
  linkPath,
  linkText,
  paragraphText,
}: AuthenticationFooterProps) {
  return (
    <footer>
      <p className="mt-10 text-center text-sm/6 text-gray-500">
        {paragraphText}
        <Link
          to={linkPath}
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          {linkText}
        </Link>
      </p>
    </footer>
  );
}
