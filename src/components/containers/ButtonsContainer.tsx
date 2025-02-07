type ButtonsContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const ButtonsContainer = ({ className, children }: ButtonsContainerProps) => {
  return (
    <div className={className ? className : 'grid grid-cols-2 gap-2'}>
      {children}
    </div>
  );
};

export default ButtonsContainer;
