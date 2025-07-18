import "./style.css";

type valores = {
  id: string;
  name: string;
  label: string;
};

const InputNumber = ({ id, name, label }: valores) => {
  return (
   <div className="basic-input-div">
      <label htmlFor={id} className="basic-label">{label}</label>
      <input type="number" id={id} name={name} className="basic-input-number"/>
    </div>
  );
};

export default InputNumber;