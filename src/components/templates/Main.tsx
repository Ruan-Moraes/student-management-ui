type MainProps = {
  children: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  return (
    <main className="max-w-[800px] px-4 py-4 flex flex-col gap-2 mx-auto md:mt-40">
      {children}
    </main>
  );
};

export default Main;
