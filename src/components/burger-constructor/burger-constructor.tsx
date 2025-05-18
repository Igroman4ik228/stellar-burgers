import { constructorSelector, userDataSelector } from '@selectors';
import { clearConstructor, orderBurger } from '@slices';
import { useDispatch, useSelector } from '@store';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = useSelector(constructorSelector);
  const user = useSelector(userDataSelector);

  const [orderRequest, setOrderRequest] = useState(false);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    setOrderRequest(true);

    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];

    const newOrderData = await dispatch(orderBurger(ingredients)).unwrap();
    dispatch(clearConstructor());

    setOrderModalData(newOrderData);
    setOrderRequest(false);
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
