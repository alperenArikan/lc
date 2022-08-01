import React from "react";
import style from "./Button.module.scss";
const Button: React.FC<{
  className?: string;
  variant?: "contained" | "outlined";
  children?: React.ReactNode;
  fontSize?: "sx" | "sm" | "md";
  onClick?: (e: React.MouseEvent) => void;
}> = ({
  className,
  variant = "contained",
  children,
  onClick,
  fontSize = "sx",
}) => {
  return (
    <button
      onClick={onClick}
      className={[
        style.button,
        style[variant],
        className,
        style[`font-${fontSize}`],
      ].join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
