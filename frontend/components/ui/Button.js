import styled from "styled-components";

const theme = {
  colors: {
    primary: {
      background: "#3cabdb",
      hover: "#2980b9",
    },
    danger: {
      background: "#e74c3c",
      hover: "#c0392b",
    },
    success: {
      background: "#27ae60",
      hover: "#2ecc71",
    },
    warning: {
      background: "#F1C40F",
      hover: "#F39C12",
    },
  },
};

const Button = styled.button`
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;

  ${({ variant = "default", color = "primary" }) => {
    const currentColor = theme.colors[color];

    switch (variant) {
      case "outline":
        return `
          background-color: transparent;
          border-color: ${currentColor.background};
          color: ${currentColor.background};
          &:hover {
            background-color: ${currentColor.background};
            color: white;
          }
        `;
      case "ghost":
        return `
          background-color: transparent;
          color: ${currentColor.background};
          &:hover {
            background-color: ${currentColor.background}1a;
          }
        `;
      default:
        return `
          background-color: ${currentColor.background};
          color: white;
          &:hover {
            background-color: ${currentColor.hover};
          }
        `;
    }
  }}
`;

Button.defaultProps = {
  variant: "default",
  color: "primary",
};

export { Button, theme };
