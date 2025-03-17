import styled from "styled-components";
import { Input, Button } from "./ui";
const ShareFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Instructions = styled.p`
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  font-size: 1rem;
`;

const LastInstructions = styled(Instructions)`
  margin-top: 1rem;
  font-size: 0.8rem;
`;

const ShareForm = ({ therapist }) => {
  return (
    <ShareFormContainer>
      <Instructions>Comparte tus emociones con tu terapeuta</Instructions>
      <Input
        type="text"
        placeholder="Título"
        value={`Dr(a). ${therapist?.name}`}
        readOnly
      />
      <Button>Compartir Datos</Button>
      <LastInstructions>
        Tus datos son compartidos de forma segura y privada
      </LastInstructions>
    </ShareFormContainer>
  );
};

export default ShareForm;
