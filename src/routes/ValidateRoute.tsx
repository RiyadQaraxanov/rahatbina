import { Navigate, type RouteProps } from "react-router-dom";
import { useUser } from "@/store/useUserStore";

type Props = {
    component: React.FC<RouteProps>
}

const ValidateRoute: React.FC<Props> = ({ component: Component }) => {
 
    const { user} = useUser(state=>state);
    const isAuthenticated = !user?.educationLevel?true:false;

    // Your authentication logic goes here...
 
    return isAuthenticated ? <Component /> : <Navigate to="/dashboard" />;
};
export default ValidateRoute;
