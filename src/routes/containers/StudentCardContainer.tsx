type StudentCardContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const StudentCardContainer = ({
  className,
  children,
}: StudentCardContainerProps) => {
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

export default StudentCardContainer;
