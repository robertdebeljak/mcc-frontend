import styled from "styled-components";
import * as colors from "../colors";

interface ButtonProps {
  active?: boolean;
  disabled?: boolean;
}

const Button = styled.a<ButtonProps>(({ active, disabled }) => `
  margin: 0 auto;
  padding: 7px 13px;
  margin-left: 0.3rem;
  background-color: ${active ? colors.purple : "transparent"};
  color: ${active ? colors.white : colors.darkerGrey};
  border: 1px solid ${active ? colors.purple :colors.lightGrey};
  border-radius: 5px;
  font-family: "Avenir Next";
  font-size: 1em;
  letter-spacing: 0.05em;
  font-weight: 700;
  cursor: ${disabled ? "not-allowed" : active ? "default" : "pointer"};
  pointer-events: ${disabled ? "none" : "default"};
  opacity: ${disabled ? 0.4 : 1};
  transition: all 250ms ease-in;

  &:hover {
    color: ${active ? colors.white : colors.purple};
    background-color: ${active ? colors.purple : colors.lightGrey};
  }
`);

export default Button;
