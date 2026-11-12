import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {LinearGradient} from 'expo-linear-gradient';
import Svg, {G, Path, Rect} from 'react-native-svg';
import CosmicHeader from '../../components/layout/CosmicHeader';
import ScreenContainer from '../../components/layout/ScreenContainer';
import GlassCard from '../../components/common/GlassCard';
import GlowButton from '../../components/common/GlowButton';
import Icon, {IconName} from '../../components/common/Icon';
import IconButton from '../../components/common/IconButton';
import {useApp} from '../../context/AppContext';
import {getMood} from '../../data/mockData';
import type {RootScreenProps} from '../../navigation/types';
import {colors, gradients, spacing} from '../../theme';
import {styles} from './styles';

type Props = RootScreenProps<'DrawYourMood'>;

type Point = {x: number; y: number};
type Tool = 'brush' | 'shape' | 'line';
type Stroke = {
  tool: Tool;
  points: Point[];
  color: string;
};

const TOOLS: Array<{id: Tool; label: string; icon: IconName}> = [
  {id: 'brush', label: 'Brush', icon: 'pen'},
  {id: 'shape', label: 'Shape', icon: 'shapes'},
  {id: 'line', label: 'Line', icon: 'line'},
];

function brushPath(points: Point[]): string {
  if (points.length === 0) {
    return '';
  }
  const first = points[0];
  if (points.length === 1) {
    return `M ${first.x} ${first.y} L ${first.x + 0.1} ${first.y + 0.1}`;
  }
  let d = `M ${first.x} ${first.y}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const point = points[i];
    const next = points[i + 1];
    const midX = (point.x + next.x) / 2;
    const midY = (point.y + next.y) / 2;
    d += ` Q ${point.x} ${point.y} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

function guideWave(width: number, height: number, offset: number): string {
  const mid = height / 2;
  const amp = height * 0.085;
  return [
    `M ${width * 0.06} ${mid}`,
    `C ${width * 0.16} ${mid - amp + offset}, ${width * 0.24} ${
      mid + amp + offset
    }, ${width * 0.34} ${mid + offset}`,
    `S ${width * 0.5} ${mid - amp * 1.5 + offset}, ${width * 0.6} ${
      mid + offset
    }`,
    `S ${width * 0.8} ${mid + amp * 1.2 + offset}, ${width * 0.94} ${
      mid + offset
    }`,
  ].join(' ');
}

function StrokeShape({stroke}: {stroke: Stroke}) {
  const {color, tool, points} = stroke;
  if (points.length === 0) {
    return null;
  }

  if (tool === 'brush') {
    const d = brushPath(points);
    return (
      <G>
        <Path
          d={d}
          stroke={color}
          strokeWidth={8}
          strokeOpacity={0.14}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d={d}
          stroke={color}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>
    );
  }

  const start = points[0];
  const end = points[points.length - 1];

  if (tool === 'line') {
    const d = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    return (
      <G>
        <Path
          d={d}
          stroke={color}
          strokeWidth={8}
          strokeOpacity={0.14}
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d={d}
          stroke={color}
          strokeWidth={2.2}
          strokeLinecap="round"
          fill="none"
        />
      </G>
    );
  }

  const x = Math.min(start.x, end.x);
  const y = Math.min(start.y, end.y);
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);
  const rx = Math.max(2, Math.min(width, height) * 0.24);
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      stroke={color}
      strokeWidth={2.2}
      strokeOpacity={0.95}
      fill="none"
    />
  );
}

function ToolButton({
  label,
  icon,
  active,
  disabled,
  onPress,
}: {
  label: string;
  icon: IconName;
  active?: boolean;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{selected: Boolean(active), disabled: Boolean(disabled)}}
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.tool,
        active && styles.toolActive,
        pressed && styles.toolPressed,
        disabled && styles.toolDisabled,
      ]}>
      {active ? (
        <LinearGradient
          colors={[...gradients.secondaryButton]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <Icon
        name={icon}
        size={20}
        color={active ? colors.white : colors.textMuted}
        strokeWidth={active ? 2.1 : 1.7}
      />
      <Text
        numberOfLines={1}
        style={[
          styles.toolLabel,
          active && styles.toolLabelActive,
          disabled && styles.toolLabelDisabled,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

function StepBars({active}: {active: number}) {
  return (
    <View style={styles.stepBars}>
      {[1, 2, 3].map(step => (
        <View
          key={step}
          style={[styles.stepBar, step <= active && styles.stepBarActive]}
        />
      ))}
    </View>
  );
}

export default function DrawYourMood({navigation, route}: Props) {
  const {width} = useWindowDimensions();
  const {selectedMood, selectMood, draft, updateDraft} = useApp();
  const mood = getMood(route.params?.moodId ?? draft.mood);

  const [tool, setTool] = useState<Tool>('brush');
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [activeStroke, setActiveStroke] = useState<Stroke | null>(null);
  const [intensity, setIntensity] = useState(draft.intensity);

  const fade = useRef(new Animated.Value(0)).current;
  const activeRef = useRef<Stroke | null>(null);
  const toolRef = useRef<Tool>('brush');
  const strokeCountRef = useRef(0);
  const initialisedRef = useRef(false);

  const palette = useMemo(
    () => [mood.accent, colors.secondary, colors.gold, colors.cyan],
    [mood.accent],
  );
  const paletteRef = useRef(palette);
  paletteRef.current = palette;

  const canvasWidth = Math.min(width - spacing.screen * 2, 396);
  const canvasHeight = Math.round(canvasWidth * 0.95);

  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 460,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  useEffect(() => {
    if (initialisedRef.current) {
      return;
    }
    initialisedRef.current = true;
    if (selectedMood !== mood.id) {
      selectMood(mood.id);
    }
  }, [mood.id, selectMood, selectedMood]);

  useEffect(() => {
    strokeCountRef.current = strokes.length;
    updateDraft({strokes: strokes.length});
  }, [strokes.length, updateDraft]);

  const commitStroke = useCallback(() => {
    const stroke = activeRef.current;
    activeRef.current = null;
    setActiveStroke(null);
    if (!stroke) {
      return;
    }
    const points = stroke.points;
    if (stroke.tool === 'brush') {
      if (points.length === 1) {
        setStrokes(previous => [...previous, stroke]);
        return;
      }
      if (points.length < 2) {
        return;
      }
      let length = 0;
      for (let i = 1; i < points.length; i += 1) {
        length += Math.hypot(
          points[i].x - points[i - 1].x,
          points[i].y - points[i - 1].y,
        );
      }
      if (length < 5) {
        return;
      }
    } else {
      if (points.length < 2) {
        return;
      }
      const start = points[0];
      const end = points[points.length - 1];
      if (
        Math.abs(end.x - start.x) + Math.abs(end.y - start.y) <
        8
      ) {
        return;
      }
    }
    setStrokes(previous => [...previous, stroke]);
  }, []);

  const commitRef = useRef(commitStroke);
  commitRef.current = commitStroke;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: event => {
        const {locationX, locationY} = event.nativeEvent;
        const color =
          paletteRef.current[strokeCountRef.current % paletteRef.current.length] ??
          colors.secondary;
        const stroke: Stroke = {
          tool: toolRef.current,
          points: [{x: locationX, y: locationY}],
          color,
        };
        activeRef.current = stroke;
        setActiveStroke(stroke);
      },
      onPanResponderMove: event => {
        const {locationX, locationY} = event.nativeEvent;
        const previous = activeRef.current;
        if (!previous) {
          return;
        }
        const last = previous.points[previous.points.length - 1];
        if (Math.hypot(locationX - last.x, locationY - last.y) < 1.4) {
          return;
        }
        const next: Stroke = {
          ...previous,
          points: [...previous.points, {x: locationX, y: locationY}],
        };
        activeRef.current = next;
        setActiveStroke(next);
      },
      onPanResponderRelease: () => commitRef.current(),
      onPanResponderTerminate: () => commitRef.current(),
    }),
  ).current;

  const hasStrokes = strokes.length > 0;
  const guide = guideWave(canvasWidth, canvasHeight, 0);

  const showHelp = () => {
    Alert.alert(
      'How it works',
      'Brush draws freely, Shape stamps a rounded frame, and Line pulls a straight strike. Undo removes your last mark and Clear starts again.\n\nSlide Intensity to shape how bold your universe becomes.',
      [{text: 'Got it'}],
    );
  };

  return (
    <ScreenContainer
      edges={['top', 'left', 'right', 'bottom']}
      contentContainerStyle={styles.content}>
      <View style={styles.stepRow}>
        <Text style={styles.stepText}>STEP 2 OF 3</Text>
        <StepBars active={2} />
      </View>

      <CosmicHeader
        compact
        title={`${mood.label} Mood`}
        onBack={() => navigation.goBack()}
        right={
          <IconButton
            name="help"
            size={40}
            onPress={showHelp}
            accessibilityLabel="Drawing help"
          />
        }
      />

      <Text style={styles.title}>Draw your mood</Text>
      <Text style={styles.subtitle}>Let your lines become sound.</Text>

      <Animated.View
        style={[
          styles.canvasWrap,
          {
            opacity: fade,
            transform: [
              {
                translateY: fade.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, 0],
                }),
              },
            ],
          },
        ]}>
        <GlassCard
          padded={false}
          gradient={gradients.card}
          style={[styles.canvas, {width: canvasWidth, height: canvasHeight}]}>
          <View
            style={StyleSheet.absoluteFill}
            accessibilityLabel="Drawing canvas. Drag a finger to draw your mood."
            {...panResponder.panHandlers}>
            <Svg width={canvasWidth} height={canvasHeight} pointerEvents="none">
              {!hasStrokes && !activeStroke ? (
                <G>
                  <Path
                    d={guide}
                    stroke={colors.primaryBright}
                    strokeOpacity={0.26}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    fill="none"
                  />
                  <Path
                    d={guideWave(canvasWidth, canvasHeight, canvasHeight * 0.11)}
                    stroke={colors.secondary}
                    strokeOpacity={0.12}
                    strokeWidth={1.2}
                    strokeLinecap="round"
                    fill="none"
                  />
                </G>
              ) : null}
              {strokes.map((stroke, index) => (
                <StrokeShape key={`stroke-${index}`} stroke={stroke} />
              ))}
              {activeStroke ? <StrokeShape stroke={activeStroke} /> : null}
            </Svg>

            <View pointerEvents="none" style={styles.canvasMeta}>
              <View style={styles.liveDot} />
              <Text style={styles.canvasMetaText}>LIVE CANVAS</Text>
            </View>

            {!hasStrokes && !activeStroke ? (
              <View pointerEvents="none" style={styles.canvasHint}>
                <Text style={styles.canvasHintTitle}>
                  Draw a line, shape or feeling
                </Text>
                <Text style={styles.canvasHintSub}>LET YOUR HAND LEAD</Text>
              </View>
            ) : null}

            {hasStrokes ? (
              <View pointerEvents="none" style={styles.strokeCount}>
                <Text style={styles.strokeCountText}>
                  {strokes.length} {strokes.length === 1 ? 'STROKE' : 'STROKES'}
                </Text>
              </View>
            ) : null}
          </View>
        </GlassCard>
      </Animated.View>

      <View style={styles.toolRow}>
        {TOOLS.map(item => (
          <ToolButton
            key={item.id}
            label={item.label}
            icon={item.icon}
            active={tool === item.id}
            onPress={() => setTool(item.id)}
          />
        ))}
        <ToolButton
          label="Undo"
          icon="undo"
          disabled={!hasStrokes}
          onPress={() => setStrokes(previous => previous.slice(0, -1))}
        />
        <ToolButton
          label="Clear"
          icon="trash"
          disabled={!hasStrokes}
          onPress={() => setStrokes([])}
        />
      </View>

      <View style={styles.intensityBlock}>
        <View style={styles.intensityHeader}>
          <Text style={styles.intensityLabel}>Intensity</Text>
          <Text style={styles.intensityValue}>
            {Math.round(intensity * 100)}%
          </Text>
        </View>
        <View style={styles.sliderRow}>
          <Icon name="sliders" size={16} color={colors.textDim} />
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            value={intensity}
            onValueChange={value => {
              setIntensity(value);
              updateDraft({intensity: value, strokes: strokes.length});
            }}
            minimumTrackTintColor={colors.secondary}
            maximumTrackTintColor={colors.surfaceGlassStrong}
            thumbTintColor={colors.secondary}
            accessibilityLabel="Sound intensity"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <GlowButton
          title="Create My Sound"
          iconRight="sparkles"
          disabled={!hasStrokes}
          onPress={() => {
            if (!hasStrokes) {
              return;
            }
            updateDraft({intensity, strokes: strokes.length});
            navigation.replace('GeneratingUniverse');
          }}
        />
        <Text
          style={[styles.helper, !hasStrokes && styles.helperMuted]}
          numberOfLines={2}>
          {hasStrokes
            ? `${strokes.length} ${
                strokes.length === 1 ? 'stroke' : 'strokes'
              } captured — your universe is ready to form.`
            : 'Add at least one stroke to unlock your sound.'}
        </Text>
      </View>
    </ScreenContainer>
  );
}
