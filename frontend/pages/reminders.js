import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import ReminderForm from "../components/ReminderForm";
import ReminderHistory from "../components/ReminderHistory";
import { getReminders } from "../lib/reminders.api";
import { RemindersContext } from "../context/RemindersContext";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

const RemindersContainer = styled.div`
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
    const reminders = await getReminders(token);
    return { props: { reminders } };
  } catch (error) {
    console.error(error);
    return { props: { reminders: [] } };
  }
}

export default function Reminders({ reminders }) {
  const { setInitialReminders, reminders: contextReminders } =
    useContext(RemindersContext);
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  // Basic auth protection
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    setInitialReminders(reminders);
  }, [reminders]);

  if (loading || !user) {
    return (
      <Layout title="Recordatorios - Terapia Emocional">
        <p>Cargando...</p>
      </Layout>
    );
  }

  return (
    <Layout title="Recordatorios - Terapia Emocional">
      <RemindersContainer>
        <Title>Recordatorios</Title>

        <ReminderForm />
        <ReminderHistory reminders={contextReminders} />
      </RemindersContainer>
    </Layout>
  );
}
