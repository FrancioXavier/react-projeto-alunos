import React, { useEffect, useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import axios from '../../services/axios';
import { ProfilePicture, StudentContainer } from './styled';
import { get } from 'lodash';

import Loading from '../../components/Loading';
import history from '../../services/history';
import { toast } from 'react-toastify';

export default function Students() {
  const [students, setStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setStudent(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = (e, studentId) => {
    try {
      e.target.parentElement.remove();
      history.push(`/student/${studentId}/delete`);
    } catch (error) {
      const errors = get(error, 'response.data.errors', []);

      errors.map((err) => toast.error(err));
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

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

            <span>{student.nome} </span>
            <span>{student.email}</span>

            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link onClick={handleDeleteAsk} to={`#`}>
              {/* /student/${student.id}/delete */}
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, student.id)}
            />
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
