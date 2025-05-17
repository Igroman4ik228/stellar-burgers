import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
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
import { checkUserAuth, getIngredients } from '@slices';
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

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleModalClose = () => navigate(-1);

  const feedNumber = useMatch('/feed/:number')?.params.number;

  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth());

    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
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
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <div className={styles.detailPageWrap}>
                <p
                  className={`${styles.detailHeader} text text_type_main-large`}
                >
                  orderNumber
                </p>
                <OrderInfo />
              </div>
            </ProtectedRoute>
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
              <ProtectedRoute>
                <Modal onClose={handleModalClose} title='#orderNumber'>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};
