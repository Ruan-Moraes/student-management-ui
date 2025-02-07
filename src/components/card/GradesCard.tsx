import GradesInfo from '../informations/GradesInfo';
import ButtonsContainer from '../containers/ButtonsContainer';
import Button from '../buttons/Button';

type GradesCardProps = {
  id: number;
  nome: string;
  percentualFrequencia: number;

  handleGrades: (id: number, nome: string) => void;
  handleGradeAverage: (id: number, nome: string) => void;
};

const GradesCard = ({
  id,
  nome,
  percentualFrequencia,
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
        nome={nome}
        percentualFrequencia={percentualFrequencia}
      />
      <ButtonsContainer className="flex flex-col gap-2">
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          handleClick={() => handleGrades(id, nome)}
          label="Editar Notas"
        />
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          handleClick={() => handleGradeAverage(id, nome)}
          label="Média Geral"
        />
      </ButtonsContainer>
    </div>
  );
};

export default GradesCard;
