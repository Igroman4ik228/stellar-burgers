import { isAuthCheckedSelector, userDataSelector } from '@selectors';
import { useSelector } from '@store';
import { Preloader } from '@ui';
import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}) => {
  const location = useLocation();

  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userDataSelector);

  if (!isAuthChecked) return <Preloader />;

  if (!onlyUnAuth && !user)
    return <Navigate replace to='/login' state={{ from: location }} />;

  if (onlyUnAuth && user)
    return <Navigate replace to={location.state?.from || { pathname: '/' }} />;

  return children;
};
