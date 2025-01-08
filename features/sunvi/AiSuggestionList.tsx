import { CalloutList } from "@/components/CalloutList/CalloutList";

type SuggestionType = "info" | "warning";

const mockData: Array<{
  type: SuggestionType;
  text: string;
}> = [
  {
    type: "info",
    text: "Great summer house location.",
  },
  {
    type: "info",
    text: "Garden plants that require full sun will thrive.",
  },
  {
    type: "warning",
    text: "Plant trees that provide shade to reduce sun exposure.",
  },
];

export function AiSuggestionList() {
  return <CalloutList data={mockData} animate />;
}
