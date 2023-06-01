import { ReactNode, useRef } from "react";

interface TooltipProps {
  children: ReactNode;
  strTooltip?: string;
}

export function Tooltip({ children, strTooltip }: TooltipProps) {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + "px";
      }}
      className="group relative inline-block"
    >
      {children}
      {strTooltip ? (
        <span
          ref={tooltipRef}
          className="invisible absolute top-full whitespace-nowrap text-sm font-semibold text-zinc-400 opacity-0 transition group-hover:visible group-hover:opacity-100"
        >
          {strTooltip}
        </span>
      ) : null}
    </div>
  );
}
