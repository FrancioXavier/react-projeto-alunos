import React, { useEffect, useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import axios from '../../services/axios';
import { ProfilePicture, StudentContainer } from './styled';
import { get } from 'lodash';

export default function Students() {
  const [students, setStudent] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      setStudent(response.data);
    }

    getData();
  }, []);
  return (
    <Container>
      <h1>Alunos</h1>

      <StudentContainer>
        {students.map((student) => (
          <div key={String(student.id)}>
            <ProfilePicture>
              {get(student, 'Fotos[0].url', '') ? (
                <img src={student.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <spam>{student.nome} </spam>
            <spam>{student.email}</spam>

            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link to={`/student/${student.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
