import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || "1rem"};
`;
