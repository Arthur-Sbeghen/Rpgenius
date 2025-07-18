import "./style.css";

type valores = {
  id: string;
  name: string;
  label: string;
};

const InputPassword = ({ id, name, label }: valores) => {
  return (
   <div className="basic-input-div">
      <label htmlFor={id} className="basic-label">{label}</label>
      <input type="password" id={id} name={name} className="basic-input-password"/>
    </div>
  );
};

export default InputPassword;