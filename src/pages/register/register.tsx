import {
  userRegisterErrorSelector,
  userRegisterIsLoadingSelector
} from '@selectors';
import { registerUser } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useSelector(userRegisterIsLoadingSelector);
  const error = useSelector(userRegisterErrorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !userName || !password) {
      return;
    }

    dispatch(
      registerUser({
        email: email,
        name: userName,
        password: password
      })
    );
  };

  if (isLoading) return <Preloader />;

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
