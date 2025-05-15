import { jwtDecode } from "jwt-decode";
import Cookie from "../storage";
import { AuthConfig } from "../../config/auth";

export const decodedToken = () => {
    const token = Cookie.get(AuthConfig.access_token);
    if (!token) {
        console.error('Token bulunamadı');
        return null;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken as any;
}
