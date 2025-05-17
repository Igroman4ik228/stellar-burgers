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
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userDataSelector);
  const location = useLocation();

  if (!isAuthChecked) return <Preloader />;

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
