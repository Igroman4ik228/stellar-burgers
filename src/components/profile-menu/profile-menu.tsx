import { logoutUser } from '@slices';
import { useDispatch } from '@store';
import { ProfileMenuUI } from '@ui';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
