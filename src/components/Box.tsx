import styled from "styled-components";

interface BoxProps {
  padding?: number;
  paddingBottom?: number;
  align?: "left" | "right" | "center";
  width?: string;
  flex?: boolean;
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
}

const Box = styled.div<BoxProps>((props) => `
  padding: ${props.padding ? `${props.padding}px` : ""};
  padding-bottom: ${props.paddingBottom ? `${props.paddingBottom}px` : ""};
  text-align: ${props.align};
  width: ${props.width};
  display: ${props.flex ? "flex" : ""};
  align-items: ${props.alignItems};
  justify-content: ${props.justifyContent};
  flex-direction: ${props.flexDirection};
`);

export default Box;
