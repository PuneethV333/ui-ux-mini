import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import {colors, fonts} from '../../theme';

export type OrbitNode = {
  id: string;
  label?: string;
  sublabel?: string;
  color?: string;
  angle: number;
};

type Props = {
  size?: number;
  nodes?: OrbitNode[];
  coreLabel?: string;
  activeNodeId?: string;
  onNodePress?: (node: OrbitNode) => void;
  variant?: 'default' | 'result' | 'final';
  showLabels?: boolean;
};

export default function OrbitVisual({
  size = 280,
  nodes = [],
  coreLabel = 'Core',
  activeNodeId,
  variant = 'default',
  showLabels = true,
}: Props) {
  const center = size / 2;
  const orbitRadius = size * 0.38;
  const nodeSize = Math.max(34, size * 0.12);

  return (
    <View style={[styles.root, {width: size, height: size}]}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#FFC46B" stopOpacity="0.95" />
            <Stop offset="0.4" stopColor="#E879F9" stopOpacity="0.65" />
            <Stop offset="1" stopColor="#5B21B6" stopOpacity="0.1" />
          </RadialGradient>
          <LinearGradient id="orbit-ring" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#F472D0" stopOpacity="0.85" />
            <Stop offset="0.5" stopColor="#8B5CF6" stopOpacity="0.55" />
            <Stop offset="1" stopColor="#38BDF8" stopOpacity="0.8" />
          </LinearGradient>
          <LinearGradient id="orbit-ring-soft" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.35" />
            <Stop offset="1" stopColor="#A78BFA" stopOpacity="0.08" />
          </LinearGradient>
        </Defs>

        <Circle cx={center} cy={center} r={center - 2} fill="transparent" />
        <G>
          <Ellipse
            cx={center}
            cy={center}
            rx={size * 0.46}
            ry={size * 0.46}
            stroke="url(#orbit-ring-soft)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3 8"
          />
          <Ellipse
            cx={center}
            cy={center}
            rx={size * 0.34}
            ry={size * 0.34}
            stroke="url(#orbit-ring)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.7"
          />
          <Ellipse
            cx={center}
            cy={center}
            rx={size * 0.22}
            ry={size * 0.22}
            stroke="url(#orbit-ring-soft)"
            strokeWidth="1"
            fill="none"
          />
        </G>

        <Circle cx={center} cy={center} r={size * 0.3} fill="url(#orbit-core)" opacity="0.18" />
        <Circle
          cx={center}
          cy={center}
          r={size * 0.13}
          fill="#0B0518"
          stroke="url(#orbit-ring)"
          strokeWidth="2"
        />
        <Circle
          cx={center}
          cy={center}
          r={size * 0.09}
          fill="#140A28"
          stroke="#FFC46B"
          strokeWidth="1.2"
          opacity="0.9"
        />

        {nodes.map(node => {
          const angle = (node.angle * Math.PI) / 180;
          const x = center + Math.cos(angle) * orbitRadius;
          const y = center + Math.sin(angle) * orbitRadius;
          return (
            <G key={node.id}>
              <Circle
                cx={x}
                cy={y}
                r={nodeSize / 2 + 5}
                fill={node.color ?? '#A78BFA'}
                opacity={activeNodeId === node.id ? 0.28 : 0.12}
              />
              <Circle
                cx={x}
                cy={y}
                r={nodeSize / 2}
                fill="#160D2C"
                stroke={node.color ?? '#A78BFA'}
                strokeWidth={activeNodeId === node.id ? 2 : 1.2}
              />
              <Circle cx={x} cy={y} r={nodeSize / 2 - 7} fill={node.color ?? '#A78BFA'} opacity="0.55" />
            </G>
          );
        })}
      </Svg>

      <View style={[styles.centerLabel, {top: center + size * 0.16}]} pointerEvents="none">
        <Text style={styles.coreLabel}>{coreLabel}</Text>
      </View>

      {showLabels
        ? nodes.map(node => {
            const angle = (node.angle * Math.PI) / 180;
            const x = center + Math.cos(angle) * orbitRadius;
            const y = center + Math.sin(angle) * orbitRadius;
            const below = Math.sin(angle) >= 0;
            return (
              <View
                key={`label-${node.id}`}
                pointerEvents="none"
                style={[
                  styles.nodeLabel,
                  {
                    left: x - 52,
                    top: below ? y + nodeSize / 2 + 6 : y - nodeSize / 2 - 26,
                  },
                ]}>
                {node.label ? <Text style={styles.nodeLabelText}>{node.label}</Text> : null}
                {node.sublabel ? (
                  <Text style={styles.nodeSubLabel}>{node.sublabel}</Text>
                ) : null}
              </View>
            );
          })
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {alignSelf: 'center'},
  centerLabel: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  coreLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 0.6,
  },
  nodeLabel: {
    position: 'absolute',
    width: 104,
    alignItems: 'center',
  },
  nodeLabelText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.text,
    textAlign: 'center',
  },
  nodeSubLabel: {
    fontFamily: fonts.body,
    fontSize: 9,
    color: colors.textDim,
    marginTop: 1,
  },
});
