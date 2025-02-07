import Main from '../components/templates/Main';
import MainTitle from '../titles/MainTitle';
import Button from '../components/buttons/LinkButton';

const Grades = () => {
  return (
    <Main>
      <MainTitle title="Notas" />
      <div className="grid grid-cols-2 gap-2">
        <Button
          text="Notas dos alunos"
          link="gerenciar"
          className="col-span-2"
        />
        <Button
          text="Alunos acima da média da turma"
          link="notas/acima-da-media"
          className="col-span-2"
        />
        <Button
          text="Alunos acima da média da Disciplina"
          link="notas/acima-da-media-disciplina"
          className="col-span-2"
        />
      </div>
    </Main>
  );
};

export default Grades;
