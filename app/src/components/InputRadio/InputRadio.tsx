import "./style.css";

type valores = {
  id: string;
  name: string;
  label: string;
};

const InputRadio = ({ id, name, label }: valores) => {
  return (
   <div className="basic-input-div">
      <input type="radio" id={id} name={name} className="basic-input-radio"/>
      <label htmlFor={id} className="basic-label">{label}</label>
    </div>
  );
};

export default InputRadio;