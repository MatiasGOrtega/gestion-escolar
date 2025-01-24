"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  search: z
    .string()
    .regex(/^[a-zA-Z0-9\s]+$/, "Solo se permiten letras, números y espacios.")
    .min(2, {
      message: "Debe tener al menos 2 caracteres.",
    })
    .max(20, {
      message: "Debe tener como máximo 20 caracteres.",
    }),
});

function TableSearch() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const value = data.search.trim();
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Search..."
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Submit search"
            type="submit"
          >
            <SearchIcon
              className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
              aria-hidden={true}
            />
          </button>
        </div>
      </form>
    </Form>
  );
}

export default TableSearch;
