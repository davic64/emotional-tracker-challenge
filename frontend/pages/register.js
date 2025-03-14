import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import {
  CardContainer,
  Form,
  InputGroup,
  Button,
  Input,
} from "../components/ui";

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #3498db;
    text-decoration: underline;
  }
`;

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register } = useContext(AuthContext);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data?.message || "Unknown error"
      );
      alert("Failed to register");
    }
  };

  return (
    <Layout title="Registro - Terapia Emocional">
      <CardContainer maxWidth="500px" style={{ margin: "2rem auto" }}>
        <Title>Crear una Cuenta</Title>

        <Form onSubmit={handleSubmit}>
          <InputGroup label="Nombre">
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Escribe tu nombre"
              required
            />
          </InputGroup>

          <InputGroup label="Correo Electrónico">
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@ejemplo.com"
              required
            />
          </InputGroup>

          <InputGroup label="Contraseña">
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </InputGroup>

          <InputGroup label="Confirmar Contraseña">
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </InputGroup>

          <Button type="submit">Registrarse</Button>
        </Form>

        <LinkText>
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login">
            <a>Inicia Sesión</a>
          </Link>
        </LinkText>
      </CardContainer>
    </Layout>
  );
}
