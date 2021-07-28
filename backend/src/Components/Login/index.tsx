import { FormEvent, useState } from 'react'
import { Typography, Paper, Avatar, FormControl, Input, InputLabel, makeStyles } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useHistory } from 'react-router-dom'
import { LoginClass } from '../../Services/Login/login';

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
}));

type TLogin = {
    email: string,
    password: string
}

const Login = () => {


    const classes = useStyles()
    const history = useHistory()
    const _Auth = new LoginClass()

    const [usuario, setUsuario] = useState<TLogin>({
        email: '',
        password: ''
    })

    const onSubmitFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        LoginClass.login(usuario).then(respuesta => {
            if (respuesta.success === true) {
                _Auth.guardarToken(respuesta.content)
                history.push('/usuario/canales')
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
                        Iniciar Sesión
                    </Typography>
                    <form className={classes.form} onSubmit={onSubmitFunction}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Correo electrónico</InputLabel>
                            <Input id="email" name="email" autoComplete="off" autoFocus onChange={e => setUsuario({ ...usuario, email: e.target.value })} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Contraseña</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="off" onChange={e => setUsuario({ ...usuario, password: e.target.value })} />
                        </FormControl>
                        <button type="submit" className="boton-submit">Iniciar sesión</button>
                        <button type="button" className="boton-redireccionar" onClick={() => history.push('/registro')}>Registrar cuenta nueva</button>
                    </form>
                </Paper>
            </main>
        </div>
    )
}

export { Login }
