import {
  userDataSelector,
  userUpdateErrorSelector,
  userUpdateIsLoadingSelector
} from '@selectors';
import { updateUser } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Preloader } from '@ui';
import { ProfileUI } from '@ui-pages';
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(userDataSelector);
  const updateIsLoading = useSelector(userUpdateIsLoadingSelector);
  const updateError = useSelector(userUpdateErrorSelector);

  const userName = user?.name || '';
  const userEmail = user?.email || '';
  const initFormValueState = {
    name: userName,
    email: userEmail,
    password: ''
  };

  const [formValue, setFormValue] = useState(initFormValueState);

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: userName,
      email: userEmail
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== userName ||
    formValue.email !== userEmail ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password
      })
    );
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue(initFormValueState);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (updateIsLoading) return <Preloader />;

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateError || ''}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
