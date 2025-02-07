import Button from '../components/buttons/LinkButton';
import MainTitle from './../titles/MainTitle';
import Main from '../components/templates/Main';

const Home = () => {
  return (
    <>
      <Main>
        <MainTitle title="Bem-vindo ao sistema de gestão de alunos" />
        <div className="grid grid-cols-2 gap-2">
          <Button text="Alunos" link="alunos" />
          <Button text="Disciplinas" link="disciplinas" />
          <Button text="Notas" link="notas" />
          <Button text="Frequências" link="frequencias" />
        </div>
      </Main>
    </>
  );
};

export default Home;
