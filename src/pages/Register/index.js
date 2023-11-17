import React, { useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import axios from '../../services/axios';
import history from '../../services/history';
import { get } from 'lodash';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (formErrors) return;

    try {
      await axios.post('/users/', {
        nome: name,
        password: password,
        email: email,
      });

      toast.success('Você fez seu cadastro!');
      history.push('/login');
    } catch (error) {
      const errors = get(error, 'response.data.errors');
      errors.map((e) => toast.error(e));
    }
  }

  return (
    <Container>
      <h1>Crie sua conta</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <button type="submit">Criar conta</button>
      </Form>
    </Container>
  );
}
