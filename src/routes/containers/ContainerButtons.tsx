type ContainerButtonsProps = {
  className?: string;
  children: React.ReactNode;
};

const ContainerButtons = ({ className, children }: ContainerButtonsProps) => {
  return (
    <div className={className ? className : 'grid grid-cols-2 gap-2'}>
      {children}
    </div>
  );
};

export default ContainerButtons;
