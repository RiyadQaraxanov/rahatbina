import { Navigate } from 'react-router-dom';
import { decodedToken } from '@/lib/utils/jwt';
import { notAllowedRoles } from '@/lib/utils/roles';

// ProtectedRoute bileşeni
const ProtectedRoute = ({ Component: Component }:any) => {

  const userRole = decodedToken().role;
  if (notAllowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Component />;

};

export default ProtectedRoute;
