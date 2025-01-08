"use client";

import { useMount } from "@/hooks/useMount";
import { useAppForm } from "@/services/client/form";
import { FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";

export const schema = z.object({
  file: z.string(),
  location: z
    .object({
      lat: z.number(),
      lon: z.number(),
    })
    .nullable(),
  angle: z.number(),
  month: z.string(),
  time: z.number(),
});

export type Schema = z.infer<typeof schema>;

export const RESET_CAMERA_POSITION = [59.468784, 6.311468] as [
  number,
  number
];

export enum Pane {
  Upload,
  Processing,
  Result,
}

export const useSunVisForm = (
  ...args: Parameters<typeof useFormContext<Schema>>
) => useFormContext<z.infer<typeof schema>>(...args);

export function SunviFormProvider(props: {
  children: React.ReactNode;
}) {
  const form = useAppForm({
    schema,
  });

  useMount(() => {
    form.reset({
      file: "",
      location: null,
      angle: 0,
      month: "june",
      time: 6,
    });
  });
  return <FormProvider {...form}>{props.children}</FormProvider>;
}
