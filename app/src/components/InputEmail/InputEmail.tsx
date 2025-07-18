import "./style.css";

type valores = {
  id: string;
  name: string;
  label: string;
};

const InputEmail = ({ id, name, label }: valores) => {
  return (
   <div className="basic-input-div">
      <label htmlFor={id} className="basic-label">{label}</label>
      <input type="text" id={id} name={name} className="basic-input-email"/>
    </div>
  );
};

export default InputEmail;
