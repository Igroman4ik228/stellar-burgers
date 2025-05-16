import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { getIngredients } from '@slices';
import { useDispatch } from '@store';
import { useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleModalClose = () => navigate(-1);

  const feedNumber = useMatch('/feed/:number')?.params.number;

  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());

    // Авторизация
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {/* TODO: Protected */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/profile' element={<Profile />}>
          <Route path='orders' element={<ProfileOrders />} />
        </Route>

        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`${styles.detailHeader} text text_type_main-large`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`${styles.detailHeader} text text_type_main-large`}>
                {feedNumber?.padStart(6, '0')}
              </p>
              <OrderInfo />
            </div>
          }
        />
        {/* TODO: Protected */}
        <Route
          path='/profile/orders/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`${styles.detailHeader} text text_type_main-large`}>
                orderNumber
              </p>
              <OrderInfo />
            </div>
          }
        />

        <Route
          path='*'
          element={
            <div className={styles.detailPageWrap}>
              <NotFound404 />
            </div>
          }
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={handleModalClose} title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                onClose={handleModalClose}
                title={`#${feedNumber?.padStart(6, '0')}`}
              >
                <OrderInfo />
              </Modal>
            }
          />
          {/* TODO: Protected */}
          <Route
            path='/profile/orders/:number'
            element={
              <Modal onClose={handleModalClose} title='#orderNumber'>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
