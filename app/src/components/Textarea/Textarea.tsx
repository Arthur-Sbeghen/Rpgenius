import "./style.css";

type valores = {
  id: string;
  name: string;
  label: string;
};

const Textarea = ({ id, name, label }: valores) => {
  return (
   <div className="basic-input-div">
      <label htmlFor={id} className="basic-label">{label}</label>
      <textarea id={id} name={name} className="basic-textarea"></textarea>
    </div>
  );
};

export default Textarea;
