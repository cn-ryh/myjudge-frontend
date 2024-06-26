import { getCookie } from "@/cookie";

class ICurrectUser {
    get uid() {
        return +getCookie(`uid`);
    }
    get token() {
        return getCookie(`token`);
    }
}
const currectUser: ICurrectUser = new ICurrectUser();
export { currectUser }