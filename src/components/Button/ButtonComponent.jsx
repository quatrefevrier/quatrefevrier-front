import "./ButtonComponent.css";

const ButtonComponent = ({ pressFct, txt }) => {
  return (
    <button className="buttonclass" onClick={pressFct}>
      {" "}
      {txt}
    </button>
  );
};

export default ButtonComponent;