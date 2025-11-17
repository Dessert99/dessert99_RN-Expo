import { colors } from "@/constants";
import * as React from "react";
import { memo } from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

interface CustomIconProps extends SvgProps {
  color?: string;
  size?: number;
}

const SvgComponent = ({
  color = colors.GRAY_500,
  size = 24,
  ...props
}: CustomIconProps) => (
  <Svg
    fill='none'
    width={size}
    height={size}
    viewBox='0 0 24 24' // 크기 조절하려면 필수 옵션
    {...props}>
    <Rect
      width={22}
      height={20}
      x={1}
      y={2.5}
      stroke={color}
      strokeWidth={2}
      rx={5}
    />
    <Rect
      width={1}
      height={5}
      x={7}
      y={0.5}
      fill={color}
      stroke={color}
      rx={0.5}
    />
    <Rect
      width={1}
      height={5}
      x={16}
      y={0.5}
      fill={color}
      stroke={color}
      rx={0.5}
    />
    <Path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m8.5 13 2.5 2.5 5.5-5.5'
    />
  </Svg>
);
const TodayIcon = memo(SvgComponent);
export default TodayIcon;
