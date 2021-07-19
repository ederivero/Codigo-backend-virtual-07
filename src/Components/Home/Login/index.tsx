import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Email from '@material-ui/icons/Email';
import { AuthClass } from '../../../Services/AuthServices';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        marginTop: theme.spacing(3)
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '100%',
    },
    marginBottom: {
        marginBottom: theme.spacing(2)
    }
}));

const Login = () => {

    const history = useHistory()
    const classes = useStyles()
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const _Auth = new AuthClass()

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const onSubmitFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        AuthClass.login(values).then(rpta => {
            if (rpta.success === true) {
                _Auth.guardarToken(rpta.content)
                history.push('/users')
            }
        })
    }

    return (
        <>
            <h2>Login in to Your Account</h2>
            <form onSubmit={onSubmitFunction}>
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                    <Input
                        id="standard-adornment-email"
                        type={'text'}
                        value={values.email}
                        onChange={handleChange('email')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    <Email />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField, classes.marginBottom)}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <div className="text-end mb-3">
                    <Link to="#!">Forgot Password?</Link>
                </div>
                <button className="login-log-in-button login-button">Log In</button>
                <button className="login-log-in-shopify-button login-button"><i className="fab fa-shopify"></i> Long in with Shopify</button>
            </form>
            <p>&#169; All Rights Reserved. StoreTasker Ltd. <br />Cookie Preferences. Privacy and Terms.</p>
        </>
    )
}

export { Login }