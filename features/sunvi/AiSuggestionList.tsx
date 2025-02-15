import {
  CalloutList,
  SuggestionType,
} from "@/components/CalloutList/CalloutList";

const mockData: Array<{
  type: SuggestionType;
  text: string;
}> = [
  {
    type: "info",
    text: "11:27 soltimer i gjennomsnitt pr dag",
  },
  {
    type: "info",
    text: "Tidligste soloppgang: 05:17",
  },
  {
    type: "info",
    text: "Seneste solnedgang: 22:20",
  },
  {
    type: "info",
    text: "Terrenget blokkerer 00:27 timer kveldssol i snitt pr dag",
  },
  {
    type: "info",
    text: "67 % skydekke gjennom året",
  },
  {
    type: "savings",
    text: "Potensielt 6900 kwh pr år med solcellepanel",
  },
];

export function AiSuggestionList() {
  return <CalloutList data={mockData} animate />;
}
