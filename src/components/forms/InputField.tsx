import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type InputFieldProps = {
  form: any;
  label: string;
  type?: string;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

function InputField({
  form,
  label,
  type = "text",
  name,
  defaultValue,
  inputProps,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-gray-500">{label}</FormLabel>
            <FormControl>
              <Input
                type={type}
                {...field}
                {...inputProps}
                defaultValue={defaultValue}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-400" />
          </FormItem>
        )}
      />
    </div>
  );
}

export default InputField;
