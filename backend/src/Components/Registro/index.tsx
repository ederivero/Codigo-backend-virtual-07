import { FormEvent, useState } from 'react'
import { Typography, Paper, Avatar, FormControl, Input, InputLabel, makeStyles } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useHistory } from 'react-router-dom'
import { RegistroClass } from '../../Services/Registro/registro';
import Swal from 'sweetalert2'

const useStyles = makeStyles(theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing(1) * 3,
        marginRight: theme.spacing(1) * 3,
        [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 40px 30px 40px',
    },
    avatar: {
        margin: theme.spacing(0),
        backgroundColor: '#7A4CA5',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
}));

type TUsuario = {
    usuarioNombre: string,
    usuarioCorreo: string,
    usuarioPassword: string
}


const Registro = () => {

    const classes = useStyles()
    const history = useHistory()

    const [usuario, setUsuario] = useState<TUsuario>({
        usuarioCorreo: '',
        usuarioNombre: '',
        usuarioPassword: '',
    })

    const onSubmitFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        RegistroClass.registro(usuario).then(respuesta => {
            if (respuesta.success === true) {
                Swal.fire('Felicidades', 'Su cuenta fue creada correctamente', 'success')
                    .then(confirmar => {
                        if (confirmar.isConfirmed) {
                            history.push('/')
                        }
                    })
            } else {
                Swal.fire('Opps!', 'Parece que hubo un problema al crear su cuenta', 'error')
            }
        })
    }
    return (
        <div className="contenedor-general">
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Crear cuenta
                    </Typography>
                    <form className={classes.form} onSubmit={onSubmitFunction}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Nombre completo</InputLabel>
                            <Input id="name" name="name" autoComplete="off" autoFocus onChange={e => setUsuario({ ...usuario, usuarioNombre: e.target.value })} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Correo</InputLabel>
                            <Input id="email" name="email" autoComplete="off" onChange={e => setUsuario({ ...usuario, usuarioCorreo: e.target.value })} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="off" onChange={e => setUsuario({ ...usuario, usuarioPassword: e.target.value })} />
                        </FormControl>
                        <button type="submit" className="boton-submit">Registrarse</button>
                        <button type="button" className="boton-redireccionar" onClick={() => history.push('/')}>Iniciar sesión</button>
                    </form>
                </Paper>
            </main>
        </div>
    )
}

export { Registro }