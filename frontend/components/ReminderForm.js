import { useState, useContext, useEffect } from "react";
import { Button, InputGroup, Select, Input, CardContainer, Form } from "./ui";
import { RemindersContext } from "../context/RemindersContext";

const ReminderForm = () => {
  const [form, setForm] = useState({
    title: "",
    time: "",
    category: "other",
  });

  const {
    newReminder,
    loading,
    reminderToEdit,
    setReminderToEdit,
    updateReminderContext,
  } = useContext(RemindersContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reminderToEdit) {
      updateReminderContext(reminderToEdit._id, form);
    } else {
      newReminder(form);
    }
    setReminderToEdit(null);
    setForm({ title: "", time: "", category: "other" });
  };

  useEffect(() => {
    if (reminderToEdit) {
      setForm(reminderToEdit);
    }
  }, [reminderToEdit]);

  return (
    <CardContainer title="Crear Recordatorio">
      <Form onSubmit={handleSubmit}>
        <InputGroup
          label="Título"
          name="title"
          value={form.title}
          onChange={handleChange}
        >
          <Input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ej. Recordatorio de terapia"
          />
        </InputGroup>
        <InputGroup
          label="Tiempo"
          name="time"
          value={form.time}
          onChange={handleChange}
        >
          <Input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup
          label="Categoría"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <Select name="category" value={form.category} onChange={handleChange}>
            <option value="exercise">Ejercicio</option>
            <option value="meditation">Meditación</option>
            <option value="food">Alimentación</option>
            <option value="sleep">Sueño</option>
            <option value="other">Otro</option>
          </Select>
        </InputGroup>
        <Button type="submit" disabled={loading}>
          {loading ? "Cargando..." : reminderToEdit ? "Guardar" : "Agregar"}
        </Button>
      </Form>
    </CardContainer>
  );
};

export default ReminderForm;
