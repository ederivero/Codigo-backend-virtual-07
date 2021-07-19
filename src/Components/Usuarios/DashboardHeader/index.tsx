import { FunctionComponent, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { AuthClass } from '../../../Services/AuthServices';
import { ProductsClass } from '../../../Services/Productos';
import Swal from 'sweetalert2';
import { UsersClass } from '../../../Services/Users';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: '8px 20px 8px 20px',
        cursor: 'pointer',
        fontWeight: 400,
    },
    hover: {
        "&:hover": {
            color: '#0075FF',
        }
    }

}))

type CardProps = {
    title: string
}

type TProfile = {
    usuarioNombre: string,
    url: string,
    usuarioId: number,
    usuarioCorreo: string,
    tipoId: number,
    imagenId: number
}

const DashboardHeader: FunctionComponent<CardProps> = ({ title }) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const _sAuth = new AuthClass()
    const _sToken = new ProductsClass()
    const token = _sToken.get_token()
    const [profile, setProfile] = useState<TProfile>({
        usuarioNombre: '',
        url: '',
        usuarioId: 0,
        usuarioCorreo: '',
        tipoId: 0,
        imagenId: 0
    })

    useEffect(() => {
        UsersClass.get_profile(token).then(rpta => {
            if (rpta.success === true) {
                setProfile(rpta.content)
            }
        })
    }, [token])

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const logOut = () => {
        AuthClass.logout(token).then(rpta => {
            if (rpta.ok === true) {
                _sAuth.cerrarSesion()
                window.location.href = "/"
            } else {
                Swal.fire({
                    title: 'Opps!',
                    text: 'Error al cerrar sesión',
                    icon: 'error'
                })
            }
        })
    }

    return (
        <>
            <div className="users-dashboard-content-header-flex users-dashboard-content-header-flex-10">{title}</div>
            <div className="users-dashboard-content-header-flex users-dashboard-content-header-flex-2">
                <span style={{ cursor: 'pointer' }} aria-describedby={id} onClick={handleClick}>
                    {profile.usuarioNombre} <i className="fas fa-chevron-down" style={{ marginLeft: '5px' }}></i>
                </span>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography className={clsx(classes.typography, classes.hover)} onClick={logOut}>Log Out</Typography>
                    <Typography className={clsx(classes.typography, classes.hover)}>Setting profile</Typography>
                    <Typography className={clsx(classes.typography, classes.hover)}>Type: {profile.tipoId === 1 ? 'ADMINISTRADOR' : 'VENDEDOR'}</Typography>
                </Popover>
            </div>
            <div className="users-dashboard-content-header-flex users-dashboard-content-header-flex-1">
                <Avatar alt="Cindy Baker" src={profile.url} />
            </div>
        </>
    )
}

export { DashboardHeader }