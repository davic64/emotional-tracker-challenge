import styled from "styled-components";
import { Card, CardContainer, Empty } from "./ui";
import { CheckIcon, PencilIcon, TrashIcon } from "./icons";
import { useContext } from "react";
import { RemindersContext } from "../context/RemindersContext";

const categoriesColors = {
  exercise: "#2ecc71",
  meditation: "#3498db",
  food: "#9b59b6",
  sleep: "#f1c40f",
  other: "#7f8c8d",
};

const ReminderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReminderCard = styled(Card)`
  padding: 1rem;
  border: 1px solid #dbdbdb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReminderBadge = styled.div`
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  background-color: ${({ typeReminder }) => categoriesColors[typeReminder]};
  padding: 0.2rem 0.5rem;
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReminderTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: ${({ isChecked }) => (isChecked ? "#7f8c8d" : "#000000")};
  text-decoration: ${({ isChecked }) => (isChecked ? "line-through" : "none")};
`;

const ReminderTime = styled.p`
  font-size: 0.8rem;
  color: #7f8c8d;
  margin: 0;
  text-decoration: ${({ isChecked }) => (isChecked ? "line-through" : "none")};
`;

const ReminderCardContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "center"};
  gap: ${({ gap }) => gap || "0.5rem"};
`;

const CheckIconStyled = styled(CheckIcon)`
  color: ${({ isChecked }) => (isChecked ? "#2ecc71" : "#7f8c8d")};
`;

const ButtonCard = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  padding: 0.7rem;
  background-color: ${({ isChecked }) =>
    isChecked ? "#2ecc7130" : "transparent"};

  &:hover {
    background-color: #f5f5f5;

    ${CheckIconStyled} {
      color: #2c3e50;
    }
  }
`;

const translateCategory = {
  exercise: "Ejercicio",
  meditation: "Meditación",
  food: "Alimentación",
  sleep: "Sueño",
  other: "Otro",
};

const ReminderHistory = ({ reminders }) => {
  const {
    loading,
    deleteReminderContext,
    updateReminderContext,
    setReminderToEdit,
  } = useContext(RemindersContext);

  const handleCompleteReminder = (reminderId, completed) => {
    updateReminderContext(reminderId, { completed });
  };

  const handleEditReminder = (reminder) => {
    setReminderToEdit(reminder);
  };

  const handleDeleteReminder = (reminderId) => {
    deleteReminderContext(reminderId);
  };

  return (
    <CardContainer title="Recordatorios de Bienestar">
      {loading ? (
        <p>Cargando...</p>
      ) : reminders.length === 0 ? (
        <Empty message="No hay recordatorios registrados aún. ¡Comienza a crear recordatorios arriba!" />
      ) : (
        <ReminderList>
          {reminders.map((reminder) => (
            <ReminderCard>
              <ReminderCardContainer gap="1rem">
                <ButtonCard
                  onClick={() =>
                    handleCompleteReminder(reminder._id, !reminder.completed)
                  }
                  isChecked={reminder.completed}
                >
                  <CheckIconStyled isChecked={reminder.completed} />
                </ButtonCard>
                <ReminderCardContainer direction="column" align="flex-start">
                  <ReminderBadge typeReminder={reminder.category}>
                    {translateCategory[reminder.category]}
                  </ReminderBadge>
                  <ReminderTitle isChecked={reminder.completed}>
                    {reminder.title}
                  </ReminderTitle>
                  <ReminderTime isChecked={reminder.completed}>
                    {reminder.time}
                  </ReminderTime>
                </ReminderCardContainer>
              </ReminderCardContainer>
              <ReminderCardContainer>
                <ButtonCard onClick={() => handleEditReminder(reminder)}>
                  <PencilIcon />
                </ButtonCard>
                <ButtonCard
                  onClick={() => handleDeleteReminder(reminder._id)}
                  disabled={loading}
                >
                  <TrashIcon />
                </ButtonCard>
              </ReminderCardContainer>
            </ReminderCard>
          ))}
        </ReminderList>
      )}
    </CardContainer>
  );
};

export default ReminderHistory;
