import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { CardContainer, Card, Title } from "../components/ui";
import { summarizeEmotions } from "../lib/emotions.api";
import { EmotionContext } from "../context/EmotionContext";
import EmotionChart from "../components/EmotionChart";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const Text = styled.p`
  color: #7f8c8d;
  margin: ${({ margin }) => margin || "0"};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const InfoCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardLink = styled.a`
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CardStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const StatsTitle = styled(Title)`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const StatsValue = styled(Title)`
  color: #3498db;
  margin-bottom: 0.5rem;
`;

const StatsText = styled(Text)`
  color: #7f8c8d;
  font-size: 1.2rem;
`;

const emotionTranslation = {
  happy: "😊 Feliz",
  sad: "😢 Triste",
  angry: "😠 Enojado",
  anxious: "😰 Ansioso",
  neutral: "😐 Neutral",
};

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  try {
    const data = await summarizeEmotions(token);
    return { props: { emotionsSummary: data } };
  } catch (error) {
    console.error(error);
    return { props: { emotionsSummary: [] } };
  }
}

export default function Dashboard({ emotionsSummary }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const { setInitialEmotionsSummary, emotionsSummary: contextEmotionsSummary } =
    useContext(EmotionContext);

  // Basic auth protection
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    setInitialEmotionsSummary(emotionsSummary);
  }, [emotionsSummary]);

  if (loading || !user) {
    return (
      <Layout title="Panel - Terapia Emocional">
        <p>Cargando...</p>
      </Layout>
    );
  }

  return (
    <Layout title="Panel - Terapia Emocional">
      <DashboardContainer>
        <CardContainer>
          <Title>¡Bienvenido, {user.name}!</Title>
          <Text margin="1rem 0 0">
            Aquí tienes un resumen de tu bienestar emocional
          </Text>
        </CardContainer>

        <Grid>
          <CardContainer>
            <InfoCard>
              <Title order={2}>Seguimiento Emocional</Title>
              <Text>
                Registra tus emociones diarias y mantén un seguimiento de tu
                bienestar mental.
              </Text>
              <CardLink onClick={() => router.push("/emotions")}>
                Seguimiento de Emociones
              </CardLink>
            </InfoCard>
          </CardContainer>

          <CardContainer>
            <InfoCard>
              <Title order={2}>Recordatorios</Title>
              <Text>
                Configura recordatorios para actividades que mejoran tu salud
                mental.
              </Text>
              <CardLink onClick={() => router.push("/reminders")}>
                Sistemas de Recordatorios
              </CardLink>
            </InfoCard>
          </CardContainer>

          <CardContainer>
            <InfoCard>
              <Title order={2}>Compartir con Terapeuta</Title>
              <Text>
                Comparte tus datos de seguimiento emocional con tu terapeuta.
              </Text>
              <CardLink>Próximamente</CardLink>
            </InfoCard>
          </CardContainer>
        </Grid>

        <CardContainer>
          <Title order={2}>Estadísticas</Title>
          <Grid>
            <InfoCard>
              <EmotionChart
                data={
                  contextEmotionsSummary && contextEmotionsSummary[0]?.summary
                }
              />
            </InfoCard>

            <InfoCard>
              <CardStats>
                <StatsTitle order={4}>Emoción más frecuente</StatsTitle>
                <StatsValue order={1}>
                  {contextEmotionsSummary &&
                    emotionTranslation[
                      contextEmotionsSummary[0]?.mostFrequent?.emotion
                    ]}
                </StatsValue>
                <StatsText>
                  <b>Intensidad promedio:</b>{" "}
                  {contextEmotionsSummary &&
                    contextEmotionsSummary[0]?.mostFrequent?.averageIntensity}
                </StatsText>
                <StatsText>
                  <b>Número de veces:</b>{" "}
                  {contextEmotionsSummary &&
                    contextEmotionsSummary[0]?.mostFrequent?.count}
                </StatsText>
              </CardStats>
            </InfoCard>
          </Grid>
        </CardContainer>
      </DashboardContainer>
    </Layout>
  );
}
