import "./style.css";

type valores = {
  id: string;
  name: string;
  label: string;
};

const InputCheckbox = ({ id, name, label }: valores) => {
  return (
   <div className="row-input-div">
      <input type="checkbox" id={id} name={name} className="basic-checkbox"/>
      <label htmlFor={id} className="basic-label">{label}</label>
    </div>
  );
};

export default InputCheckbox;