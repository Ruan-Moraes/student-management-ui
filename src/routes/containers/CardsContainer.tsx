type CardsContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const CardsContainer = ({ className, children }: CardsContainerProps) => {
  return (
    <div
      className={
        className
          ? className
          : 'flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-2'
      }
    >
      {children}
    </div>
  );
};

export default CardsContainer;
