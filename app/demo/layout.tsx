import { SunviFormProvider } from "@/features/sunvi/context";
import { Flex } from "@radix-ui/themes";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" gap="7" p="5">
      <SunviFormProvider>{children}</SunviFormProvider>
    </Flex>
  );
}
