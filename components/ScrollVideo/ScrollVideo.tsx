"use client";
import { iOS } from "@/utils/client/platform";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const defaultOffset = 0.9;

export function ScrollVideo(props: {
  src: string;
  /** amount of pages worth of scrolling */
  duration?: number;
  children?: React.ReactNode;
  triggerRef?: React.RefObject<HTMLDivElement>;
  offset?: string;
  offsetTime?: number;
}) {
  const [vidDuration, setVideoDuration] = React.useState(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);

  const triggerRef = props.triggerRef ?? parentRef;

  useEnsureBlobbing(props.src, ref);

  useGSAP(() => {
    if (vidDuration === 0) return;
    const videoEl = ref.current;
    if (videoEl && !iOS()) {
      videoEl.addEventListener("loadeddata", () => {
        videoEl.removeAttribute("autoplay");
        videoEl.currentTime = props.offsetTime ?? defaultOffset;
        videoEl.pause();
      });
    }
    gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: triggerRef.current,
          start: `${props.offset ?? "0%"} bottom`,
          end: "bottom bottom",
          scrub: 2,
        },
      })
      .fromTo(
        ref.current,
        {
          currentTime: props.offsetTime ?? defaultOffset,
        },
        {
          currentTime: vidDuration,
        }
      );
    gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: triggerRef.current,
          start: `95% bottom`,
          end: "bottom bottom",
          scrub: 2,
        },
      })
      .to(ref.current, {
        opacity: 0,
      });
  }, [vidDuration]);

  return (
    <div
      ref={triggerRef}
      style={{
        position: "relative",
        minHeight: `calc(100vh * ${props.duration ?? 1})`,
        background: "#000",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
        }}
      >
        <video
          ref={ref}
          src={props.src}
          onLoadedMetadata={() => {
            // might seem like a hack, but it's necessary to ensure the video is loaded
            // and the duration is available before the scroll trigger is set up
            setVideoDuration(ref.current?.duration || 1);
          }}
          playsInline
          style={{
            width: "100%",
            margin: "auto",
          }}
          autoPlay
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

function useEnsureBlobbing(
  src: string,
  ref: React.RefObject<HTMLVideoElement>
) {
  return useEffect(() => {
    // Blobbing is important to ensure the browser isn't dropping previously played segments
    // https://codepen.io/shshaw/pen/vYKBPbv/9e810322d70c306de2d18237d0cb2d78
    let cancel = false;
    let timeout: ReturnType<typeof setTimeout>;
    if (!ref.current) return;
    if (window["fetch"]) {
      timeout = setTimeout(() => {
        fetch(src)
          .then((res) => res.blob())
          .then((blob) => {
            if (!ref.current || cancel) return;
            const url = URL.createObjectURL(blob);
            const currentTime = ref.current.currentTime;
            ref.current.setAttribute("src", url);
            ref.current.currentTime = currentTime + 0.01;
          });
      }, 1000);
    }
    return () => {
      cancel = true;
      clearTimeout(timeout);
    };
    // ref is not a dependency because it is a ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
}
