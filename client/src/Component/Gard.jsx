import { Navigate } from 'react-router-dom';

export default function Gard({ children }) {
  if (!JSON.parse(localStorage.getItem('questions'))) {
    return <Navigate to={'/'} />;
  } else {
    return children;
  }
}
