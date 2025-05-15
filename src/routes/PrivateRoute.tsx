import { Navigate, type RouteProps } from "react-router-dom";
import Cookie from "js-cookie";
import { AuthConfig } from "@/lib/config/auth";

type Props = {
    component: React.FC<RouteProps>
}

const PrivateRoute: React.FC<Props> = ({ component: Component }) => {
 
    const isAuthenticated = Cookie.get(AuthConfig.access_token);
 
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;
