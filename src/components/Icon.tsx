import React from "react";
import { Check, Loader, Info, XCircle } from "react-feather";

interface IconComponent {
  [key: string]: React.ReactNode;
}

interface IconProps {
  size?: number;
  icon: string;
  color?: string;
}

const components: IconComponent = {
  check: Check,
  loader: Loader,
  info: Info,
  remove: XCircle
};

const Icon = ({ size, icon, color = "black" }: IconProps) => {
  const Component: any = components[icon];

  if (!icon) return <></>;
  return (
    <Component color={color} size={size}/>
  );
};

export default Icon;
