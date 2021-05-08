import http from '../utils/http'
import router from '../router'
import store from '../store'
import { SET_INFO } from '../store/moustation-type'
export default {
    login: (Obj, message) => {
        http("login", Obj, "POST").then(({ meta: { msg }, data: { token, username } }) => {

            message({
                type: "success",
                message: msg
            });

            store.commit(SET_INFO, {
                token,
                username,
            })

            router.push({
                name: "home"
            });
            /* store.commit(SET_INFO,{
                username:res.data.username,
             
            }) */
        });
    },
    async getMenus() {
        const res = await http("menus", null, "GET")
        return res.data
    },
    async getUserlist(Obj) {
        const res = await http("users", null, "GET", Obj)
        return res.data
    },
    async removeUser(id) {

        const res = await http(`users/${id}`, null, "delete")

        return res
    },
    async adduser(obj) {
        const res = await http("users", obj, "POST")
        return res
    },
    async changeState(state, id) {
        const res = await http(`users/${id}/state/${state}`, null, "PUT")
        return res
    },
    async editting(id, obj) {
        const res = await http(`users/${id}`, obj, "PUT")
        return res
    },
    async roleuser(id, body) {
        const res = await http(`users/${id}/role`, body, "PUT")
        return res
    },
    async rid(id) {
        const res = await http('users/' + id, null, 'GET')
        return res
    }

}



