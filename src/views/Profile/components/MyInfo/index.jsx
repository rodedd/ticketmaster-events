import { useForm } from "react-hook-form";

import styles from './MyInfo.module.css';
import { useEffect } from "react";

const USER_DATA = 'userData';

const MyInfo = () => {
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem(USER_DATA)) || [];
      setValue('name', userData?.name);
      setValue('email', userData?.email);
      setValue('age', userData?.age);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmitForm = (data) => {
    try {
      localStorage.setItem(USER_DATA, JSON.stringify(data));
      alert('Usuario actualizado');
    } catch (error) {
      alert('Ha ocurrido un error' + error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.form}>
      <label className={styles.label}>
        Name
        <input type="text" {...register('name', { required: true, minLength: 1, max: 120 })} />
      </label>
      <label className={styles.label}>
        Email
        <input type="text" {...register('email', { required: true, minLength: 1, max: 200})} />
      </label>
      <label className={styles.label}>
        Age
        <input
          type="number" 
          {...register('age', { required: true, min: 1, max: 99, valueAsNumber: true })} 
        />
      </label>
      <button type="submit">
        Save
      </button>
    </form>
  );
}

export default MyInfo;