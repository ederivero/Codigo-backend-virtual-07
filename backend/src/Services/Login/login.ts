import { url } from '../../Enviroments'

class LoginClass {

    token: any;

    constructor() {
        this.token = ''
    }

    static async login(objUser: object) {
        let misHeaders = new Headers();
        misHeaders.append("Content-Type", "application/json")
        let config = {
            method: 'POST',
            headers: misHeaders,
            body: JSON.stringify(objUser)
        }
        let rpta = await fetch(`${url}/api/login`, config)
        let json = await rpta.json()
        return json;
    }

    guardarToken(myToken: string) {
        this.token = myToken
        localStorage.setItem('chat-socket-ts', myToken);
    }
    cerrarSesion() {
        localStorage.removeItem('chat-socket-ts')
        this.token = null
    }
    estaLogeado() {
        if (localStorage.getItem('chat-socket-ts')) {
            this.token = localStorage.getItem('chat-socket-ts')
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
    obtenerToken() {
        if (localStorage.getItem('chat-socket-ts')) {
            this.token = localStorage.getItem('chat-socket-ts')
            if (this.token) {
                let payload = this.token.split(".")[1];
                let payloadDecodificado = window.atob(payload);
                let payloadJSON = JSON.parse(payloadDecodificado);
                return payloadJSON
            }
        }
    }
}

export { LoginClass }