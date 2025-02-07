import { Link } from 'react-router-dom';

type LinkButtonProps = {
  text: string;
  link: string;
  className?: string;
};

const LinkButton = ({ text, link, className }: LinkButtonProps) => {
  return (
    <Link
      to={link}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center ${className}`}
    >
      {text}
    </Link>
  );
};

export default LinkButton;
