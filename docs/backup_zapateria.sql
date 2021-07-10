--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: acciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.acciones (
    id integer NOT NULL,
    descripcion character varying(45),
    tipo_id integer NOT NULL
);


ALTER TABLE public.acciones OWNER TO postgres;

--
-- Name: acciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.acciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.acciones_id_seq OWNER TO postgres;

--
-- Name: acciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.acciones_id_seq OWNED BY public.acciones.id;


--
-- Name: black_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.black_list (
    "blackListToken" text NOT NULL
);


ALTER TABLE public.black_list OWNER TO postgres;

--
-- Name: detalle_movimientos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_movimientos (
    id integer NOT NULL,
    cantidad integer NOT NULL,
    precio numeric(5,2),
    producto_id integer NOT NULL,
    movimiento_id integer NOT NULL
);


ALTER TABLE public.detalle_movimientos OWNER TO postgres;

--
-- Name: detalle_movimientos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_movimientos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalle_movimientos_id_seq OWNER TO postgres;

--
-- Name: detalle_movimientos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_movimientos_id_seq OWNED BY public.detalle_movimientos.id;


--
-- Name: movimientos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movimientos (
    id integer NOT NULL,
    fecha timestamp with time zone DEFAULT '2021-07-07 20:46:47.427-05'::timestamp with time zone NOT NULL,
    tipo character varying(20) NOT NULL,
    total numeric(5,2) NOT NULL,
    usuario_id integer NOT NULL
);


ALTER TABLE public.movimientos OWNER TO postgres;

--
-- Name: movimientos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movimientos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movimientos_id_seq OWNER TO postgres;

--
-- Name: movimientos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movimientos_id_seq OWNED BY public.movimientos.id;


--
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(35) NOT NULL,
    precio numeric(5,2) NOT NULL,
    estado boolean DEFAULT true,
    imagen text DEFAULT 'https://loremflickr.com/500/500'::text,
    descripcion character varying(45)
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_id_seq OWNER TO postgres;

--
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- Name: tipos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos (
    id integer NOT NULL,
    descripcion character varying(45)
);


ALTER TABLE public.tipos OWNER TO postgres;

--
-- Name: tipos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipos_id_seq OWNER TO postgres;

--
-- Name: tipos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_id_seq OWNED BY public.tipos.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(45) NOT NULL,
    correo character varying(35) NOT NULL,
    password text NOT NULL,
    imagen text,
    tipo_id integer NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: acciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.acciones ALTER COLUMN id SET DEFAULT nextval('public.acciones_id_seq'::regclass);


--
-- Name: detalle_movimientos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_movimientos ALTER COLUMN id SET DEFAULT nextval('public.detalle_movimientos_id_seq'::regclass);


--
-- Name: movimientos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimientos ALTER COLUMN id SET DEFAULT nextval('public.movimientos_id_seq'::regclass);


--
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- Name: tipos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos ALTER COLUMN id SET DEFAULT nextval('public.tipos_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: acciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.acciones (id, descripcion, tipo_id) FROM stdin;
\.


--
-- Data for Name: black_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.black_list ("blackListToken") FROM stdin;
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsImlhdCI6MTYyNTc5NDg4NiwiZXhwIjoxNjI1Nzk0OTE2fQ.Kyg1399ZhizUW5L72af_Jvl7UfU0lqLq2GMG0u51i5s
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsImlhdCI6MTYyNTc5OTcxMywiZXhwIjoxNjI1Nzk5NzQzfQ.AM7Fo9YGHt9x_tdhhUa95pGk7x1dN67SSY4itXbRkG4
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsImlhdCI6MTYyNTc5OTcxMywiZXhwIjoxNjI1Nzk5NzQzfQ.AM7Fo9YGHt9x_tdhhUa95pGk7x1dN67SSY4itXbRkG41
eyJhbGciOi1JIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsImlhdCI6MTYyNTc5OTcxMywiZXhwIjoxNjI1Nzk5NzQzfQ.AM7Fo9YGHt9x_tdhhUa95pGk7x1dN67SSY4itXbRkG41
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsImlhdCI6MTYyNTg3MzMzMywiZXhwIjoxNjI1ODczMzYzfQ.bHNJZJMjZLmwfmXEM91sgU1uooMDPXdF4bT78KEeQyk
\.


--
-- Data for Name: detalle_movimientos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_movimientos (id, cantidad, precio, producto_id, movimiento_id) FROM stdin;
\.


--
-- Data for Name: movimientos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movimientos (id, fecha, tipo, total, usuario_id) FROM stdin;
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id, nombre, precio, estado, imagen, descripcion) FROM stdin;
1	ZAPATO DE CUERO	100.00	t	https://loremflickr.com/500/500	Zapato de temporada otoño - invierno
2	ZAPATILLAS DEPORTIVAS	100.00	t	https://loremflickr.com/500/500	Zapatillas de trekking
\.


--
-- Data for Name: tipos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipos (id, descripcion) FROM stdin;
1	ADMINISTRADOR
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, correo, password, imagen, tipo_id) FROM stdin;
\.


--
-- Name: acciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.acciones_id_seq', 1, false);


--
-- Name: detalle_movimientos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_movimientos_id_seq', 1, false);


--
-- Name: movimientos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movimientos_id_seq', 1, false);


--
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_seq', 2, true);


--
-- Name: tipos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_id_seq', 1, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, false);


--
-- Name: acciones acciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.acciones
    ADD CONSTRAINT acciones_pkey PRIMARY KEY (id);


--
-- Name: black_list black_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.black_list
    ADD CONSTRAINT black_list_pkey PRIMARY KEY ("blackListToken");


--
-- Name: detalle_movimientos detalle_movimientos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_movimientos
    ADD CONSTRAINT detalle_movimientos_pkey PRIMARY KEY (id);


--
-- Name: movimientos movimientos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimientos
    ADD CONSTRAINT movimientos_pkey PRIMARY KEY (id);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- Name: tipos tipos_descripcion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos
    ADD CONSTRAINT tipos_descripcion_key UNIQUE (descripcion);


--
-- Name: tipos tipos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos
    ADD CONSTRAINT tipos_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- Name: usuarios usuarios_correo_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key1 UNIQUE (correo);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: acciones acciones_tipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.acciones
    ADD CONSTRAINT acciones_tipo_id_fkey FOREIGN KEY (tipo_id) REFERENCES public.tipos(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: detalle_movimientos detalle_movimientos_movimiento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_movimientos
    ADD CONSTRAINT detalle_movimientos_movimiento_id_fkey FOREIGN KEY (movimiento_id) REFERENCES public.movimientos(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: detalle_movimientos detalle_movimientos_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_movimientos
    ADD CONSTRAINT detalle_movimientos_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: usuarios usuarios_tipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_tipo_id_fkey FOREIGN KEY (tipo_id) REFERENCES public.tipos(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

