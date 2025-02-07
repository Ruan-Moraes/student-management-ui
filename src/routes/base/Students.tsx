import MainTitle from '../../titles/MainTitle';
import Main from '../../components/templates/Main';
import LinkButton from '../../components/buttons/LinkButton';

const Students = () => {
  return (
    <Main>
      <MainTitle title="Alunos" />
      <div>
        <div className="grid grid-cols-2 gap-2">
          <LinkButton
            text="Cadastrar Aluno"
            link="cadastrar"
            className="col-span-2"
          />
          <LinkButton
            text="Gerenciar Alunos"
            link="gerenciar/"
            className="col-span-2"
          />
        </div>
      </div>
    </Main>
  );
};

export default Students;
