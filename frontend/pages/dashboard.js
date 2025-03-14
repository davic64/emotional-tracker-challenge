import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { CardContainer, Card, Title } from "../components/ui";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

export default function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  // Basic auth protection
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

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
              <CardLink>Próximamente</CardLink>
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
            <InfoCard>{/* Chart */}</InfoCard>

            <InfoCard>{/* Stats */}</InfoCard>
          </Grid>
        </CardContainer>
      </DashboardContainer>
    </Layout>
  );
}
