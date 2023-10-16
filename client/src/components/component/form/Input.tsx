import { forwardRef } from "react";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      defaultValue={props.defaultValue}
      className={`rounded-md border-2 border-solid p-2 ${className}`}
      {...props}
    />
  ),
);

export default Input;
