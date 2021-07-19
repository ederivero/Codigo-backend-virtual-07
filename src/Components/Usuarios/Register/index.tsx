import { FormEvent, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { UsersClass } from '../../../Services/Users';
import { useHistory } from 'react-router';

const Register = () => {

    const history = useHistory();
    const [userTypes, setUserTypes] = useState([])
    const [img, setImg] = useState<any>()
    const [values, setValues] = useState({
        email: '',
        password: '',
        nombre: '',
        tipo: 0,
        imagenId: 0,
        showPassword: false,
    });

    useEffect(() => {
        UsersClass.get_userTypes().then(rpta => {
            if (rpta.success === true) {
                setUserTypes(rpta.content)
            }
        })
    }, [])

    const handleChange = (event: any) => {
        if (event.target.name === "tipo") {
            setValues({ ...values, [event.target.name]: parseInt(event.target.value) });
        } else {
            setValues({ ...values, [event.target.name]: event.target.value });
        }
    };

    const prueba = (event: any) => {
        setImg(event.target.files[0])
    }

    const onSubmitFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            UsersClass.post_img(img).then(rpta => {
                if (rpta.success === true) {
                    let valores = {
                        ...values,
                        imagenId: rpta.content.imagenId
                    }
                    UsersClass.post_user(valores).then(rpta => {
                        if (rpta.success === true) {
                            Swal.fire({ title: 'Perfect!', text: 'User created successfully', icon: 'success' })
                            setValues({ ...values, email: '', password: '', nombre: '', tipo: 0, imagenId: 0, showPassword: false, })
                            history.push('/users/products')
                        } else {
                            Swal.fire({ title: 'Opps!', text: 'Error creating user', icon: 'error' })
                        }
                    })
                }
            })
        } catch (error) {
            Swal.fire({ title: 'Opps!', text: error + 'Image upload error', icon: 'error' })
            return false
        }
    }

    return (
        <div style={{ padding: '50px 300px 50px 50px' }}>
            <h2>Create a new account</h2>
            <form onSubmit={onSubmitFunction}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Username</label>
                    <input type="text" className="form-control" name="nombre" id="nombre" onChange={handleChange} />
                </div>
                <div className="row mb-3">
                    <div className="col-sm-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" id="email" onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="password" onChange={handleChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-6">
                        <label className="form-label" htmlFor="tipo">User type</label>
                        <select className="form-select" name="tipo" id="tipo" value={values.tipo} onChange={handleChange}>
                            <option value={0} hidden disabled>-- select --</option>
                            {
                                userTypes.map((data: any, i) => <option key={i} value={data.tipoId}>{data.tipoDescripcion}</option>)
                            }
                        </select>
                    </div>
                    <div className="col-sm-6">
                        <label className="form-label" htmlFor="avatar">Photo</label>
                        <input className="form-control" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={prueba} />
                    </div>
                </div>
                <button className="btn btn-success mt-4">Create Account</button>
            </form>
        </div>
    )
}

export { Register }