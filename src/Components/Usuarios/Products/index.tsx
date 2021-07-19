import { useState, useEffect } from 'react';
import { ProductsClass } from '../../../Services/Productos';

type TProds = {
    productoNombre: string,
    productoDescripcion: string,
    productoPrecio: string
}

const Products = () => {

    const [products, setProducts] = useState<Array<TProds>>([])
    const _Prods = new ProductsClass()
    const token = _Prods.get_token()

    useEffect(() => {
        ProductsClass.get_products(1, token).then(rpta => {
            if (rpta) {
                setProducts(rpta.data)
            }
        })
    }, [token])

    return (
        <div style={{ padding: '50px 300px 50px 50px' }}>
            <h2 className="mb-3">Products</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Product name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((data, i) =>
                            <tr key={i}>
                                <td>{data.productoNombre}</td>
                                <td>{data.productoDescripcion}</td>
                                <td>{data.productoPrecio}</td>
                                <td><button className="btn btn-success">Show</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export { Products }