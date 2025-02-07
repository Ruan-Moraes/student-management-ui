type ButtonProps = {
  className?: string;
  handleClick: () => void;
  label: string;
};

const Button = ({ className, handleClick, label }: ButtonProps) => {
  return (
    <button
      className={`px-3 py-1 text-white rounded-sm transition text-sm cursor-pointer ${
        className || 'bg-blue-400 hover:bg-blue-500'
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
