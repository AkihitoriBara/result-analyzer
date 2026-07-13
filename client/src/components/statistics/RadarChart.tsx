"use client";

import { useState } from "react";
import { SubjectStats } from "@/services/dashboard.service";

type RadarChartProps = {
  subjects: SubjectStats[];
  selectedSubject?: string | null;
  onSelectSubject?: (code: string) => void;
  compact?: boolean;
  interactive?: boolean;
};

export default function RadarChart({
  subjects,
  selectedSubject = null,
  onSelectSubject,
  compact = false,
  interactive = true,
}: RadarChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (subjects.length === 0) return null;

  // Chart configuration
  const width = 500;
  const height = 500;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 190; // Max radius for 100 marks (increased from 170)

  const totalPoints = subjects.length;

  // Compute angles for each subject, offset by -pi/2 so first subject is vertical
  const getCoordinates = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / totalPoints - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // Concentric levels (marks levels)
  const levels = [20, 40, 60, 80, 100];

  // Data points coordinates
  const dataPoints = subjects.map((sub, idx) =>
    getCoordinates(idx, sub.averageTotal)
  );
  const polygonPointsStr = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className={`relative w-full ${compact ? "max-w-[240px]" : "max-w-[480px]"}`}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
        >
          {/* Grids / Concentric Polygons */}
          {levels.map((level) => {
            const levelPoints = subjects.map((_, idx) =>
              getCoordinates(idx, level)
            );
            const levelPointsStr = levelPoints
              .map((p) => `${p.x},${p.y}`)
              .join(" ");

            return (
              <polygon
                key={level}
                points={levelPointsStr}
                fill="none"
                stroke="currentColor"
                className="text-border/30 transition-all duration-300"
                strokeWidth={0.75}
                strokeDasharray={level === 100 ? "0" : "4,4"}
              />
            );
          })}

          {/* Grid circles text indicators (e.g. 40, 80, 100 marks) */}
          {levels.map((level) => {
            const coords = getCoordinates(0, level);
            return (
              <text
                key={`grid-text-${level}`}
                x={coords.x + 8}
                y={coords.y + 4}
                className="text-[10px] fill-muted-foreground/60 font-semibold"
              >
                {level}
              </text>
            );
          })}

          {/* Spokes / Axis lines */}
          {subjects.map((sub, idx) => {
            const outerCoords = getCoordinates(idx, 100);
            const labelCoords = getCoordinates(idx, 114); // Offset text outwards (114% of radius)

            // Determine text anchor alignment based on quadrant position
            let textAnchor: "start" | "end" | "middle" = "middle";
            const angle = (idx * 2 * Math.PI) / totalPoints - Math.PI / 2;
            const cos = Math.cos(angle);
            if (cos > 0.1) textAnchor = "start";
            else if (cos < -0.1) textAnchor = "end";

            const isSelected = selectedSubject === sub.subjectCode;
            const isHovered = interactive && hoveredIdx === idx;

            return (
              <g key={sub.subjectCode}>
                {/* Spoke line */}
                <line
                  x1={cx}
                  y1={cy}
                  x2={outerCoords.x}
                  y2={outerCoords.y}
                  stroke="currentColor"
                  className={`text-border/30 transition-all duration-300 ${
                    interactive && hoveredIdx !== null && !isHovered ? "opacity-25" : "opacity-100"
                  }`}
                  strokeWidth={1}
                />

                {/* Subject label text */}
                <text
                  x={labelCoords.x}
                  y={labelCoords.y + 3}
                  textAnchor={textAnchor}
                  onClick={interactive && onSelectSubject ? () => onSelectSubject(sub.subjectCode) : undefined}
                  onMouseEnter={interactive ? () => setHoveredIdx(idx) : undefined}
                  onMouseLeave={interactive ? () => setHoveredIdx(null) : undefined}
                  className={`
                    text-xs font-semibold transition-all duration-300
                    ${
                      isSelected
                        ? "fill-cyan-400 font-bold"
                        : isHovered
                          ? "fill-foreground font-bold scale-105"
                          : interactive && hoveredIdx !== null
                            ? "fill-muted-foreground/25"
                            : "fill-muted-foreground hover:fill-foreground"
                    }
                    ${interactive ? "cursor-pointer" : "cursor-default"}
                  `}
                >
                  {sub.subjectCode}
                </text>
              </g>
            );
          })}

          {/* Fill Area representing performance data */}
          <polygon
            points={polygonPointsStr}
            fill="rgba(6, 182, 212, 0.12)"
            stroke="rgb(6, 182, 212)"
            strokeWidth={2}
            className={`transition-all duration-300 ${
              interactive && hoveredIdx !== null ? "fill-[rgba(6,182,212,0.18)]" : ""
            }`}
          />

          {/* Data points dots */}
          {subjects.map((sub, idx) => {
            const coords = dataPoints[idx];
            const isHovered = interactive && hoveredIdx === idx;
            const isSelected = selectedSubject === sub.subjectCode;

            return (
              <g key={`dot-${sub.subjectCode}`}>
                {/* Visual rendering circle (mouse events ignored) */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isSelected ? 6 : isHovered ? 7.5 : 4.5}
                  className={`
                    pointer-events-none transition-all duration-300 stroke-card stroke-2
                    ${
                      isSelected
                        ? "fill-cyan-400"
                        : isHovered
                          ? "fill-cyan-300"
                          : interactive && hoveredIdx !== null
                            ? "fill-cyan-600/30"
                            : "fill-cyan-600"
                    }
                  `}
                />

                {/* Transparent Hitbox Circle (captures hover and click) */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={16}
                  fill="transparent"
                  className={interactive ? "cursor-pointer" : "pointer-events-none"}
                  onClick={interactive && onSelectSubject ? () => onSelectSubject(sub.subjectCode) : undefined}
                  onMouseEnter={interactive ? () => setHoveredIdx(idx) : undefined}
                  onMouseLeave={interactive ? () => setHoveredIdx(null) : undefined}
                />

                {/* Inline Tooltip when hovered (fully click-through) */}
                {interactive && isHovered && (
                  <g pointerEvents="none" className="pointer-events-none transition-all duration-300">
                    <rect
                      pointerEvents="none"
                      x={coords.x - 55}
                      y={coords.y - 35}
                      width={110}
                      height={24}
                      rx={6}
                      className="fill-popover stroke-border stroke-1 shadow-lg pointer-events-none"
                    />

                    <text
                      pointerEvents="none"
                      x={coords.x}
                      y={coords.y - 20}
                      textAnchor="middle"
                      className="text-[10px] fill-foreground font-bold pointer-events-none"
                    >
                      {sub.subjectCode}: {sub.averageTotal.toFixed(1)}/100
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {!compact && (
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
          {subjects.map((sub) => (
            <button
              key={sub.subjectCode}
              onClick={interactive && onSelectSubject ? () => onSelectSubject(sub.subjectCode) : undefined}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-200
                ${
                  selectedSubject === sub.subjectCode
                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-semibold shadow-sm"
                    : "bg-muted/10 border-transparent text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                }
              `}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                  selectedSubject === sub.subjectCode ? "bg-cyan-400" : "bg-muted-foreground/40"
                }`}
              />
              {sub.subjectCode}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
