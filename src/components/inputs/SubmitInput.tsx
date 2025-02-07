type SubmitInputProps = {
  text: string;
  handleClick: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const SubmitInput = ({ text, handleClick }: SubmitInputProps) => {
  return (
    <input
      onClick={handleClick}
      type="submit"
      value={text}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center cursor-pointer"
    />
  );
};

export default SubmitInput;
