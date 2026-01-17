import * as React from 'react';
import Svg, { Line } from 'react-native-svg';

export const SvgClose = ({ size = 24, color = '#ffffff', strokeWidth = 2 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line
        x1="4"
        y1="4"
        x2="20"
        y2="20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Line
        x1="20"
        y1="4"
        x2="4"
        y2="20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};
