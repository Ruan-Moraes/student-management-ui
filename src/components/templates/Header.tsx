import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { FaBookReader } from 'react-icons/fa';
import { LuMenu } from 'react-icons/lu';

const Header = () => {
  const MenuRef = useRef<HTMLDivElement>(null);

  return (
    <header className="md:flex md:justify-between md:items-center bg-blue-400">
      <div className="flex items-center justify-between p-4 md:px-8 md:py-2 border-b md:border-b-0">
        <div>
          <Link to="/" className="text-white font-bold text-lg">
            <FaBookReader size={28} />
          </Link>
        </div>
        <div
          onClick={() => MenuRef.current?.classList.toggle('hidden')}
          className="cursor-pointer md:hidden text-white font-bold text-lg"
        >
          <LuMenu size={32} />
        </div>
      </div>
      <div ref={MenuRef} className="hidden bg-blue-400 md:block">
        <ul className="flex flex-col items-center justify-center md:flex-row md:gap-8 md:px-8 md:py-2 border-b md:border-b-0">
          <li className="py-2">
            <Link
              to="/"
              className="hover:text-blue-600 fond-bold md:text-lg text-white"
            >
              Dashboard
            </Link>
          </li>
          {/* <li className="py-2">
            <Link
              to="/login"
              className="hover:text-blue-600 fond-bold md:text-lg text-white"
            >
              Login
            </Link>
          </li> */}
          {/* <li className="py-2">
            <Link to="/services" className="hover:text-blue-600 fond-bold md:text-lg text-white">
              Sair
            </Link>
          </li> */}
        </ul>
      </div>
    </header>
  );
};

export default Header;
