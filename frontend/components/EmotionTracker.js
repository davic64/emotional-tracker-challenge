import { useState, useContext } from "react";
import styled from "styled-components";
import { EmotionContext } from "../context/EmotionContext";
import {
  Button,
  InputGroup,
  Select,
  TextArea,
  CardContainer,
  Form,
} from "./ui";

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Range = styled.input`
  width: 100%;
`;

const EmotionTracker = () => {
  const [form, setForm] = useState({
    emotion: "neutral",
    intensity: 5,
    notes: "",
  });

  const { newEmotion, loading } = useContext(EmotionContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    newEmotion({
      emotion: form.emotion,
      intensity: Number(form.intensity),
      notes: form.notes,
    });

    // Reset form
    setForm({
      emotion: "neutral",
      intensity: 5,
      notes: "",
    });
  };

  return (
    <CardContainer title="¿Cómo te sientes hoy?">
      <Form onSubmit={handleSubmit}>
        <InputGroup label="Emoción">
          <Select
            id="emotion"
            name="emotion"
            value={form.emotion}
            onChange={handleChange}
          >
            <option value="happy">😊 Feliz</option>
            <option value="sad">😢 Triste</option>
            <option value="angry">😠 Enojado</option>
            <option value="anxious">😰 Ansioso</option>
            <option value="neutral">😐 Neutral</option>
          </Select>
        </InputGroup>

        <InputGroup label="Intensidad">
          <RangeContainer>
            <Range
              type="range"
              id="intensity"
              name="intensity"
              min="1"
              max="10"
              value={form.intensity}
              onChange={handleChange}
            />
            <RangeLabels>
              <span>Baja</span>
              <span>{form.intensity}</span>
              <span>Alta</span>
            </RangeLabels>
          </RangeContainer>
        </InputGroup>

        <InputGroup label="Notas">
          <TextArea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="¿Qué desencadenó esta emoción? ¿Algún pensamiento o reflexión?"
          />
        </InputGroup>

        <Button type="submit" disabled={loading || !form.notes}>
          {loading ? "Registrando..." : "Registrar Emoción"}
        </Button>
      </Form>
    </CardContainer>
  );
};

export default EmotionTracker;
