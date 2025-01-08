"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { style } from "@/utils/client/style";
import { Card, Flex, Tooltip } from "@radix-ui/themes";
import styles from "./PartnersCard.module.css";

export function PartnersCard() {
  const isSmall = useMediaQuery("(max-width: 900px)");
  return (
    <Card
      style={style({
        "--card-background-color": "#fff",
      })}
      mt="7"
    >
      <Flex
        direction={"row"}
        gap="9"
        align="center"
        justify="center"
        p="7"
        wrap="wrap"
      >
        <PartnerImgLink
          href="https://agderxr.no/"
          alt="Agder XR"
          src="https://cdn.sanity.io/images/2vqjviqb/content/89aaad7df9560b48e063bc7cc2038e64a3b818cb-600x130.png?w=300"
        />
        <PartnerImgLink
          href="https://www.lindesnes.kommune.no"
          alt="Lindesnes Kommune"
          src="https://cdn.sanity.io/images/2vqjviqb/content/990f16a54c63777d807b341bd94eaf5b4e24b437-3426x1910.jpg?w=300"
        />
        <PartnerImgLink
          href="https://innoventussor.no"
          alt="Innoventus Sør"
          src="https://cdn.sanity.io/images/2vqjviqb/content/0b2ebaa3858eae6c924390b827641e5179962600-478x156.png?w=300"
        />
        <PartnerImgLink
          href="https://www.forskningsradet.no/"
          alt="Forskningsrådet"
          src="https://cdn.sanity.io/images/2vqjviqb/content/d73885d8a695f901497e0937b39dde0c4f923241-422x83.png?w=300"
        />
        <PartnerImgLink
          href="https://www.norceresearch.no"
          alt="Norce Research"
          src="https://cdn.sanity.io/images/2vqjviqb/content/edfe001e7e4999489064e7194ece14e66c19b43c-911x265.jpg?w=300"
        />
      </Flex>
    </Card>
  );
}

function PartnerImgLink(props: {
  alt: string;
  src: string;
  href: string;
}) {
  return (
    <Tooltip content={props.alt} sideOffset={16}>
      <a href={props.href} className={styles.partner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={props.alt} src={props.src} />
      </a>
    </Tooltip>
  );
}
