import Input from "./Input";
import { forwardRef } from "react";

type LabelledInputProps = {
  label: string;
  subLabel?: string;
} & React.ComponentProps<typeof Input>;

const LabelledInput = forwardRef<HTMLInputElement, LabelledInputProps>(
  ({ label, subLabel, ...props }, ref) => (
    <div className="flex items-center gap-2">
      <Input ref={ref} {...props} />
      <label htmlFor={props.name}>
        <p>{label}</p>
        {subLabel && <span className="text-xs">{subLabel}</span>}
      </label>
    </div>
  ),
);

export default LabelledInput;
