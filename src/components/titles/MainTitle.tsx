import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

type MainTitleProps = {
  title: string;
};

const MainTitle = ({ title }: MainTitleProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="text-blue-500 mb-1 cursor-pointer"
        onClick={handleGoBack}
      >
        <IoMdArrowRoundBack size={24} />
      </button>
      <h1 className="text-xl font-bold md:mb-2">{title}</h1>
    </div>
  );
};

export default MainTitle;
