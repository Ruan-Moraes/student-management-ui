import { useRoutes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';

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
  ]);

  return routes;
};

export default App;
