import { url } from '../../Enviroments'

class MovimientosClass {

    static async get_movimientos() {
        let token = localStorage.getItem('zapateria-ts')
        let config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer" + token
            }
        }
        let rpta = await fetch(`${url}/movimientos`, config)
        let json = await rpta.json()
        return json;
    }

    static async post_productos(objProd: object, token: string) {
        let misHeaders = new Headers();
        misHeaders.append("Content-Type", "application/json")
        misHeaders.append("Authorization", `Bearer ${token}`)
        let config = {
            method: 'POST',
            headers: misHeaders,
            body: JSON.stringify(objProd)
        }
        let rpta = await fetch(`${url}/productos`, config)
        let json = await rpta.json()
        return json;
    }

    static async post_movimiento(objMov: object, token: string) {
        let misHeaders = new Headers();
        misHeaders.append("Content-Type", "application/json")
        misHeaders.append("Authorization", `Bearer ${token}`)
        let config = {
            method: 'POST',
            headers: misHeaders,
            body: JSON.stringify(objMov)
        }
        let rpta = await fetch(`${url}/movimientos`, config)
        let json = await rpta.json()
        return json;
    }
}

export { MovimientosClass }