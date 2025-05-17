import { AppHeader } from '@components';
import { checkUserAuth, getIngredients } from '@slices';
import { useDispatch } from '@store';
import { FC, useEffect } from 'react';
import '../../index.css';
import { RoutesComponent } from '../routes';
import styles from './app.module.css';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());

    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <RoutesComponent />
    </div>
  );
};
