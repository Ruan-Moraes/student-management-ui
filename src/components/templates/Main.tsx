type MainProps = {
  children: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  return (
    <main className="container px-4 py-4 flex flex-col gap-2">{children}</main>
  );
};

export default Main;
