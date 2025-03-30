type StudentInfoProps = {
  id: number;
  name: string;
  frequency: number;
};

const StudentInfo = ({ id, name, frequency }: StudentInfoProps) => {
  return (
    <div className="flex flex-col gap-2 justify-between h-full">
      <div className="mt-8">
        <h2 className="text-lg text-gray-800 font-bold">{name}</h2>
        <p className="text-sm text-gray-500">Frequência: {frequency}%</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">ID: {id}</p>
      </div>
    </div>
  );
};

export default StudentInfo;
