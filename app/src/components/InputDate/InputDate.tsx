import "./style.css";

type valores = {
  id: string;
  name: string;
  label: string;
};

const InputDate = ({ id, name, label }: valores) => {
  return (
   <div className="basic-input-div">
      <label htmlFor="" className="basic-label">{label}</label>
      <input type="text" id={id} name={name} className="basic-input-date"/>
    </div>
  );
};

export default InputDate;