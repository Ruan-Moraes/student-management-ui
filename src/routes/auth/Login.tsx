import { Link } from 'react-router-dom';

import BaseInput from '../../components/inputs/BaseInput';
import MainTitle from '../../titles/MainTitle';

const Login = () => {
  // Todo: Implementar o formulário de registro de usuário do lado da API

  return (
    <>
      <main className="p-4 md:container md:mx-auto">
        <div className="md:w-2/4 md:mx-auto mt-40 p-4 bg-blue-100 rounded-lg">
          <MainTitle title="Login de usuário" />
          <form className="flex flex-col gap-4">
            <BaseInput
              label="Email"
              placeholder="Digite seu email"
              type="email"
            />
            <BaseInput
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
            />
            <div>
              Não tem uma conta?{' '}
              <Link to="/register" className="text-blue-400">
                Registre-se
              </Link>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-400 font-bold text-white rounded-lg px-8 py-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
