import { useState, FormEvent, useEffect } from 'react';
import { MovimientosClass } from '../../../Services/Movimientos';
import NumberFormat from 'react-number-format';
import { ProductsClass } from '../../../Services/Productos';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

interface IProducto {
    productoNombre: string,
    productoPrecio: number | any,
    productoDescripcion: string,
    cantidad: number | any
}
interface Imovimiento {
    movimientoFecha: string,
    movimientoTipo: string,
    movimientoDetalle: Array<any>
}
type TElemento = {
    target: {
        name: string,
        value: string
    }
}


const Movimientos = () => {

    const _sToken = new ProductsClass();
    const token = _sToken.get_token()
    const history = useHistory();
    const [movimiento, setMovimiento] = useState<Imovimiento>({
        movimientoFecha: "2021-07-12 20:38",
        movimientoTipo: "EGRESO",
        movimientoDetalle: []
    })
    const [allProds, setAllProds] = useState<Array<IProducto>>([])
    const [producto, setProducto] = useState<IProducto>({
        productoNombre: "",
        productoPrecio: 0,
        productoDescripcion: "",
        cantidad: 0
    })

    const handleChange = (event: TElemento) => {
        setProducto({ ...producto, [event.target.name]: event.target.value });
    };

    useEffect(() => {

    }, [allProds])

    const onSubmitFunction = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setAllProds(allProds => [...allProds, producto]);
    }

    const POST_movimiento = () => {
        allProds.forEach(data => {
            try {
                MovimientosClass.post_productos(data, token).then(rpta => {
                    if (rpta.success === true) {
                        let detalle = movimiento.movimientoDetalle
                        detalle.push({
                            detalleMovimientoCantidad: data.cantidad,
                            detalleMovimientoPrecio: data.productoPrecio * data.cantidad,
                            productoId: rpta.content.productoId
                        })
                        setMovimiento({ ...movimiento, movimientoDetalle: detalle })
                    }
                })
            } catch (error) {
                console.log(error.message)
            }
        })
        MovimientosClass.post_movimiento(movimiento, token).then(rpta => {
            if (rpta.success) {
                Swal.fire({ title: 'Perfect!', text: 'saved correctly', icon: 'success' })
                history.push('/users/products')
            }
            else Swal.fire({ title: 'Opps!', text: 'There was an unexpected error.', icon: 'error' })
        })
    }

    return (
        <div style={{ padding: '50px 300px 50px 50px' }}>
            <h2 className="mb-3">Add products</h2>
            <form onSubmit={onSubmitFunction}>
                <div className="row mb-3">
                    <div className="col-sm-6">
                        <label htmlFor="productoNombre" className="form-label">Product name</label>
                        <input className="form-control" type="text" name="productoNombre" id="productoNombre" onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="productoDescripcion" className="form-label">Description</label>
                        <input className="form-control" type="text" name="productoDescripcion" id="productoDescripcion" onChange={handleChange} />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-sm-6">
                        <label htmlFor="cantidad" className="form-label">Amount</label>
                        <NumberFormat className="form-control" name="cantidad" id="cantidad" suffix={' uds.'} thousandSeparator={true} onValueChange={e => setProducto({ ...producto, cantidad: e.floatValue })} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="productoPrecio" className="form-label">Price</label>
                        <NumberFormat className="form-control" name="productoPrecio" id="productoPrecio" prefix={'$ '} thousandSeparator={true} onValueChange={e => setProducto({ ...producto, productoPrecio: e.floatValue })} />
                    </div>
                </div>
                <button className="btn btn-primary mb-4" hidden>Add product</button>
            </form>
            <h2>List of products and details</h2>
            <table className="table table-hover mb-4 mt-4">
                <thead>
                    <tr>
                        <th scope="col">Product name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProds.map((data, i) =>
                            <tr key={i}>
                                <td>{data.productoNombre}</td>
                                <td>{data.productoDescripcion}</td>
                                <td>{data.cantidad}</td>
                                <td>{data.productoPrecio}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button className="btn btn-success" onClick={POST_movimiento}>Save movement</button>
        </div>
    )
}

export { Movimientos }