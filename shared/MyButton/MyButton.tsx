import { forwardRef } from "react";
import style from "./MyButton.module.css";
import IMyButtonProps from "./MyButton.props";
import classNames from "classnames";

const MyButton = forwardRef<HTMLButtonElement, IMyButtonProps>(
  function MyButton({ text, view, className, ...props }, ref) {
    return (
      <button
        className={classNames(style.button, className, {
          [style.primary]: view === "primary",
          [style.secondary]: view === "secondary",
        })}
        ref={ref}
        {...props}
      >
        {text}
      </button>
    );
  }
);

export default MyButton;
