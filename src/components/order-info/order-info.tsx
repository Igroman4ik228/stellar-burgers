import {
  ingredientsDataSelector,
  ordersDataByNumberSelector
} from '@selectors';
import { TIngredient } from '@utils-types';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { getOrderByNumber } from '@slices';
import { useDispatch, useSelector } from '@store';
import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui/preloader';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();

  const parsedNumber = Number(number);

  const ingredients = useSelector(ingredientsDataSelector);
  const orderData = useSelector(ordersDataByNumberSelector(parsedNumber));

  useEffect(() => {
    if (!orderData) dispatch(getOrderByNumber(parsedNumber));
  }, [dispatch, parsedNumber, orderData]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date: new Date(orderData.createdAt),
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
