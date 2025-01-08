import { redirect } from "next/navigation";
import { z } from "zod";

export const createServerAction = <
  TReturn extends unknown,
  TSchema extends z.ZodType<any, any>
>(args: {
  resolver: TSchema extends never
    ? (arg: null) => Promise<TReturn>
    : (arg: z.infer<TSchema>) => Promise<TReturn>;
  schema?: TSchema;
}) => {
  return async (formData: FormData) => {
    try {
      if (!args.schema) return await args.resolver(null);
      const data = args.schema.parse(
        Object.fromEntries(formData.entries())
      );
      const res = await args.resolver(data);
      return res;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const { fieldErrors, formErrors } = err.flatten();
        const singleError = [
          ...Object.values(fieldErrors),
          ...formErrors,
        ].join(", ");
        if (singleError) {
          return { error: singleError };
        }
        return {
          error: "Invalid form data",
        };
      }
      if (err instanceof Error) {
        return { error: err.message };
      }
      return { error: "Unknown error" };
    }
  };
};

export function handleActionResponseServer(
  response: unknown,
  redirectOnSuccess = true
) {
  if (response && typeof response === "object") {
    if (
      "error" in response &&
      typeof response.error === "string"
    ) {
      redirect("?error=" + response.error);
    } else if (
      redirectOnSuccess &&
      "successMsg" in response &&
      typeof response.successMsg === "string"
    ) {
      redirect("?successMsg=" + response.successMsg);
    }
  }
}
