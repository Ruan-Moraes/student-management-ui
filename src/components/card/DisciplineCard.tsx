import { StudentType } from '../../types/entities/StudentType';

import DisciplineInfo from '../informations/DisciplineInfo';
import ButtonsContainer from '../containers/ButtonsContainer';
import Button from '../../components/buttons/Button';

type DisciplineCardProps = {
  id: number;
  student: Partial<StudentType>;

  handleName: (id: number) => void;
  handleDelete: (id: number) => void;
};

const DisciplineCard = ({
  id,
  student: { name },
  handleName,
  handleDelete,
}: DisciplineCardProps) => {
  return (
    <div
      key={id}
      className="bg-blue-100 p-4 rounded-lg flex justify-between items-center"
    >
      <DisciplineInfo id={id} student={{ name }} />
      <ButtonsContainer>
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          handleClick={() => handleName(id)}
          label="Editar nome"
        />
        <Button
          className="bg-red-500 hover:bg-red-700"
          handleClick={() => handleDelete(id)}
          label="Deletar"
        />
      </ButtonsContainer>
    </div>
  );
};

export default DisciplineCard;
