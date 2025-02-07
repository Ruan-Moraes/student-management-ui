import MainTitle from '../../titles/MainTitle';
import Main from '../../components/templates/Main';
import Button from '../../components/buttons/LinkButton';

const Disciplines = () => {
  return (
    <Main>
      <MainTitle title="Gestão de disciplinas" />
      <div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            text="Cadastrar Disciplina"
            link="cadastrar"
            className="col-span-2"
          />
          <Button
            text="Gerenciar Disciplinas"
            link="gerenciar"
            className="col-span-2"
          />
        </div>
      </div>
    </Main>
  );
};

export default Disciplines;
