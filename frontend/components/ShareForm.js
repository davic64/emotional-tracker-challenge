import styled from "styled-components";
import { Input, Button } from "./ui";
import { EmotionContext } from "../context/EmotionContext";
import { useContext } from "react";

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

const ShareForm = ({ therapist, emotionIds }) => {
  const { shareWithTherapist } = useContext(EmotionContext);

  const handleShare = () => {
    shareWithTherapist(emotionIds);
  };

  return (
    <ShareFormContainer>
      <Instructions>Comparte tus emociones con tu terapeuta</Instructions>
      <Input
        type="text"
        placeholder="Título"
        value={`Dr(a). ${therapist?.name}`}
        readOnly
      />
      <Button onClick={handleShare}>Compartir Datos</Button>
      <LastInstructions>
        Tus datos son compartidos de forma segura y privada
      </LastInstructions>
    </ShareFormContainer>
  );
};

export default ShareForm;
