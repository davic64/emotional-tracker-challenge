import { useState, useContext } from "react";
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

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || "Unknown error"
      );
      alert("Failed to login");
    }
  };

  return (
    <Layout title="Iniciar Sesión - Terapia Emocional">
      <CardContainer maxWidth="500px" style={{ margin: "2rem auto" }}>
        <Title>Inicia Sesión en tu Cuenta</Title>

        <Form onSubmit={handleSubmit} gap="1.5rem">
          <InputGroup label="Correo Electrónico">
            <Input
              type="email"
              placeholder="email@ejemplo.com"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup label="Contraseña">
            <Input
              type="password"
              placeholder="••••••••"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <Button type="submit">Iniciar Sesión</Button>
        </Form>

        <LinkText>
          ¿No tienes una cuenta?{" "}
          <Link href="/register">
            <a>Regístrate</a>
          </Link>
        </LinkText>
      </CardContainer>
    </Layout>
  );
}
