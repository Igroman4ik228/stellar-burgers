import { userDataSelector } from '@selectors';
import { useSelector } from '@store';
import { AppHeaderUI } from '@ui';
import { FC } from 'react';

export const AppHeader: FC = () => {
  const user = useSelector(userDataSelector);

  const userName = user?.name || '';

  return <AppHeaderUI userName={userName} />;
};
