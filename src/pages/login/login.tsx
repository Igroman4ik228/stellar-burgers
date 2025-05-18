import { userLoginErrorSelector, userLoginIsLoadingSelector } from '@selectors';
import { loginUser } from '@slices';
import { useDispatch } from '@store';
import { Preloader } from '@ui';
import { LoginUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useSelector(userLoginIsLoadingSelector);
  const error = useSelector(userLoginErrorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    dispatch(
      loginUser({
        email: email,
        password: password
      })
    );
  };

  if (isLoading) return <Preloader />;

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
