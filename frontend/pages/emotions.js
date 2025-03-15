import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../components/Layout";
import EmotionTracker from "../components/EmotionTracker";
import EmotionHistory from "../components/EmotionHistory";
import { AuthContext } from "../context/AuthContext";
import { EmotionContext } from "../context/EmotionContext";
import { getEmotions } from "../lib/emotions.api";

const EmotionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
`;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  try {
    const data = await getEmotions(token);
    return { props: { emotions: data } };
  } catch (error) {
    console.error(error);
    return { props: { emotions: [] } };
  }
}

export default function Emotions({ emotions }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const { setInitialEmotions, emotions: contextEmotions } =
    useContext(EmotionContext);

  // Basic auth protection
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    setInitialEmotions(emotions);
  }, [emotions]);

  if (loading || !user) {
    return (
      <Layout title="Emociones - Terapia Emocional">
        <p>Cargando...</p>
      </Layout>
    );
  }

  return (
    <Layout title="Emociones - Terapia Emocional">
      <EmotionsContainer>
        <Title>Seguimiento Emocional</Title>

        <EmotionTracker />
        <EmotionHistory emotions={contextEmotions} />

        {/* TODO: Add functionality to share emotions with therapist */}
      </EmotionsContainer>
    </Layout>
  );
}
