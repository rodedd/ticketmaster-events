import { useRouteError } from 'react-router-dom';
import styles from './Error404.module.css';

const Error404 = () => {
  const error = useRouteError();

  console.log(error);

  return (
    <div>
      <h3>Error 404</h3>
      <p>{error.data || error.status}</p>
    </div>
  );
};

export default Error404;