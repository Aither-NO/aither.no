import { SunviReport } from "@/features/sunvi/SunviReport";

export default function SunviItemPage(props: {
  params: {
    id: string;
  };
}) {
  return <SunviReport id="Demo" />;
}
