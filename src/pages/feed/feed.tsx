import { feedSelector } from '@selectors';
import { getFeed } from '@slices';
import { useDispatch } from '@store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector(feedSelector);

  const handleGetFeeds = () => dispatch(getFeed());

  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  if (isLoading) return <Preloader />;

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
