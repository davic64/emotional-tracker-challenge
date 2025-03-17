import { useContext } from "react";
import styled from "styled-components";
import { EmotionContext } from "../context/EmotionContext";
import { CardContainer, Card, Empty } from "./ui";
import { useTheme } from "styled-components";
import ShareForm from "./ShareForm";

const EmotionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmotionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EmotionCard = styled(Card)`
  border-left: 4px solid ${({ theme, emotion }) => theme[emotion]};
  background-color: ${({ theme, emotion }) => theme[emotion]}10;
  padding: 1rem;
`;

const EmotionName = styled.span`
  font-weight: 600;
  text-transform: capitalize;
`;

const EmotionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const EmotionDate = styled.span`
  color: #7f8c8d;
  font-size: 0.8rem;
`;

const EmotionIntensity = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid #dbdbdb;
  border-radius: 60px;
  padding: 0.2rem 0.5rem;
`;

const EmotionNotes = styled.p`
  margin: 0;
  color: #34495e;
  font-size: 0.9rem;
  margin-top: 1rem;

  span {
    font-weight: 600;
  }
`;

const HistoryContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ListContainer = styled(CardContainer)`
  width: 100%;

  @media (min-width: 768px) {
    width: 65%;
  }
`;

const ShareContainer = styled(CardContainer)`
  width: 100%;

  @media (min-width: 768px) {
    width: 35%;
    height: fit-content;
    position: sticky;
    top: 1rem;
  }
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const EmotionHistory = ({ emotions, therapist }) => {
  const { loading } = useContext(EmotionContext);
  const theme = useTheme();

  const emotionColors = {
    happy: theme.colors.happy,
    sad: theme.colors.sad,
    angry: theme.colors.angry,
    anxious: theme.colors.anxious,
    neutral: theme.colors.neutral,
  };

  const translateEmotion = (emotion) => {
    const translations = {
      happy: "😊 Feliz",
      sad: "😢 Triste",
      angry: "😠 Enojado",
      anxious: "😰 Ansioso",
      neutral: "😐 Neutral",
    };
    return translations[emotion] || emotion;
  };

  return (
    <HistoryContainer>
      <ListContainer title="Historial de Emociones">
        {loading ? (
          <p>Cargando...</p>
        ) : emotions.length === 0 ? (
          <Empty title="No hay emociones registradas aún. ¡Comienza a hacer seguimiento de tus emociones arriba!" />
        ) : (
          <EmotionList>
            {emotions.map((emotion) => (
              <EmotionCard
                key={emotion.id || emotion._id}
                emotion={emotion.emotion}
                theme={emotionColors}
              >
                <EmotionHeader>
                  <EmotionInfo>
                    <EmotionName className={emotion.emotion}>
                      {translateEmotion(emotion.emotion)}
                    </EmotionName>
                    <EmotionIntensity>{emotion.intensity}/10</EmotionIntensity>
                  </EmotionInfo>
                  <EmotionDate>{formatDate(emotion.date)}</EmotionDate>
                </EmotionHeader>

                {emotion.notes && (
                  <EmotionNotes>
                    <span>Nota:</span> {emotion.notes}
                  </EmotionNotes>
                )}
              </EmotionCard>
            ))}
          </EmotionList>
        )}
      </ListContainer>
      <ShareContainer title="Compartir Emociones">
        <ShareForm therapist={therapist} />
      </ShareContainer>
    </HistoryContainer>
  );
};

export default EmotionHistory;
