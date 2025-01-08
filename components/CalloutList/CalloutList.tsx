import { style } from "@/utils/client/style";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Callout, Flex, IconProps } from "@radix-ui/themes";
import cn from "classnames";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import styles from "./CalloutList.module.css";

type SuggestionType = "info" | "warning";
type CalloutColor = Parameters<typeof Callout.Root>[0]["color"];

export function CalloutList(props: {
  data: Array<{
    type: SuggestionType;
    text: React.ReactNode;
    id?: string;
  }>;
  animate?: boolean;
}) {
  return (
    <Flex
      direction="column"
      gap="3"
      className={cn({
        [styles.animate]: props.animate,
      })}
    >
      {props.data.map((suggestion, index) => {
        const Icon = typeToIcon[suggestion.type];
        return (
          <Callout.Root
            key={
              suggestion.id ??
              (typeof suggestion.text === "string"
                ? suggestion.text
                : index)
            }
            color={typeToColor[suggestion.type]}
            style={style({
              "--i": index,
            })}
          >
            <Callout.Icon>
              <Icon />
            </Callout.Icon>
            <Callout.Text>{suggestion.text}</Callout.Text>
          </Callout.Root>
        );
      })}
    </Flex>
  );
}

const typeToIcon: Record<
  SuggestionType,
  ForwardRefExoticComponent<
    IconProps & RefAttributes<SVGSVGElement>
  >
> = {
  info: InfoCircledIcon,
  warning: ExclamationTriangleIcon,
};

const typeToColor: Record<SuggestionType, CalloutColor> = {
  info: "sky",
  warning: "amber",
};
