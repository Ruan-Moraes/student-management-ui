import { useRoutes } from 'react-router-dom';

import Home from './routes/Home';
// import Login from './routes/auth/Login';
// import Register from './routes/auth/Register';
import Disciplines from './routes/base/Disciplines';
import Students from './routes/base/Students';
import Grades from './routes/base/Grades';
import ManageStudents from './routes/managers/ManageStudents';
import RegisterStudents from './routes/registers/RegisterStudents';
import RegisterDisciplines from './routes/registers/RegisterDisciplines';
import ManageDisciplines from './routes/managers/ManageDisciplines';
import Frequency from './routes/base/Frequency';
import ManageGrades from './routes/managers/ManageGrades';
import AboveAverageStudents from './routes/others/AboveAverageStudents';
import AvarageDisciplines from './routes/others/AvarageDiscipline';

const Routes = () => {
  const routes = [
    { path: '/', element: <Home /> },
    // { path: '/login', element: <Login /> },
    // { path: '/register', element: <Register /> },
    { path: '/alunos', element: <Students /> },
    { path: '/alunos/cadastrar', element: <RegisterStudents /> },
    { path: '/alunos/gerenciar', element: <ManageStudents /> },
    { path: '/disciplinas', element: <Disciplines /> },
    { path: '/disciplinas/cadastrar', element: <RegisterDisciplines /> },
    { path: '/disciplinas/gerenciar', element: <ManageDisciplines /> },
    { path: '/notas', element: <Grades /> },
    { path: '/notas/gerenciar', element: <ManageGrades /> },
    { path: '/notas/acima-da-media-turma', element: <AboveAverageStudents /> },
    { path: '/notas/media-turma-disciplina', element: <AvarageDisciplines /> },
    { path: '/frequencias', element: <Frequency /> },
  ];
  const routing = useRoutes(routes);

  return <>{routing}</>;
};

export default Routes;
