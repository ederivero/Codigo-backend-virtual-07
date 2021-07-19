import { url } from '../../Enviroments'

class UsersClass {
    static async get_userTypes() {
        let rpta = await fetch(`${url}/tipos`)
        let json = await rpta.json()
        return json;
    }

    static async post_img(img: any) {
        let formData = new FormData()
        formData.append('imagen', img)

        let config = {
            method: 'POST',
            body: formData
        }
        let rpta = await fetch(`${url}/subirImagen?carpeta=prueba`, config)
        let json = await rpta.json()
        return json;
    }

    static async post_user(objUser: object) {
        let misHeaders = new Headers();
        misHeaders.append("Content-Type", "application/json")
        let config = {
            method: 'POST',
            headers: misHeaders,
            body: JSON.stringify(objUser)
        }
        let rpta = await fetch(`${url}/registro`, config)
        let json = await rpta.json()
        return json;
    }

    static async get_profile(token: string) {
        let misHeaders = new Headers();
        misHeaders.append("Authorization", `Bearer ${token}`)
        let config = {
            method: 'GET',
            headers: misHeaders,
        }
        let rpta = await fetch(`${url}/perfil`, config)
        let json = await rpta.json()
        return json;
    }
}
export { UsersClass }