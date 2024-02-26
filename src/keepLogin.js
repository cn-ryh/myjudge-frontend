import axios from "axios";
import { ip } from "./ip";
import { getDataByKey, openDB } from "./indexdb.mjs";
class UserLoginData {
    uid = 0;
    logined = false;
    admin = false;
    token = ``;
    constructor(uid = 0, logined = false, admin = false, token = ``) {
        this.uid = uid;
        this.logined = logined;
        this.admin = admin;
        this.token = token;
    }
}
/**
 * 
 * @returns {Promise<UserLoginData>}
 */
async function keepLogin() {
    return new Promise((resolve, reject) => {
        openDB("frontendData", "frontendData", 1).then((db) => {
            getDataByKey(db, "frontendData", "user").then((res) => {
                if (!res) {
                    resolve(new UserLoginData());
                    return;
                }
                let uid = res.uid
                let usertoken = res.token
                if (uid == `` || usertoken == ``) {
                    resolve(new UserLoginData());
                }
                axios.post(`${ip}/keepLogin`, {
                    uid: uid,
                    usertoken: usertoken
                }).then((res) => {
                    if (res.data.logined == true) {
                        resolve(new UserLoginData(uid, true, res.data.admin, usertoken))
                    }
                    else {
                        resolve(new UserLoginData())

                    }
                    // logined = res.data.log;
                })
            })
        })
    })
}
export { keepLogin }
