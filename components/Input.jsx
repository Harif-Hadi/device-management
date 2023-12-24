import classes from "./Input.module.css";

const Input = ({ htmlFor, title, inputType, inputRef, value, onChange }) => {
  return (
    <div className={classes.control}>
      <label htmlFor={htmlFor}>{title}</label>
      <input
        type={inputType}
        id={htmlFor}
        ref={inputRef}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
