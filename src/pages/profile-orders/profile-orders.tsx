import { ordersDataSelector, ordersIsLoadingSelector } from '@selectors';
import { getOrders } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(ordersDataSelector);
  const isLoading = useSelector(ordersIsLoadingSelector);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (isLoading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
