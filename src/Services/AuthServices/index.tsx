import { url } from '../../Enviroments'


class AuthClass {

    token: any;

    constructor() {
        this.token = ''
    }

    static async login(user: object) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        let config = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user)
        }
        let rpta = await fetch(`${url}/login`, config)
        let json = await rpta.json()
        return json;
    }

    static async logout(token: string) {
        let config = {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        let rpta = await fetch(`${url}/logout`, config)
        return rpta;
    }
    guardarToken(myToken: string) {
        this.token = myToken
        localStorage.setItem('zapateria-ts', myToken);
    }
    cerrarSesion() {
        localStorage.removeItem('zapateria-ts');
        this.token = null
    }
    estaLogeado() {
        if (localStorage.getItem('zapateria-ts')) {
            this.token = localStorage.getItem('zapateria-ts')
        }
        if (this.token) {
            try {
                let payload = this.token.split(".")[1];
                let payloadDecodificado = window.atob(payload);
                let payloadJSON = JSON.parse(payloadDecodificado);
                if (payloadJSON.exp > new Date().getTime() / 1000) return true;
                else {
                    this.cerrarSesion()
                    return false;
                }
            } catch (error) {
                this.cerrarSesion()
                return false;
            }
        }
        else return false;
    }
}
export { AuthClass }