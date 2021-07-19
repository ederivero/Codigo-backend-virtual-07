import { url } from '../../Enviroments'


class ProductsClass {

    token: string | any;
    constructor() {
        this.token = ''
    }

    static async get_products(page: number, token:string) {
        let config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        let rpta = await fetch(`${url}/productos?pagina=${page}&porPagina=10`, config)
        let json = await rpta.json()
        return json;
    }

    get_token(){
        let tokenStorage = localStorage.getItem('zapateria-ts')
        if (tokenStorage) {
            this.token = localStorage.getItem('zapateria-ts')
            if(this.token) return this.token
        }
    }
}

export { ProductsClass }