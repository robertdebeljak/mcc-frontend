import styled from "styled-components";
import * as colors from "../colors";

interface ButtonProps {
  active?: boolean;
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>(({ active, disabled }) => `
  margin: 0 auto;
  padding: 0.25rem 0.5rem;
  margin-left: 0.5rem;
  background-color: ${active ? colors.navyBlue : colors.grey};
  border: 2px solid ${colors.darkGrey};
  color: ${colors.black};
  border-radius: 5px;
  font-family: "Avenir Next";
  font-size: 1em;
  letter-spacing: 0.05em;
  font-weight: 700;
  cursor: ${disabled ? "not-allowed" : "pointer"};
  opacity: ${disabled ? 0.4 : 1};
`);

export default Button;
