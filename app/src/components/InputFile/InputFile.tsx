import "./style.css";

type valores = {
  id: string;
  name: string;
  label: string;
};

const InputFile = ({ id, name, label }: valores) => {
  return (
   <div className="basic-input-div">
      <label htmlFor={id} className="basic-label">{label}</label>
      <input type="file" id={id} name={id} className="basic-input-file"/>
    </div>
  );
};

export default InputFile;
