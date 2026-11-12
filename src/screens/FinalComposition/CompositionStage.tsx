import React from 'react';
import {View} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import OrbitVisual from '../../components/player/OrbitVisual';
import type {OrbitNode} from '../../components/player/OrbitVisual';
import {colors} from '../../theme';
import {styles} from './styles';

type Props = {
  size: number;
  nodes: OrbitNode[];
  coreLabel?: string;
};

/**
 * OrbitVisual gives us the rings, gold core and node orbs. This wrapper adds
 * the dashed radial connectors that make the composition read as one system.
 */
export default function CompositionStage({
  size,
  nodes,
  coreLabel = 'Core',
}: Props) {
  const center = size / 2;
  const radius = size * 0.38;

  return (
    <View style={[styles.orbitWrap, {width: size, height: size}]}>
      <Svg
        width={size}
        height={size}
        style={styles.orbitSvg}
        pointerEvents="none">
        {nodes.map(node => {
          const angle = (node.angle * Math.PI) / 180;
          return (
            <Line
              key={`connector-${node.id}`}
              x1={center}
              y1={center}
              x2={center + Math.cos(angle) * radius}
              y2={center + Math.sin(angle) * radius}
              stroke={node.color ?? colors.borderStrong}
              strokeWidth={1}
              strokeDasharray="3 6"
              opacity={0.45}
            />
          );
        })}
      </Svg>
      <OrbitVisual
        size={size}
        nodes={nodes}
        coreLabel={coreLabel}
        showLabels={false}
      />
    </View>
  );
}
