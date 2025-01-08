"use client";
import { style } from "@/utils/client/style";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Tooltip } from "@radix-ui/themes";
import debounce from "lodash.debounce";
import React, { useEffect } from "react";
import styles from "./AnglePicker.module.css";

export function AnglePicker(props: {
  onChange: (angle: number) => void;
  angle: number;
  size?: string;
  ticks?: number;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  function onChange(angle: number) {
    let newAngle = angle;
    if (angle < 0) {
      newAngle = angle + 360;
    }
    if (props.ticks) {
      const closest =
        Math.round(newAngle / props.ticks) * props.ticks;
      props.onChange(closest);
    }
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    const target = containerRef.current;
    if (!(target instanceof HTMLElement)) return;
    const rect = target.getBoundingClientRect();
    const x = e.pageX;
    const y = e.pageY;
    const mouse = { x, y };
    const center = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    };
    const angle = angleBetween(mouse, center);
    onChange(angle);
  }

  function onClick(e: React.MouseEvent) {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.tagName === "INPUT") return;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const mouse = { x, y };
    const center = { x: rect.width / 2, y: rect.height / 2 };
    const angle = angleBetween(mouse, center);
    onChange(angle);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const forward = ["ArrowRight", "ArrowUp"];
    const backward = ["ArrowLeft", "ArrowDown"];
    let next: number | null = null;
    const add = props.ticks ? props.ticks * 24 : 8;
    if (forward.includes(e.key)) {
      next = props.angle + add;
    }
    if (backward.includes(e.key)) {
      next = props.angle - add;
    }
    if (next === null) return;
    if (next < 0) next += 360;
    if (next >= 360) next -= 360;
    onChange(next);
  }

  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
    }
    const onMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
    };
    const moveHandler = debounce(onMouseMove, 2);
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <Tooltip content={`${Math.floor(props.angle)}°`}>
      <div
        ref={containerRef}
        className={styles.container}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        style={style({
          "--angle": props.angle + "deg",
          "--size": props.size ?? undefined,
        })}
      >
        <ArrowUpIcon />
        <input value={props.angle} tabIndex={-1} type="number" />
      </div>
    </Tooltip>
  );
}

function angleBetween(
  p1: {
    x: number;
    y: number;
  },
  p2: {
    x: number;
    y: number;
  }
) {
  return (
    (Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180) / Math.PI + 90
  );
}
