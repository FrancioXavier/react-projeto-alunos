import { get } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { Container } from '../../styles/GlobalStyles';
import * as actions from './../../store/modules/auth/actions';

export default function Student(props) {
  const dispatch = useDispatch();
  const pathName = get(props, 'location.pathname', '');
  const isLoading = useSelector((state) => state.auth.isLoading);
  const studentId = get(props, 'match.params.id', null);

  if (pathName.includes('delete')) {
    dispatch(actions.studentDelete({ studentId }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Student</h1>
    </Container>
  );
}
