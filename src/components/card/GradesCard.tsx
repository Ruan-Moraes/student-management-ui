import { StudentType } from '../../types/entities/StudentType';

import GradesInfo from '../informations/GradesInfo';
import ButtonsContainer from '../containers/ButtonsContainer';
import Button from '../buttons/Button';

type GradesCardProps = {
  id: number;
  student: Partial<StudentType>;

  handleGrades: (id: number, name: string) => void;
  handleGradeAverage: (id: number, name: string) => void;
};

const GradesCard = ({
  id,
  student: { name, frequency },
  handleGrades,
  handleGradeAverage,
}: GradesCardProps) => {
  return (
    <div
      key={id}
      className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg border border-gray-200"
    >
      <GradesInfo
        id={id}
        student={{
          name,
          frequency,
        }}
      />
      <ButtonsContainer className="flex flex-col gap-2">
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          handleClick={() => handleGrades(id, name!)}
          label="Editar Notas"
        />
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          handleClick={() => handleGradeAverage(id, name!)}
          label="Média Geral"
        />
      </ButtonsContainer>
    </div>
  );
};

export default GradesCard;
