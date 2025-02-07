import Main from '../../components/templates/Main';
import MainTitle from '../../titles/MainTitle';
import Button from '../../components/buttons/LinkButton';

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
          link="acima-da-media-turma"
          className="col-span-2"
        />
        <Button
          text="Média da turma em cada disciplina"
          link="media-turma-disciplina"
          className="col-span-2"
        />
      </div>
    </Main>
  );
};

export default Grades;
