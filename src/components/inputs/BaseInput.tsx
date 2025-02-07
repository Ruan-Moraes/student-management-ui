type BaseInputProps = {
  label: string;
  placeholder: string;
  type: string;
};

const BaseInput = ({ label, placeholder, type }: BaseInputProps) => {
  return (
    <div>
      <label className="flex flex-col">
        <span className="text-gray-700 font-semibold mb-1">{label}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="border border-gray-400 p-2 rounded-sm mb-2 outline-blue-400 focus:border-blue-400"
        />
      </label>
    </div>
  );
};

export default BaseInput;
