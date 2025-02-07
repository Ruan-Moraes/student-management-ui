import Main from '../components/templates/Main';

import MainTitle from '../components/titles/MainTitle';
import ContainerButtons from './containers/ContainerButtons';
import Button from '../components/buttons/LinkButton';

const Home = () => {
  return (
    <>
      <Main>
        <MainTitle title="Bem-vindo ao sistema de gestão de alunos" />
        <ContainerButtons>
          <Button text="Alunos" link="alunos" />
          <Button text="Disciplinas" link="disciplinas" />
          <Button text="Notas" link="notas" />
          <Button text="Frequências" link="frequencias" />
        </ContainerButtons>
      </Main>
    </>
  );
};

export default Home;
