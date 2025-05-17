import { userDataSelector } from '@selectors';
import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { useSelector } from 'react-redux';

export const AppHeader: FC = () => {
  const user = useSelector(userDataSelector);

  return <AppHeaderUI userName={(user && user.name) || ''} />;
};
