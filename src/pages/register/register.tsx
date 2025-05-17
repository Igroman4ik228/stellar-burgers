import { registerUser } from '@slices';
import { useDispatch } from '@store';
import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';

export const Register: FC = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      registerUser({
        email: email,
        name: userName,
        password: password
      })
    );
  };

  return (
    <RegisterUI
      errorText=''
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
