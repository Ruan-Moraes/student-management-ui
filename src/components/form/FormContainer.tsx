type FormContainerProps = {
  children: React.ReactNode;
};

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <form className="flex-col flex"> {children} </form>
    </div>
  );
};

export default FormContainer;
