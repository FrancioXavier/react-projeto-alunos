import React from 'react';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import { Title, Paragraph } from './styled';

export default function Login() {
  toast.success('OPA, DEU CERTO');
  return (
    <Container>
      <Title>
        Login
        <small>Oie</small>
      </Title>
      <Paragraph>Lorem</Paragraph>
      <button type="button">Enviar</button>
    </Container>
  );
}
