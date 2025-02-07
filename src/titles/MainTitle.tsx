type MainTitleProps = {
  title: string;
};

const MainTitle = ({ title }: MainTitleProps) => {
  return (
    <div>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
};

export default MainTitle;
