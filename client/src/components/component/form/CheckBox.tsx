import { UseFormRegister } from "react-hook-form";
import { ListingPost } from "../../types/Types";

type CheckboxInputProps = {
  register: UseFormRegister<ListingPost>;
  name: keyof ListingPost;
};

export const CheckboxInput = ({
  register,
  name,
  ...props
}: CheckboxInputProps) => (
  <div className="flex gap-2">
    <input
      className="w-5"
      type="checkbox"
      {...register(name)}
      id={name}
      {...props}
    />
    <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
  </div>
);
