"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../forms/InputField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

function StudentForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) {
  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        id="form-student"
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-semibold">Create a new teacher</h1>
        <span className="text-xs text-gray-400 font-medium">
          Authentication Information
        </span>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            form={form}
            label="Username"
            name="username"
            defaultValue={data?.username}
          />
          <InputField
            form={form}
            label="Email"
            name="email"
            defaultValue={data?.email}
          />
          <InputField
            form={form}
            label="Password"
            name="password"
            type="password"
            defaultValue={data?.password}
          />
        </div>
        <span className="text-xs text-gray-400 font-medium">
          Personal Information
        </span>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            form={form}
            label="First Name"
            name="firstName"
            defaultValue={data?.firstName}
          />
          <InputField
            form={form}
            label="Last Name"
            name="lastName"
            defaultValue={data?.lastName}
          />
          <InputField
            form={form}
            label="Phone"
            name="phone"
            defaultValue={data?.phone}
          />
          <InputField
            form={form}
            label="Address"
            name="address"
            defaultValue={data?.address}
          />
          <InputField
            form={form}
            label="Blood Type"
            name="bloodType"
            defaultValue={data?.bloodType}
          />
          <InputField
            form={form}
            label="Birthday"
            name="birthday"
            defaultValue={data?.birthday}
            type="date"
          />
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-500">Sex</FormLabel>
                  <Select defaultValue={field.value} {...field}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your sex" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <InputField
            form={form}
            label="Image"
            name="img"
            type="file"
            defaultValue={data?.img}
          />
        </div>
        <Button
          form="form-student"
          type="submit"
          className="bg-blue-400 text-white p-2 rounded-md"
        >
          {type === "create" ? "Create" : "Update"}
        </Button>
      </form>
    </Form>
  );
}

export default StudentForm;
