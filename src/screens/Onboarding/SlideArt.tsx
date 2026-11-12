import React from 'react';
import {View} from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import type {OnboardingSlide} from '../../data/types';
import {colors, gradients} from '../../theme';

type Props = {
  slide: OnboardingSlide;
  size: number;
};

type NodePoint = {
  angle: number;
  distance: number;
  fill: string;
  radius: number;
};

/**
 * Procedural orbit / nebula illustration for an onboarding slide.
 * Intentionally local to the Onboarding folder so it can stay screen-specific.
 */
export default function SlideArt({slide, size}: Props) {
  const palette = gradients[slide.gradient];
  const palettePrimary = palette[0];
  const paletteMid = palette[1] ?? palette[0];
  const paletteDeep = palette[2] ?? palette[0];
  const center = size / 2;
  const scale = size / 280;
  const id = slide.id;

  const nodes: NodePoint[] = [
    {angle: -42, distance: 0.75, fill: palettePrimary, radius: 0.056},
    {angle: 144, distance: 0.71, fill: colors.gold, radius: 0.044},
    {angle: 68, distance: 0.58, fill: paletteDeep, radius: 0.036},
  ];

  const sparkles = [
    {x: 0.12, y: 0.2, r: 1.3},
    {x: 0.85, y: 0.14, r: 1.1},
    {x: 0.9, y: 0.72, r: 1.4},
    {x: 0.16, y: 0.82, r: 1},
    {x: 0.72, y: 0.93, r: 0.9},
    {x: 0.07, y: 0.52, r: 0.8},
    {x: 0.55, y: 0.06, r: 0.9},
  ];

  const stroke = Math.max(1.4, 2.4 * scale);

  const renderGlyph = () => {
    if (id === 'draw') {
      return (
        <Path
          d={`M${center - 34 * scale} ${center} h${11 * scale} l${6 * scale} ${
            -15 * scale
          } l${9 * scale} ${30 * scale} l${7 * scale} ${-22 * scale} l${
            5 * scale
          } ${12 * scale} l${4 * scale} ${-5 * scale} h${10 * scale}`}
          stroke={colors.gold}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      );
    }

    if (id === 'sound') {
      const bars = [0.36, 0.68, 1, 0.58, 0.3];
      const barWidth = Math.max(2.5, 4.2 * scale);
      const gap = barWidth * 1.5;
      const startX =
        center - (bars.length * barWidth + (bars.length - 1) * gap) / 2;
      return (
        <G fill={colors.gold}>
          {bars.map((bar, index) => {
            const barHeight = center * 0.24 * bar;
            return (
              <Rect
                key={`bar-${index}`}
                x={startX + index * (barWidth + gap)}
                y={center - barHeight / 2}
                width={barWidth}
                height={barHeight}
                rx={barWidth / 2}
              />
            );
          })}
        </G>
      );
    }

    const starRadius = center * 0.08;
    return (
      <G>
        <Ellipse
          cx={center}
          cy={center}
          rx={center * 0.115}
          ry={center * 0.042}
          stroke={colors.gold}
          strokeWidth={Math.max(1, 1.4 * scale)}
          fill="none"
          opacity={0.85}
          transform={`rotate(-24 ${center} ${center})`}
        />
        <Path
          d={`M${center} ${center - starRadius} L${
            center + starRadius * 0.28
          } ${center - starRadius * 0.28} L${center + starRadius} ${center} L${
            center + starRadius * 0.28
          } ${center + starRadius * 0.28} L${center} ${center + starRadius} L${
            center - starRadius * 0.28
          } ${center + starRadius * 0.28} L${center - starRadius} ${center} L${
            center - starRadius * 0.28
          } ${center - starRadius * 0.28} Z`}
          fill={colors.goldBright}
        />
      </G>
    );
  };

  return (
    <View style={{width: size, height: size}}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={palettePrimary} stopOpacity="0.55" />
            <Stop offset="0.45" stopColor={paletteMid} stopOpacity="0.2" />
            <Stop offset="1" stopColor={paletteDeep} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id={`${id}-core`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={colors.text} stopOpacity="0.95" />
            <Stop offset="0.32" stopColor={palettePrimary} stopOpacity="0.9" />
            <Stop offset="1" stopColor={paletteDeep} stopOpacity="0.35" />
          </RadialGradient>
          <LinearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={palettePrimary} />
            <Stop offset="0.5" stopColor={paletteMid} />
            <Stop offset="1" stopColor={paletteDeep} />
          </LinearGradient>
        </Defs>

        <Circle
          cx={center}
          cy={center}
          r={center * 0.93}
          fill={`url(#${id}-glow)`}
        />
        <Circle
          cx={center}
          cy={center}
          r={center * 0.86}
          stroke={colors.borderStrong}
          strokeWidth={1}
          strokeDasharray="2 9"
          fill="none"
          opacity={0.7}
        />

        <G transform={`rotate(-20 ${center} ${center})`}>
          <Ellipse
            cx={center}
            cy={center}
            rx={center * 0.82}
            ry={center * 0.36}
            stroke={`url(#${id}-ring)`}
            strokeWidth={Math.max(1.2, 1.9 * scale)}
            fill="none"
            opacity={0.85}
          />
          <Ellipse
            cx={center}
            cy={center}
            rx={center * 0.68}
            ry={center * 0.47}
            stroke={`url(#${id}-ring)`}
            strokeWidth={1}
            fill="none"
            opacity={0.35}
          />
        </G>

        <G transform={`rotate(40 ${center} ${center})`}>
          <Ellipse
            cx={center}
            cy={center}
            rx={center * 0.76}
            ry={center * 0.29}
            stroke={slide.accent}
            strokeWidth={1}
            strokeDasharray="3 10"
            fill="none"
            opacity={0.5}
          />
        </G>

        {nodes.map((node, index) => {
          const angle = (node.angle * Math.PI) / 180;
          const x = center + Math.cos(angle) * center * node.distance;
          const y = center + Math.sin(angle) * center * node.distance;
          const radius = center * node.radius;
          return (
            <G key={`${id}-node-${index}`}>
              <Circle
                cx={x}
                cy={y}
                r={radius * 1.9}
                fill={node.fill}
                opacity={0.16}
              />
              <Circle
                cx={x}
                cy={y}
                r={radius}
                fill={colors.surfaceAlt}
                stroke={node.fill}
                strokeWidth={Math.max(1, 1.3 * scale)}
              />
              <Circle cx={x} cy={y} r={radius * 0.5} fill={node.fill} />
            </G>
          );
        })}

        <Circle
          cx={center}
          cy={center}
          r={center * 0.24}
          fill={paletteMid}
          opacity={0.12}
        />
        <Circle
          cx={center}
          cy={center}
          r={center * 0.19}
          fill={colors.backgroundElevated}
          stroke={`url(#${id}-ring)`}
          strokeWidth={Math.max(1.2, 1.6 * scale)}
        />
        <Circle
          cx={center}
          cy={center}
          r={center * 0.155}
          fill={`url(#${id}-core)`}
          opacity={0.9}
        />

        {renderGlyph()}

        {sparkles.map((sparkle, index) => (
          <Circle
            key={`${id}-sparkle-${index}`}
            cx={size * sparkle.x}
            cy={size * sparkle.y}
            r={sparkle.r}
            fill={colors.text}
            opacity={0.7}
          />
        ))}
      </Svg>
    </View>
  );
}
