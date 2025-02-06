type BaseInputProps = {
  label: string;
  placeholder: string;
  type: string;
};

const BaseInput = ({ label, placeholder, type }: BaseInputProps) => {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-1 text-sm font-medium text-black"
      >
        {label}
      </label>
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default BaseInput;
