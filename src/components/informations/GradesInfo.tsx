import { StudentType } from '../../types/entities/StudentType';

type GradesInfoProps = {
  id: number;
  student: Partial<StudentType>;
};

const GradesInfo = ({ id, student: { name, frequency } }: GradesInfoProps) => {
  return (
    <div className="flex flex-col gap-2 justify-between h-full">
      <div className="mt-8">
        <p className="text-lg text-gray-800 font-bold">{name}</p>
        <p className="text-sm text-gray-500">Frequência: {frequency}%</p>
      </div>
      <p className="text-xs text-gray-500 mt-4">ID: {id}</p>
    </div>
  );
};

export default GradesInfo;
