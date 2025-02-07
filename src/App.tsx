import { useRoutes } from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import Disciplines from './routes/base/Disciplines';
import Students from './routes/base/Students';
import Grades from './routes/base/Grades';
import Header from './components/templates/Header';
import ManageStudents from './routes/Managers/ManageStudents';
import RegisterStudents from './routes/Registers/RegisterStudents';
import RegisterDiscipline from './routes/Registers/RegisterDiscipline';
import ManageDiscipline from './routes/Managers/ManageDiscipline';
import Frequency from './routes/base/Frequency';
import ManageGrades from './routes/Managers/ManageGrades';
import AboveAverage from './routes/others/AboveAverage';
import AvarageDiscipline from './routes/others/AvarageDiscipline';

const App = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/alunos',
      element: <Students />,
    },
    {
      path: '/alunos/cadastrar',
      element: <RegisterStudents />,
    },
    {
      path: '/alunos/gerenciar',
      element: <ManageStudents />,
    },
    {
      path: '/disciplinas',
      element: <Disciplines />,
    },
    {
      path: '/disciplinas/cadastrar',
      element: <RegisterDiscipline />,
    },
    {
      path: '/disciplinas/gerenciar',
      element: <ManageDiscipline />,
    },
    {
      path: '/notas',
      element: <Grades />,
    },
    {
      path: '/notas/gerenciar',
      element: <ManageGrades />,
    },
    {
      path: '/notas/acima-da-media-turma',
      element: <AboveAverage />,
    },
    {
      path: '/notas/media-turma-disciplina',
      element: <AvarageDiscipline />,
    },
    {
      path: '/frequencias',
      element: <Frequency />,
    },
  ]);

  return (
    <>
      <Header />
      {routes}
    </>
  );
};

export default App;
