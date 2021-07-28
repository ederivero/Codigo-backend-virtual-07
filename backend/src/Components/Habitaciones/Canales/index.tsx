import { useState, useRef, useEffect, FormEvent } from "react";
import io, { Socket } from 'socket.io-client';
import { url } from '../../../Enviroments';
import { LoginClass } from "../../../Services/Login/login";

interface IMsjs {
    cuartoId: number,
    fecha: string,
    mensajeId: number,
    mensajeTexto: string,
    usuario: {
        usuarioNombre: string,
        usuarioOnline: boolean
    }
}

let socket: Socket;

const Canales = () => {

    const _Auth = new LoginClass()
    const userObj = _Auth.obtenerToken()
    const [mensaje, setMensaje] = useState<string>('')
    const [mensajes, setMensajes] = useState<Array<IMsjs>>([])
    const [bandera, setBandera] = useState<boolean>(false)
    const [canal, setCanal] = useState<number>(0)
    const areaMensajeRef = useRef<HTMLHeadingElement>(null)

    useEffect((): void => { scrollBottom() }, [mensajes])

    useEffect((): void => {
        socket = io(url)
        socket.on('emitir-mensajes', (mnsjs: { mensajes: Array<IMsjs> }): void => { setMensajes(mnsjs.mensajes) })
    }, [bandera])

    useEffect((): void => {
        if (canal) {
            socket.emit('cuarto', { cuarto: `Cuarto ${canal}` })
        }
    }, [canal])

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const scrollBottom = () => {
        areaMensajeRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const onSubmitFunction = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        setMensaje('')
        socket.emit('crear-mensaje', { usuarioId: userObj.usuarioId, mensaje: mensaje, roomId: canal })
        setBandera(!bandera)
    }

    const onChangeMensaje = (event: FormEvent<HTMLInputElement>) => {
        setMensaje(event.currentTarget.value)
    }

    const renderChatPrincipal = () => {
        if (!canal) return null
        else return (
            <div className="contenedor-chat-principal">
                <div className="canal-img"></div>
                <div className="chat">
                    <div className="chat-mensajes">
                        <div className="area-mensajes" >
                            {
                                mensajes.map((data, i) => <p key={i}><span style={{ fontWeight: 500, color: getRandomColor() }}>{data.usuario.usuarioNombre}:</span> {data.mensajeTexto}</p>)
                            }
                            <div ref={areaMensajeRef} />
                        </div>
                        <form onSubmit={onSubmitFunction}>
                            <div className="input-mensajes">
                                <input type="text" value={mensaje} name="mensaje" onChange={onChangeMensaje} />
                                <i className="far fa-grimace"></i>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }

    const renderListaCanales = () => {
        return (
            <div className="canales-disponibles">
                <div onClick={() => setCanal(1)}>
                    <p>Canal 1</p>
                </div>
                <div onClick={() => setCanal(2)}>
                    <p>Canal 2</p>
                </div>
                <div onClick={() => setCanal(3)}>
                    <p>Canal 3</p>
                </div>
            </div>
        )
    }

    return (
        <div className="contenedor-canales">
            <div className="canales-lista-canales">
                <div className="canales-perteneces-1"></div>
                <div className="canales-perteneces-2">
                    <h5>Canales a los que perteneces</h5>
                </div>
            </div>
            <div className="canales-chat-canales">
                {renderChatPrincipal()}
                {renderListaCanales()}
            </div>
        </div>
    )
}

export { Canales }