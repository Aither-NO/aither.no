import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

type Args = Parameters<typeof useForm>[0];

export const useAppForm = <T extends ZodType<any, any>>(
  args: {
    schema: T;
  } & Args
) => {
  return useForm<z.infer<T>>({
    resolver: zodResolver(args.schema),
  });
};
