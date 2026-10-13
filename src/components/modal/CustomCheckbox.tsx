import React from "react";

interface IProps {
  labelText: string;
  isChecked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomCheckbox = (props: IProps) => {
  return (
    <div>
      <label>
        {props.labelText}
        <input
          type={"checkbox"}
          checked={props.isChecked}
          onChange={props.onChange}
        />
      </label>
    </div>
  );
};

export default CustomCheckbox;
