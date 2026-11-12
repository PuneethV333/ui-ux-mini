import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  Line,
  Path,
  Polyline,
  Rect,
} from 'react-native-svg';

export type IconName =
  | 'home'
  | 'library'
  | 'plus'
  | 'profile'
  | 'arrow-left'
  | 'arrow-right'
  | 'chevron-right'
  | 'chevron-down'
  | 'search'
  | 'play'
  | 'pause'
  | 'skip-back'
  | 'skip-forward'
  | 'heart'
  | 'share'
  | 'download'
  | 'settings'
  | 'sparkles'
  | 'music'
  | 'pulse'
  | 'waveform'
  | 'check'
  | 'close'
  | 'edit'
  | 'globe'
  | 'star'
  | 'help'
  | 'refresh'
  | 'sliders'
  | 'trash'
  | 'undo'
  | 'pen'
  | 'shapes'
  | 'line'
  | 'mail'
  | 'lock'
  | 'user'
  | 'logout'
  | 'layers'
  | 'disc'
  | 'compass';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
};

function IconPaths({
  name,
  color,
  strokeWidth,
  fill,
}: {
  name: IconName;
  color: string;
  strokeWidth: number;
  fill: string;
}) {
  const stroke = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none' as const,
  };
  switch (name) {
    case 'home':
      return (
        <G {...stroke}>
          <Path d="M3.5 10.4 12 3.5l8.5 6.9" />
          <Path d="M5.5 9.2V20h13V9.2" />
          <Path d="M9.6 20v-5.6h4.8V20" />
        </G>
      );
    case 'library':
      return (
        <G {...stroke}>
          <Path d="M4 4.2v15.6M8 4.2v15.6M12.4 4.6l4.2 14.8M13.2 3.8l4.6-1 3.4 14.9-4.6 1.1z" />
        </G>
      );
    case 'plus':
      return (
        <G {...stroke}>
          <Line x1="12" y1="4.5" x2="12" y2="19.5" />
          <Line x1="4.5" y1="12" x2="19.5" y2="12" />
        </G>
      );
    case 'profile':
      return (
        <G {...stroke}>
          <Circle cx="12" cy="8.2" r="3.9" />
          <Path d="M4.4 20c.6-3.8 3.6-6.1 7.6-6.1s7 2.3 7.6 6.1" />
        </G>
      );
    case 'arrow-left':
      return (
        <G {...stroke}>
          <Line x1="20" y1="12" x2="4.5" y2="12" />
          <Polyline points="10.5,5.5 4,12 10.5,18.5" />
        </G>
      );
    case 'arrow-right':
      return (
        <G {...stroke}>
          <Line x1="4" y1="12" x2="19.5" y2="12" />
          <Polyline points="13.5,5.5 20,12 13.5,18.5" />
        </G>
      );
    case 'chevron-right':
      return <Polyline points="9,4.5 16.5,12 9,19.5" {...stroke} />;
    case 'chevron-down':
      return <Polyline points="4.5,9 12,16.5 19.5,9" {...stroke} />;
    case 'search':
      return (
        <G {...stroke}>
          <Circle cx="10.8" cy="10.8" r="6.3" />
          <Line x1="15.6" y1="15.6" x2="20.5" y2="20.5" />
        </G>
      );
    case 'play':
      return <Path d="M7.5 4.8 19.2 12 7.5 19.2z" fill={fill} stroke="none" />;
    case 'pause':
      return (
        <G fill={fill}>
          <Rect x="6.3" y="4.8" width="3.9" height="14.4" rx="1.4" />
          <Rect x="13.8" y="4.8" width="3.9" height="14.4" rx="1.4" />
        </G>
      );
    case 'skip-back':
      return (
        <G fill={fill}>
          <Path d="M18.5 5.5v13L8.8 12z" />
          <Rect x="4.5" y="5" width="2.4" height="14" rx="1" />
        </G>
      );
    case 'skip-forward':
      return (
        <G fill={fill}>
          <Path d="M5.5 5.5v13L15.2 12z" />
          <Rect x="17.1" y="5" width="2.4" height="14" rx="1" />
        </G>
      );
    case 'heart':
      return (
        <Path
          d="M12 20.2S3.8 15.4 3.8 9.7c0-3 2.2-5.2 5-5.2 1.6 0 2.6.8 3.2 1.7.6-.9 1.6-1.7 3.2-1.7 2.8 0 5 2.2 5 5.2 0 5.7-8.2 10.5-8.2 10.5z"
          {...stroke}
        />
      );
    case 'share':
      return (
        <G {...stroke}>
          <Circle cx="17.5" cy="5.5" r="2.6" />
          <Circle cx="6.2" cy="12" r="2.6" />
          <Circle cx="17.5" cy="18.5" r="2.6" />
          <Line x1="8.6" y1="10.8" x2="15.2" y2="6.7" />
          <Line x1="8.6" y1="13.2" x2="15.2" y2="17.3" />
        </G>
      );
    case 'download':
      return (
        <G {...stroke}>
          <Line x1="12" y1="3.5" x2="12" y2="15" />
          <Polyline points="7,10.4 12,15.5 17,10.4" />
          <Path d="M4.5 17.5v2.2h15v-2.2" />
        </G>
      );
    case 'settings':
      return (
        <G {...stroke}>
          <Circle cx="12" cy="12" r="3.2" />
          <Path d="M19.4 12a7.4 7.4 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7.6 7.6 0 0 0-2-1.2L14.6 3h-5.2l-.4 2.7a7.6 7.6 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5a7.4 7.4 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7.6 7.6 0 0 0 2 1.2l.4 2.7h5.2l.4-2.7a7.6 7.6 0 0 0 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z" />
        </G>
      );
    case 'sparkles':
      return (
        <G {...stroke}>
          <Path d="M12 3.2l1.6 5.1L18.8 10l-5.2 1.6L12 16.8l-1.6-5.2L5.2 10l5.2-1.7z" />
          <Path d="M18.4 15.2l.7 2.2 2.2.7-2.2.7-.7 2.2-.7-2.2-2.2-.7 2.2-.7z" />
          <Path d="M5.2 2.6l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z" />
        </G>
      );
    case 'music':
      return (
        <G {...stroke}>
          <Circle cx="7.2" cy="17.4" r="3" />
          <Circle cx="18" cy="15.4" r="2.6" />
          <Line x1="10.2" y1="17.4" x2="10.2" y2="5.2" />
          <Line x1="20.6" y1="15.4" x2="20.6" y2="3.4" />
          <Path d="M10.2 5.2l10.4-1.8" />
        </G>
      );
    case 'pulse':
      return (
        <Polyline
          points="2.5,12 6.4,12 8.8,5.8 12.2,18.4 14.8,9.4 17,12 21.5,12"
          {...stroke}
        />
      );
    case 'waveform':
      return (
        <G fill={fill}>
          <Rect x="3" y="9" width="2.2" height="6" rx="1.1" />
          <Rect x="7" y="5.5" width="2.2" height="13" rx="1.1" />
          <Rect x="11" y="2.8" width="2.2" height="18.4" rx="1.1" />
          <Rect x="15" y="6.8" width="2.2" height="10.4" rx="1.1" />
          <Rect x="19" y="9.8" width="2.2" height="4.4" rx="1.1" />
        </G>
      );
    case 'check':
      return <Polyline points="4.5,12.5 9.6,17.6 19.8,6.6" {...stroke} />;
    case 'close':
      return (
        <G {...stroke}>
          <Line x1="5" y1="5" x2="19" y2="19" />
          <Line x1="19" y1="5" x2="5" y2="19" />
        </G>
      );
    case 'edit':
      return (
        <G {...stroke}>
          <Path d="M4 20l.8-4.6L16.6 3.6a2.2 2.2 0 0 1 3.1 0l.7.7a2.2 2.2 0 0 1 0 3.1L8.6 19.2z" />
          <Line x1="14.6" y1="5.6" x2="18.4" y2="9.4" />
        </G>
      );
    case 'globe':
      return (
        <G {...stroke}>
          <Circle cx="12" cy="12" r="8.8" />
          <Ellipse cx="12" cy="12" rx="4" ry="8.8" />
          <Line x1="3.2" y1="12" x2="20.8" y2="12" />
        </G>
      );
    case 'star':
      return (
        <Path
          d="M12 3.2l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"
          {...stroke}
        />
      );
    case 'help':
      return (
        <G {...stroke}>
          <Circle cx="12" cy="12" r="8.8" />
          <Path d="M9.4 9.2a2.7 2.7 0 1 1 3.9 2.4c-.8.5-1.3 1-1.3 2.1" />
          <Circle cx="12" cy="17.2" r=".9" fill={color} stroke="none" />
        </G>
      );
    case 'refresh':
      return (
        <G {...stroke}>
          <Path d="M20 12a8 8 0 1 1-2.6-5.9" />
          <Polyline points="20.2,3.6 20.2,8.4 15.4,8.4" />
        </G>
      );
    case 'sliders':
      return (
        <G {...stroke}>
          <Line x1="3.5" y1="7" x2="20.5" y2="7" />
          <Line x1="3.5" y1="17" x2="20.5" y2="17" />
          <Circle cx="8" cy="7" r="2.2" fill={fill} />
          <Circle cx="16" cy="17" r="2.2" fill={fill} />
        </G>
      );
    case 'trash':
      return (
        <G {...stroke}>
          <Path d="M4.5 6.5h15" />
          <Path d="M9 3.8h6l.6 2.7H8.4z" />
          <Path d="M6.5 6.5l.9 14h9.2l.9-14" />
          <Line x1="10.2" y1="10" x2="10.2" y2="17" />
          <Line x1="13.8" y1="10" x2="13.8" y2="17" />
        </G>
      );
    case 'undo':
      return (
        <G {...stroke}>
          <Path d="M8.5 8.2H4.2V3.9" />
          <Path d="M4.6 8.2A8.2 8.2 0 1 1 4 14.4" />
        </G>
      );
    case 'pen':
      return (
        <G {...stroke}>
          <Path d="M4.2 20l.8-4.6L16.2 4.2a2 2 0 0 1 2.8 0l.8.8a2 2 0 0 1 0 2.8L8.8 19.2z" />
          <Line x1="14.8" y1="5.6" x2="18.4" y2="9.2" />
        </G>
      );
    case 'shapes':
      return (
        <G {...stroke}>
          <Circle cx="7" cy="7" r="3.4" />
          <Rect x="13" y="13" width="7" height="7" rx="1.4" />
          <Path d="M16.5 4.2l3.3 6H13.2z" />
        </G>
      );
    case 'line':
      return (
        <G {...stroke}>
          <Line x1="4" y1="18.5" x2="20" y2="5.5" />
          <Circle cx="4" cy="18.5" r="1.4" fill={color} />
          <Circle cx="20" cy="5.5" r="1.4" fill={color} />
        </G>
      );
    case 'mail':
      return (
        <G {...stroke}>
          <Rect x="3.2" y="5.2" width="17.6" height="13.6" rx="2.4" />
          <Polyline points="4.2,6.6 12,12.6 19.8,6.6" />
        </G>
      );
    case 'lock':
      return (
        <G {...stroke}>
          <Rect x="4.8" y="10.4" width="14.4" height="10" rx="2.4" />
          <Path d="M8.2 10.4V7.6a3.8 3.8 0 0 1 7.6 0v2.8" />
          <Circle cx="12" cy="15.4" r="1.2" fill={color} stroke="none" />
        </G>
      );
    case 'user':
      return (
        <G {...stroke}>
          <Circle cx="12" cy="8" r="3.8" />
          <Path d="M4.8 20c.7-3.6 3.6-5.8 7.2-5.8s6.5 2.2 7.2 5.8" />
        </G>
      );
    case 'logout':
      return (
        <G {...stroke}>
          <Path d="M10 4.5H5.2v15H10" />
          <Line x1="9" y1="12" x2="20" y2="12" />
          <Polyline points="15.8,7.8 20,12 15.8,16.2" />
        </G>
      );
    case 'layers':
      return (
        <G {...stroke}>
          <Path d="M12 3.4l9 4.6-9 4.6-9-4.6z" />
          <Path d="M3.6 12.4l8.4 4.3 8.4-4.3" />
          <Path d="M3.6 16.6l8.4 4.3 8.4-4.3" />
        </G>
      );
    case 'disc':
      return (
        <G {...stroke}>
          <Circle cx="12" cy="12" r="8.8" />
          <Circle cx="12" cy="12" r="2.4" />
          <Path d="M12 3.2a8.8 8.8 0 0 1 7.4 4" />
        </G>
      );
    case 'compass':
      return (
        <G {...stroke}>
          <Circle cx="12" cy="12" r="8.8" />
          <Path d="M15.8 8.2l-2.2 5.4-5.4 2.2 2.2-5.4z" />
        </G>
      );
    default:
      return null;
  }
}

export default function Icon({
  name,
  size = 22,
  color = '#F7F3FF',
  strokeWidth = 1.7,
  fill,
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <IconPaths
        name={name}
        color={color}
        strokeWidth={strokeWidth}
        fill={fill ?? color}
      />
    </Svg>
  );
}
