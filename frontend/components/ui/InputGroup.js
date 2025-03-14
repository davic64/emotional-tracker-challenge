import styled from "styled-components";

export const InputGroupStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #34495e;
`;

export const InputGroup = ({ label, children }) => {
  return (
    <InputGroupStyled>
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      {children}
    </InputGroupStyled>
  );
};
