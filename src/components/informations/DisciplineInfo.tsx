import { StudentType } from '../../types/entities/StudentType';

type DisciplineInfoProps = {
  id: number;
  student: Partial<StudentType>;
};

const DisciplineInfo = ({ id, student: { name } }: DisciplineInfoProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-bold">{name}</h2>
      <p className="text-xs text-gray-500">ID: {id}</p>
    </div>
  );
};

export default DisciplineInfo;
