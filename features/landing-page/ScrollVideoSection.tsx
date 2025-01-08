"use client";
import { ScrollVideo } from "@/components/ScrollVideo/ScrollVideo";
import { clientOnly } from "@/utils/client/clientOnly";
import { style } from "@/utils/client/style";
import { useGSAP } from "@gsap/react";
import { GearIcon } from "@radix-ui/react-icons";
import { Container, Flex, Heading } from "@radix-ui/themes";
import gsap from "gsap";
import { useRef } from "react";

export const ScrollVideoSection = clientOnly(() => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pictureRef = useRef<HTMLDivElement>(null);
  const secondCardRef = useRef<HTMLDivElement>(null);
  const gearRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const headingTl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top bottom",
        end: "50% bottom",
        scrub: 2,
      },
    });
    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top bottom",
        end: "50% bottom",
        scrub: 2,
      },
    });
    const pictureSnapTl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "53% bottom",
        end: "54% bottom",
        scrub: 2,
      },
    });
    const secondCardTl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "60% bottom",
        end: "bottom bottom",
        scrub: 2,
      },
    });
    const gearTl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "60% bottom",
        end: "bottom bottom",
        scrub: 2,
      },
    });
    headingTl
      .fromTo(
        headingRef.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        {
          opacity: 1,
          duration: 2,
        }
      )
      .to(headingRef.current, {
        opacity: 0,
        translateY: 120,
        duration: 0.3,
      });
    cardTl
      .fromTo(
        cardRef.current,
        {
          translateY: 100,
          scale: 1.1,
          opacity: 0,
          duration: 0.5,
          rotate: -5,
        },
        {
          opacity: 1,
          translateY: 0,
          scale: 1,
          duration: 2,
          rotate: 1,
        }
      )
      .to(cardRef.current, {
        translateY: -100,
        opacity: 0,
        duration: 0.2,
        scale: 1.1,
        rotate: 0,
      });
    pictureSnapTl
      .to(pictureRef.current, {
        opacity: 0.7,
        duration: 0.5,
      })
      .to(pictureRef.current, {
        opacity: 0,
        duration: 0.5,
      });

    secondCardTl
      .fromTo(
        secondCardRef.current,
        {
          translateY: 100,
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
        },
        {
          opacity: 1,
          translateY: -100,
          duration: 2,
        }
      )
      .to(secondCardRef.current, {
        translateY: -200,
        opacity: 0,
        duration: 0.5,
        scale: 0.8,
        rotate: -2,
      });
    gearTl.fromTo(
      gearRef.current,
      {
        rotate: -360,
      },
      {
        rotate: 360,
      }
    );
  });
  return (
    <ScrollVideo
      triggerRef={triggerRef}
      src="/vid/fake-demo-2.mp4"
      duration={2.5}
      offset="50%"
    >
      <>
        <div
          ref={pictureRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#fff",
            opacity: 0,
          }}
        />
        <Container
          style={{
            height: "100%",
          }}
          height="100%"
          id="vss"
        >
          <Flex
            direction="column"
            gap="5"
            align="center"
            justify="center"
            height="100%"
          >
            <AboveVideoCard cardRef={cardRef} ghost>
              <Heading
                size="9"
                ref={headingRef}
                style={{
                  textAlign: "center",
                  color: "var(--light-text)",
                }}
              >
                You give us a picture
              </Heading>
            </AboveVideoCard>
            <AboveVideoCard cardRef={secondCardRef}>
              <Heading
                size="9"
                style={{
                  textAlign: "center",
                  color: "var(--light-text)",
                }}
              >
                <Flex align="center" gap="5">
                  <GearIcon
                    style={{ width: "1em", height: "1em" }}
                    ref={gearRef}
                  />
                  We generate a sun report
                </Flex>
              </Heading>
            </AboveVideoCard>
          </Flex>
        </Container>
      </>
    </ScrollVideo>
  );
});

function AboveVideoCard(props: {
  children: React.ReactNode;
  cardRef: React.RefObject<HTMLDivElement>;
  ghost?: boolean;
}) {
  return (
    <div
      style={style({
        background: props.ghost
          ? "transparent"
          : "var(--black-a12)",
        borderRadius: "var(--radius-thumb)",
        padding: "var(--space-7)",
        border: "none",
        overflow: "hidden",
      })}
      ref={props.cardRef}
    >
      {props.children}
    </div>
  );
}
