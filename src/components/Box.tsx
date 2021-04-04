import styled from "styled-components";

interface BoxProps {
  padding?: number;
  paddingBottom?: number;
  marginTop?: number;
  marginRight?: number;
  align?: "left" | "right" | "center";
  width?: string;
  flex?: boolean;
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
  flexWrap?: string;
  position?: string;
}

const Box = styled.div<BoxProps>((props) => `
  padding: ${props.padding ? `${props.padding}px` : ""};
  padding-bottom: ${props.paddingBottom ? `${props.paddingBottom}px` : ""};
  margin-top: ${props.marginTop ? `${props.marginTop}px` : ""};
  margin-right: ${props.marginRight ? `${props.marginRight}px` : ""};
  text-align: ${props.align};
  width: ${props.width};
  display: ${props.flex ? "flex" : ""};
  align-items: ${props.alignItems};
  justify-content: ${props.justifyContent};
  flex-direction: ${props.flexDirection};
  flex-wrap: ${props.flexWrap};
  position: ${props.position ? props.position : ""};
`);

export default Box;
