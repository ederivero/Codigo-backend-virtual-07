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
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO postgres;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_groups (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO postgres;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_user_permissions (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: libros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.libros (
    id integer NOT NULL,
    nombre character varying(45) NOT NULL,
    edicion integer NOT NULL,
    autor text NOT NULL,
    cantidad integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.libros OWNER TO postgres;

--
-- Name: libros_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.libros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.libros_id_seq OWNER TO postgres;

--
-- Name: libros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.libros_id_seq OWNED BY public.libros.id;


--
-- Name: prestamos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prestamos (
    id integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado boolean NOT NULL,
    libro_id integer NOT NULL,
    usuario_id integer NOT NULL
);


ALTER TABLE public.prestamos OWNER TO postgres;

--
-- Name: prestamos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prestamos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prestamos_id_seq OWNER TO postgres;

--
-- Name: prestamos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prestamos_id_seq OWNED BY public.prestamos.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(25) NOT NULL,
    apellido character varying(25) NOT NULL,
    correo character varying(50) NOT NULL,
    dni character varying(8) NOT NULL
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
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: libros id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libros ALTER COLUMN id SET DEFAULT nextval('public.libros_id_seq'::regclass);


--
-- Name: prestamos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prestamos ALTER COLUMN id SET DEFAULT nextval('public.prestamos_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
1	Oficinista
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
1	1	32
2	1	33
3	1	28
4	1	36
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add user	4	add_user
14	Can change user	4	change_user
15	Can delete user	4	delete_user
16	Can view user	4	view_user
17	Can add content type	5	add_contenttype
18	Can change content type	5	change_contenttype
19	Can delete content type	5	delete_contenttype
20	Can view content type	5	view_contenttype
21	Can add session	6	add_session
22	Can change session	6	change_session
23	Can delete session	6	delete_session
24	Can view session	6	view_session
25	Can add libro	7	add_libromodel
26	Can change libro	7	change_libromodel
27	Can delete libro	7	delete_libromodel
28	Can view libro	7	view_libromodel
29	Can add usuario	8	add_usuariomodel
30	Can change usuario	8	change_usuariomodel
31	Can delete usuario	8	delete_usuariomodel
32	Can view usuario	8	view_usuariomodel
33	Can add prestamo	9	add_prestamomodel
34	Can change prestamo	9	change_prestamomodel
35	Can delete prestamo	9	delete_prestamomodel
36	Can view prestamo	9	view_prestamomodel
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$260000$wbYnHTuMzNaNnJ0IKTjaL2$CQFn10wl39ck0yom9CUfqYwvgSlhTOfihlT1j7d0x/I=	2021-06-15 22:04:13-05	t	eduardoderivero	Eduardo	de Rivero Manrique	ederiveroman@gmail.com	t	t	2021-06-15 21:48:40-05
2	pbkdf2_sha256$260000$Tps8kb94k771ERJYwE5vHz$7R4xtRCy3GYfAlZxq70mGO4eXtfLdbvcdUDANlGTImU=	2021-06-16 19:21:20.918449-05	f	Josue				t	t	2021-06-16 18:59:13-05
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
1	2	1
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2021-06-15 22:05:50.55132-05	1	eduardoderivero	2	[{"changed": {"fields": ["First name", "Last name"]}}]	4	1
3	2021-06-15 22:24:41.655369-05	2	La fiesta del chivo	1	[{"added": {}}]	7	1
4	2021-06-15 22:24:57.945283-05	3	Conversaciones en la catedral	1	[{"added": {}}]	7	1
2	2021-06-15 22:15:14.739316-05	1	Una descripcion mas	1	[{"added": {}}]	7	1
5	2021-06-16 18:54:40.311717-05	1	Oficinista	1	[{"added": {}}]	3	1
6	2021-06-16 18:59:13.729415-05	2	Josue	1	[{"added": {}}]	4	1
7	2021-06-16 19:03:45.344973-05	2	Josue	2	[{"changed": {"fields": ["Staff status", "Groups"]}}]	4	1
8	2021-06-16 19:17:12.189965-05	1	UsuarioModel object (1)	1	[{"added": {}}]	8	1
9	2021-06-16 19:18:31.155153-05	1	PrestamoModel object (1)	1	[{"added": {}}]	9	1
10	2021-06-16 19:22:49.766036-05	3	Conversaciones en la catedral	2	[{"changed": {"fields": ["Cantidad"]}}]	7	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	gestion	libromodel
8	gestion	usuariomodel
9	gestion	prestamomodel
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2021-06-15 19:23:55.729998-05
2	auth	0001_initial	2021-06-15 19:23:55.811-05
3	admin	0001_initial	2021-06-15 19:23:55.830998-05
4	admin	0002_logentry_remove_auto_add	2021-06-15 19:23:55.836999-05
5	admin	0003_logentry_add_action_flag_choices	2021-06-15 19:23:55.845-05
6	contenttypes	0002_remove_content_type_name	2021-06-15 19:23:55.859998-05
7	auth	0002_alter_permission_name_max_length	2021-06-15 19:23:55.865998-05
8	auth	0003_alter_user_email_max_length	2021-06-15 19:23:55.875001-05
9	auth	0004_alter_user_username_opts	2021-06-15 19:23:55.882002-05
10	auth	0005_alter_user_last_login_null	2021-06-15 19:23:55.89-05
11	auth	0006_require_contenttypes_0002	2021-06-15 19:23:55.890999-05
12	auth	0007_alter_validators_add_error_messages	2021-06-15 19:23:55.897001-05
13	auth	0008_alter_user_username_max_length	2021-06-15 19:23:55.912999-05
14	auth	0009_alter_user_last_name_max_length	2021-06-15 19:23:55.924-05
15	auth	0010_alter_group_name_max_length	2021-06-15 19:23:55.933-05
16	auth	0011_update_proxy_permissions	2021-06-15 19:23:55.939999-05
17	auth	0012_alter_user_first_name_max_length	2021-06-15 19:23:55.947999-05
18	sessions	0001_initial	2021-06-15 19:23:55.962002-05
19	gestion	0001_initial	2021-06-15 20:27:52.732449-05
20	gestion	0002_prestamomodel	2021-06-15 21:03:28.49222-05
21	gestion	0003_alter_prestamomodel_prestamofechainicio	2021-06-15 21:03:28.49619-05
22	gestion	0004_auto_20210617_1918	2021-06-17 19:18:50.731996-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
v15bkuwvr7p7151tn8p4kfnffjb17vgz	.eJxVjDEOwjAMRe-SGUWpEzeIkZ0zRLbjkAJqpaadKu4OlTrA-t97fzOJ1qWmtemchmwupjOn341JnjruID9ovE9WpnGZB7a7Yg_a7G3K-roe7t9BpVa_dUHnQ3Se-6yERMISemCMLlJ0DjqCwA4BEEQ7xF6Jfc4iBQoWPpv3B93yODQ:1ltLqf:UuJFrycpNFsTeGWT25YRbOQ9-7WfStxi7-4srq1V2PI	2021-06-29 22:04:13.577163-05
bmfj1cnvyw1jcvxkk23dr8ch3y0lketp	.eJxVjMsOwiAQRf-FtSFQHi0u3fsNZJgZpGogKe3K-O_apAvd3nPOfYkI21ri1nmJM4mzGMTpd0uAD647oDvUW5PY6rrMSe6KPGiX10b8vBzu30GBXr61AUyBwHkdRouAhCqTY-3BTkEZFYJT5A3lSbF2OjNYNhoNAY5oBxDvD_sJOIE:1ltfX1:hv8Sq4njHgKbGVgUCFhFOwFj3-kUhoef_fvYpOrTXvc	2021-06-30 19:05:15.743073-05
xkrzsozhksp4fbdv20c2tg8pskc2nowl	.eJxVjMsOwiAQRf-FtSFQHi0u3fsNZJgZpGogKe3K-O_apAvd3nPOfYkI21ri1nmJM4mzGMTpd0uAD647oDvUW5PY6rrMSe6KPGiX10b8vBzu30GBXr61AUyBwHkdRouAhCqTY-3BTkEZFYJT5A3lSbF2OjNYNhoNAY5oBxDvD_sJOIE:1ltfma:8LQkQ9fLLFISCyiC_jmMmbU_KRLbgg5jlnhw1h3Fe9c	2021-06-30 19:21:20.920452-05
\.


--
-- Data for Name: libros; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.libros (id, nombre, edicion, autor, cantidad, created_at, deleted_at, updated_at) FROM stdin;
2	La fiesta del chivo	2006	Mario Vargas Llosa	10	2021-06-17 19:18:50.720997-05	\N	2021-06-17 19:18:50.727997-05
3	Conversaciones en la catedral	2008	Mario Vargas Llosa	5	2021-06-17 19:18:50.720997-05	\N	2021-06-17 19:18:50.727997-05
4	Metamorfosis	2008	Wolfgang Goethe	5	2021-06-17 19:18:50.720997-05	\N	2021-06-17 19:18:50.727997-05
5	Condorito	2018	Pepo	10	2021-06-17 19:18:50.720997-05	\N	2021-06-17 19:18:50.727997-05
6	Condorito	2021	Pepo	10	2021-06-17 19:18:50.720997-05	\N	2021-06-17 19:18:50.727997-05
1	Las chicas superpoderosas	2006	Alfredo Bryce Echenique	11	2021-06-17 19:18:50.720997-05	2021-06-17 21:24:30.75551-05	2021-06-17 21:24:30.75551-05
\.


--
-- Data for Name: prestamos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prestamos (id, fecha_inicio, fecha_fin, estado, libro_id, usuario_id) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, apellido, correo, dni) FROM stdin;
1	Zachary	Jones	luceromatthew@hotmail.com	67045719
2	Matthew	Mcmahon	stephanie95@hotmail.com	50790217
3	Jeffrey	Chandler	david56@gmail.com	89730257
4	Kimberly	Phillips	annajacobs@hotmail.com	72362374
5	Stephen	Bryant	stacyarnold@hotmail.com	47438747
6	James	Thomas	barbaradiaz@hotmail.com	87192051
7	Christopher	Torres	tonya69@hotmail.com	72741748
8	Lori	Campbell	timothytaylor@hotmail.com	42388883
9	Jennifer	Macias	lindabrooks@gmail.com	90202818
10	Teresa	Jimenez	yestrada@gmail.com	22690449
11	Charles	Garcia	brandon22@yahoo.com	61954938
12	Maurice	Russell	jamie58@yahoo.com	13470742
13	Raymond	Mcdonald	scott56@yahoo.com	47104006
14	Timothy	Garcia	qdavis@hotmail.com	84366298
15	Benjamin	Moore	nicolehood@hotmail.com	61714191
16	Donald	Knight	ifitzpatrick@hotmail.com	64262099
17	Nicholas	Miller	daniel20@yahoo.com	97652054
18	Jimmy	Thompson	kennedyerik@hotmail.com	28504433
19	Derrick	Hayes	jamesallen@gmail.com	73800376
20	Lisa	Burns	aguirresteven@gmail.com	30539545
21	Lindsey	Webster	jjones@hotmail.com	99764907
22	Steve	Torres	rhondanelson@hotmail.com	33113112
23	Jamie	Suarez	shane75@gmail.com	60359041
24	Stephanie	Grant	ljones@hotmail.com	77524237
25	James	Walton	anna09@gmail.com	76371126
26	Scott	Burton	ccrosby@yahoo.com	87118196
27	Carly	Mora	mark25@gmail.com	33145298
28	Garrett	Herman	cmorse@hotmail.com	95885771
29	Grace	Adams	patriciakrause@hotmail.com	13615245
30	Cody	Huber	brownfrancisco@gmail.com	44844578
31	Jennifer	Love	robertsmith@hotmail.com	87416288
32	Kelly	Harris	jeffreypoole@yahoo.com	38458826
33	Geoffrey	Adams	deannayork@yahoo.com	43811662
34	Patrick	Gutierrez	tcarlson@gmail.com	24227648
35	Suzanne	Boyd	davisjames@gmail.com	83548319
36	Deanna	Payne	elizabeth20@gmail.com	18917249
37	Zachary	Cohen	anthony65@hotmail.com	54471615
38	Kyle	Savage	phillip26@hotmail.com	96535570
39	Renee	Mccall	kingnathaniel@hotmail.com	20976496
40	Joshua	Molina	qbrown@gmail.com	40431893
41	Mackenzie	Schwartz	kevin55@hotmail.com	88942798
42	Tyler	Cannon	richardbarr@gmail.com	35524003
43	Donald	Lopez	tracyhardin@gmail.com	20067227
44	Paul	Garcia	hutchinsonjohn@hotmail.com	73763938
45	Steven	Thomas	athompson@hotmail.com	86492614
46	Amy	Dunlap	benjamin68@gmail.com	38722633
47	Sheena	Strong	anthonybradford@hotmail.com	61503107
48	Jason	Barnes	robertsonsteven@gmail.com	82210062
49	Anthony	Walker	davisjulie@yahoo.com	78327280
50	Jessica	Roberts	emilyjones@gmail.com	60688458
51	Madison	Callahan	leemichael@yahoo.com	71770959
52	Julie	Wright	mjohnson@gmail.com	24392318
53	Sandra	Yang	emilyanderson@yahoo.com	77351188
54	Jennifer	Henry	abonilla@yahoo.com	29499541
55	Marissa	Johnson	hintonbrian@yahoo.com	45614074
56	Thomas	Diaz	baileyjason@hotmail.com	27226399
57	David	Pierce	chelseawalker@hotmail.com	53471350
58	Stephanie	Smith	daniel52@gmail.com	27024818
59	John	Day	brianevans@yahoo.com	91241266
60	Guy	Pena	kprice@gmail.com	41819052
61	Alyssa	Brown	amanda87@yahoo.com	15631475
62	Timothy	Castro	michael01@yahoo.com	54843637
63	Jason	Wright	pcosta@yahoo.com	18613219
64	Anna	Smith	stephanie17@yahoo.com	32589256
65	Mitchell	Mays	patricia17@yahoo.com	21194354
66	Cynthia	Williams	kelsey90@hotmail.com	95847526
67	Tammy	Robles	jenniferoconnell@gmail.com	66087951
68	Joseph	Cantu	jasondean@hotmail.com	99801224
69	Lori	Ortiz	davilajerry@gmail.com	11117044
70	Joseph	Harris	alvin63@hotmail.com	54927986
71	Michael	Rodriguez	sharon79@yahoo.com	93641071
72	Tina	Crawford	boltonjoseph@gmail.com	59241037
73	Michael	Nelson	kschmitt@hotmail.com	52539249
74	Caleb	Johnson	diana07@yahoo.com	69143815
75	Amanda	Bradley	longconnor@gmail.com	29672687
76	David	Oneill	ipatterson@yahoo.com	74779455
77	David	Brown	smithsusan@hotmail.com	41576804
78	Peter	Carpenter	ggonzales@hotmail.com	15190958
79	Brian	Landry	karen71@hotmail.com	47398601
80	Melvin	Lopez	jasonle@yahoo.com	75729719
81	Michele	Johnston	mcguirenichole@hotmail.com	81868130
82	Joseph	Johnson	angela30@yahoo.com	13419130
83	Harry	Mckenzie	mayojacob@hotmail.com	94995932
84	Ralph	Kennedy	jamesallen@hotmail.com	30232548
85	Brian	Foster	colleen14@yahoo.com	47413181
86	Gail	Johnson	qsmith@gmail.com	91482789
87	Cheryl	Austin	zweaver@hotmail.com	54931559
88	Yvette	Owens	sandramiller@yahoo.com	97100400
89	David	Fox	mercerjessica@hotmail.com	55153931
90	Christopher	Wood	angelafarrell@yahoo.com	12621022
91	Lacey	Rivera	obrienjose@hotmail.com	42905823
92	William	Rodriguez	oesparza@yahoo.com	72882054
93	Rebecca	Beck	andrewmartin@hotmail.com	97100865
94	Jodi	Beck	penaderek@yahoo.com	99714743
95	Christopher	Horn	jessica87@gmail.com	30881043
96	Laura	Cox	alison63@yahoo.com	37617671
97	Tristan	Herrera	vhowe@gmail.com	14246166
98	Daniel	Holder	johnmurray@gmail.com	36495679
99	Dakota	Clements	phudson@hotmail.com	88722132
100	Marie	Cameron	bgray@hotmail.com	35804343
101	Adam	Boyle	xromero@yahoo.com	85783197
102	Paul	Wilson	keithgarcia@hotmail.com	70156004
103	Ann	Rodriguez	allison86@yahoo.com	38968362
104	Maria	Rodriguez	maryjones@yahoo.com	93776795
105	Julie	Stephens	tfisher@yahoo.com	54179950
106	Carolyn	Daugherty	haleantonio@yahoo.com	60220246
107	Samuel	Collins	elizabeth37@yahoo.com	17630272
108	Jessica	Chambers	gwarner@gmail.com	84062776
109	Michael	May	mdaniels@yahoo.com	49763130
110	Brian	Paul	irivera@hotmail.com	78296752
111	Vanessa	Peters	isaiahward@hotmail.com	65395767
112	Joe	Kennedy	mramirez@hotmail.com	52008225
113	William	Robinson	brandonmorgan@hotmail.com	46311326
114	Shawn	Carpenter	webbheather@yahoo.com	34629425
115	Brittney	Wood	crawfordsamuel@gmail.com	70731421
116	Lisa	Tapia	edwardlee@yahoo.com	19686297
117	Sharon	George	gibsonpeter@yahoo.com	99638701
118	Alexandra	Wilson	erikmorgan@hotmail.com	61195528
119	Jack	Keith	sarah15@gmail.com	20324170
120	Mandy	Moore	logan52@gmail.com	70549730
121	Scott	Rich	villacheryl@gmail.com	43639912
122	Stephen	Elliott	burnettrebecca@gmail.com	53350963
123	Taylor	Woods	rose88@hotmail.com	68872795
124	Steve	Suarez	eddietaylor@hotmail.com	59314956
125	Shane	Rodriguez	ryan63@yahoo.com	30980814
126	William	Gibson	destinyjones@yahoo.com	44018772
127	Danielle	Andrade	johnwarner@hotmail.com	58108212
128	Alec	Carr	james07@hotmail.com	40895623
129	David	Wilkerson	usimmons@hotmail.com	51409919
130	John	Morrow	ssmith@gmail.com	15209733
131	Evan	Moore	katherineriley@hotmail.com	74747122
132	Edward	Clark	dorothy79@hotmail.com	56600421
133	Nicholas	Anthony	valvarez@gmail.com	83995205
134	Gregory	Webb	murphyjay@hotmail.com	12197222
135	Lisa	Galvan	andrewlewis@yahoo.com	72649661
136	Erika	Nelson	chunt@yahoo.com	29636500
137	Rick	Gray	courtney88@hotmail.com	72085382
138	Natalie	Lee	joshuahernandez@yahoo.com	62384866
139	Stephen	Flores	zpennington@hotmail.com	45649280
140	Gregory	Holden	michael56@gmail.com	26502080
141	Summer	Stewart	melissa31@hotmail.com	20960398
142	Matthew	Graves	hkoch@gmail.com	30163751
143	Christopher	Turner	douglassimmons@yahoo.com	53406204
144	Donald	Pearson	ballsarah@yahoo.com	50341422
145	Alan	Diaz	kelly93@gmail.com	77293097
146	Derrick	Collins	madisonbrady@gmail.com	86285990
147	Brian	Mcclure	vincent78@yahoo.com	23779874
148	Sydney	Simmons	dylannelson@hotmail.com	10687242
149	Stephanie	Levy	steven50@hotmail.com	31747141
150	Jeremy	Odonnell	scottkevin@hotmail.com	91598150
151	Jonathan	Hampton	evelynharris@gmail.com	98532974
152	Carl	Arnold	hilldavid@gmail.com	61246624
153	Robert	Riley	william58@hotmail.com	41170149
154	Michael	Barnett	uwang@hotmail.com	69169498
155	Alexandria	Rivera	sharon22@yahoo.com	43788988
156	Matthew	Clark	michael25@gmail.com	71030958
157	Jacob	Berg	richardhowell@yahoo.com	76065965
158	Sandra	Vincent	henrykenneth@hotmail.com	57189142
159	Kayla	Tran	nbarr@gmail.com	52748090
160	Michael	Payne	amberbell@gmail.com	99456803
161	Jeremy	Clark	fmccoy@yahoo.com	83262700
162	Derek	King	michael05@yahoo.com	25281373
163	Alicia	Bell	craigknapp@hotmail.com	83490505
164	Jamie	Green	christopher58@hotmail.com	59525300
165	Thomas	Mitchell	juan90@hotmail.com	61307753
166	Natasha	Ortiz	imatthews@yahoo.com	51187780
167	William	Sanchez	ubarron@hotmail.com	99125837
168	Erik	Castillo	csmith@hotmail.com	24454099
169	David	Silva	john46@hotmail.com	17992431
170	Richard	Lyons	cathy06@yahoo.com	14121912
171	Sarah	Morton	gregorycarter@yahoo.com	15970327
172	Rebecca	Chaney	eroberson@yahoo.com	22450916
173	Jennifer	Carlson	yclark@yahoo.com	44623304
174	Chris	Hall	paul93@gmail.com	77019386
175	Jason	Hall	george20@yahoo.com	45852070
176	Michael	Faulkner	allisonjames@yahoo.com	22692930
177	Joshua	Miller	jason57@yahoo.com	39043605
178	James	Potts	collinhill@hotmail.com	82786873
179	Glenn	Scott	james42@hotmail.com	43936357
180	Brandon	Lloyd	garyturner@yahoo.com	89257774
181	Cameron	Tucker	watsonbobby@hotmail.com	59720311
182	Diana	Novak	scottjoshua@hotmail.com	37541497
183	Debra	Clark	sarah81@yahoo.com	88948547
184	Philip	Wyatt	marvinrose@hotmail.com	43782387
185	Brenda	Holt	kevinlogan@gmail.com	20751770
186	Seth	Cox	huffmansteven@yahoo.com	86123499
187	Bianca	Gomez	phamkimberly@yahoo.com	85782012
188	James	Stokes	james13@hotmail.com	10531430
189	Mason	Little	williamskristin@yahoo.com	92964543
190	Kevin	Garner	hdouglas@gmail.com	87346688
191	David	Lopez	kingmichael@yahoo.com	54168394
192	Donna	Smith	onelson@gmail.com	89950381
193	Ronald	Jones	thill@yahoo.com	31345201
194	Angela	Lucero	jessica28@gmail.com	89833391
195	Linda	Jefferson	thomasjohnson@hotmail.com	48016861
196	Katherine	Martinez	christophercastro@yahoo.com	68979303
197	Christopher	Wells	jonesmark@gmail.com	25096584
198	Emily	Shaw	stokesjason@hotmail.com	91363921
199	Kayla	Mitchell	john11@yahoo.com	40266276
200	Lynn	Davis	munozlori@hotmail.com	76992148
201	Jennifer	Moore	tara33@hotmail.com	82091439
202	Kenneth	Gross	jack19@gmail.com	36381750
203	Lori	Carpenter	krista33@gmail.com	58873640
204	Kathryn	Hawkins	daltonbecker@hotmail.com	88522441
205	Jillian	Higgins	michelle39@gmail.com	75153756
206	Blake	Smith	garygraham@hotmail.com	46442556
207	Jill	Butler	angela18@hotmail.com	65686301
208	Melissa	Davis	omar40@yahoo.com	26817423
209	Joshua	Haney	kanerachael@hotmail.com	78340583
210	Jeffrey	Smith	uknight@gmail.com	41510063
211	Stephen	Steele	rross@hotmail.com	20884098
212	Ross	Williams	lgray@gmail.com	14186675
213	Anthony	Tucker	dennissharon@yahoo.com	84588760
214	Derek	Holland	rsmith@gmail.com	57005640
215	Matthew	Hunter	ygarcia@gmail.com	51266178
216	Gary	Weiss	adamferguson@yahoo.com	78587738
217	Timothy	Delgado	johnnybishop@gmail.com	26705909
218	Thomas	Vang	sandersmark@hotmail.com	18581862
219	Debra	Johnston	kellycopeland@hotmail.com	82178752
220	Julian	Wise	stephendelgado@hotmail.com	17292900
221	Monica	Garcia	russell40@hotmail.com	75500886
222	Kevin	Ramos	jennifersmith@hotmail.com	10305728
223	Travis	Johnson	gary31@gmail.com	33934710
224	Michael	Nelson	iharris@gmail.com	77835365
225	Holly	Bell	jennifer35@hotmail.com	98796111
226	Laura	Jones	msharp@gmail.com	46822612
227	Melinda	Green	bsanchez@gmail.com	12756996
228	Vincent	Gonzalez	amy45@yahoo.com	84529646
229	Tiffany	Maddox	zachary23@yahoo.com	60409460
230	Valerie	Wilson	steven81@hotmail.com	67723943
231	Omar	Hall	louisjoyce@gmail.com	61427368
232	Michael	Johnson	fgonzales@gmail.com	57737758
233	William	Perry	uhanson@hotmail.com	52624096
234	Maria	Watson	seanbarnes@hotmail.com	96511015
235	Amy	Scott	kara54@hotmail.com	41819428
236	Elizabeth	Kaufman	natalie10@yahoo.com	89671982
237	William	Norman	mcintoshamanda@hotmail.com	97639468
238	Christopher	Carter	william03@yahoo.com	41826014
239	Michael	Berry	wmccoy@hotmail.com	87184928
240	Mark	Barr	jessica77@gmail.com	78562547
241	Tina	Russell	vincent90@hotmail.com	97077686
242	Daniel	Day	phillipsmelanie@hotmail.com	20021262
243	Susan	Garcia	qpollard@hotmail.com	24463691
244	Alexander	Watts	lucasjessica@yahoo.com	19656600
245	Michael	Ball	drivera@yahoo.com	35163045
246	Timothy	Moore	taylordarrell@hotmail.com	50782520
247	Thomas	Garcia	tbryant@gmail.com	77594254
248	Krista	Gordon	ehall@hotmail.com	93178966
249	Julia	Mcgrath	kenneth90@hotmail.com	52622002
250	Kimberly	Murillo	williamduncan@gmail.com	64300468
251	Barbara	Olson	deborah39@hotmail.com	23427341
252	Christina	Lloyd	deniseadkins@hotmail.com	12592017
253	Zachary	Jordan	elliottshirley@yahoo.com	42947108
254	Lisa	Jennings	ann90@yahoo.com	59697612
255	John	Patterson	katherine17@hotmail.com	62550220
256	Christine	Mays	catherinewalker@hotmail.com	89598459
257	William	Tucker	msingh@yahoo.com	36232812
258	Jonathan	Payne	richard79@hotmail.com	12816784
259	Alexis	Gardner	millertrevor@gmail.com	19584849
260	Sylvia	Douglas	zharvey@hotmail.com	33854628
261	Amy	Ho	hhanna@gmail.com	47124655
262	Jesse	Berg	obauer@gmail.com	84327407
263	William	Sharp	kristinrobertson@yahoo.com	36630588
264	Mark	Nunez	pho@gmail.com	74331264
265	Tyrone	Wong	sotojanice@gmail.com	46444710
266	Briana	Thomas	travisbradshaw@gmail.com	55440981
267	Christopher	Blake	jwatson@yahoo.com	19796103
268	Samantha	Lucas	dsmith@hotmail.com	54251830
269	Lauren	Richards	ereid@gmail.com	43090269
270	Gabriel	Perez	alexandrabowman@gmail.com	43055211
271	Annette	Bender	riverawilliam@yahoo.com	30541529
272	Robert	Chavez	keith21@hotmail.com	86785448
273	Kelly	Weber	garrett61@yahoo.com	56390838
274	Samantha	Ward	mejiadavid@yahoo.com	39526110
275	Christine	Anderson	evanscharles@yahoo.com	27586838
276	Kevin	Valdez	acooper@yahoo.com	51561650
277	Sharon	Bailey	mbanks@yahoo.com	22743367
278	Lucas	Gray	andersonleslie@yahoo.com	96826628
279	Christopher	Molina	kristen40@gmail.com	90166876
280	Patricia	Greene	fsmith@yahoo.com	27794871
281	Grant	Burke	scottdavid@gmail.com	27853824
282	Adam	Mora	lwilliams@hotmail.com	70084788
283	Michelle	Peterson	umclaughlin@gmail.com	37778922
284	Michael	Castaneda	paul82@gmail.com	78565001
285	Megan	Daniels	chernandez@gmail.com	11225829
286	Katrina	Wade	jeffery15@gmail.com	43966336
287	Juan	Williams	corymolina@hotmail.com	54156398
288	Diana	Garrett	lorischwartz@yahoo.com	12553504
289	Michelle	Sullivan	fwright@gmail.com	66295590
290	Michael	Rose	joan00@gmail.com	75592100
291	Shelly	George	alyssaallen@yahoo.com	12714081
292	Ashley	Bennett	antonio29@gmail.com	74269445
293	Danielle	Moore	jeffersonlori@hotmail.com	87550736
294	Shelley	Dunn	dcross@gmail.com	93534176
295	Karen	Hart	hdavis@gmail.com	43269297
296	Emma	Hartman	padams@yahoo.com	20338041
297	Andrea	Shah	vburnett@hotmail.com	76144966
298	Benjamin	Black	luis53@hotmail.com	88915127
299	Joseph	Parker	oscargalvan@hotmail.com	43317035
300	Mariah	Goodwin	gregoryellis@gmail.com	66316834
301	Sean	Garcia	kathleensimmons@yahoo.com	30603403
302	Ashley	Hernandez	gcompton@yahoo.com	40649547
303	Lisa	Wade	kirbydanielle@yahoo.com	66990998
304	Michael	Thomas	leejessica@hotmail.com	75644555
305	Faith	Carrillo	kleinmichael@hotmail.com	64267259
306	Gina	Moore	owhite@hotmail.com	77866112
307	Alyssa	Santana	ooconnor@yahoo.com	59690308
308	Alyssa	Russo	qrussell@hotmail.com	26234353
309	Kevin	Ellis	njohnson@gmail.com	66178791
310	Jennifer	Reeves	steven54@hotmail.com	35774669
311	Dana	Shaw	nmoore@gmail.com	76890904
312	Ryan	Casey	spenceluis@hotmail.com	52290574
313	Rachel	Martinez	brownlance@yahoo.com	16552127
314	Julian	Patrick	tannertina@gmail.com	20503864
315	Alisha	Smith	francisjeffery@hotmail.com	58396195
316	Jaime	Myers	adamflowers@yahoo.com	35602806
317	Debbie	Strong	tracygibson@yahoo.com	19228099
318	Travis	English	scottrobert@yahoo.com	67795539
319	Timothy	Brown	matthewmcmahon@yahoo.com	10539813
320	Chase	Hunt	jessicaestrada@gmail.com	32026835
321	Kelly	Woods	ggreene@hotmail.com	24027849
322	Heidi	Dixon	rbaker@yahoo.com	77716808
323	Stephen	Ruiz	connerdanielle@gmail.com	21034943
324	Tammy	Roth	rosecordova@gmail.com	86546128
325	Robert	Porter	dsanders@gmail.com	55754683
326	Noah	Frey	haroldmoreno@yahoo.com	54066125
327	Joshua	Powers	quinnthomas@gmail.com	59013001
328	Emily	House	karenmolina@yahoo.com	39340414
329	Laura	Johnson	kirkerin@gmail.com	40450570
330	Tara	Olson	jill59@yahoo.com	85071457
331	William	Gordon	jonesmichelle@yahoo.com	98075348
332	Adam	Beasley	framirez@gmail.com	97992681
333	Shawn	Thompson	richardsjames@hotmail.com	26047594
334	Tiffany	Burgess	david45@hotmail.com	64642178
335	Jessica	Murphy	chris21@gmail.com	91480646
336	Stephanie	Berry	yphillips@yahoo.com	51693115
337	Sarah	Ho	lwilkerson@yahoo.com	45921011
338	Rebecca	Everett	contrerasconnie@yahoo.com	39523872
339	Kelly	Gonzalez	andrea11@yahoo.com	74937074
340	Joseph	Lee	timothy53@gmail.com	51642930
341	Maurice	Mcintosh	michealwood@gmail.com	14792329
342	David	Nguyen	campbellsamantha@gmail.com	61017650
343	Jessica	Sharp	lisajohnston@hotmail.com	28370085
344	Walter	Schmidt	anne49@gmail.com	12955424
345	Joshua	Martinez	bakerdouglas@yahoo.com	72884620
346	Katherine	Bailey	youngricky@yahoo.com	86729099
347	Roy	Price	elizabethlee@yahoo.com	72847662
348	Roger	Diaz	wilsonmiranda@hotmail.com	41111357
349	Tracy	Patel	fisherangela@yahoo.com	74065940
350	Luke	Brown	mccarthymelissa@yahoo.com	27968120
351	Vincent	Baker	greensean@hotmail.com	89410335
352	Elizabeth	Huffman	meghanlopez@gmail.com	18606360
353	Bobby	Santiago	samanthaperez@hotmail.com	36435606
354	Alexander	Ayala	tperez@yahoo.com	36890108
355	Kevin	Barker	kristingarcia@yahoo.com	27853155
356	Sean	Key	warrenalyssa@yahoo.com	42964108
357	Samantha	Smith	latoya63@gmail.com	87766004
358	Brenda	West	jenny80@yahoo.com	16821535
359	Joann	Romero	gutierrezsusan@gmail.com	77173656
360	Anthony	Peters	susan36@yahoo.com	64652734
361	Audrey	Osborne	bhardin@yahoo.com	42655443
362	Courtney	Webb	osteele@hotmail.com	65755357
363	Edward	Martin	lmeyer@gmail.com	68064243
364	Charles	Strong	santiagodenise@gmail.com	14246545
365	Kathleen	Walker	spencerbruce@gmail.com	26272404
366	Joseph	Zhang	zsmith@yahoo.com	26093224
367	Pamela	Gibson	kcampbell@gmail.com	85734023
368	Craig	Tucker	carmen14@yahoo.com	68433933
369	Scott	Baker	peggyrandall@hotmail.com	48899575
370	Melissa	Shepherd	kjones@gmail.com	66237709
371	Diana	Ramirez	stephanie66@hotmail.com	45728816
372	Jacqueline	Le	millsjerome@yahoo.com	18232455
373	Jessica	Singh	hendricksjames@yahoo.com	48377218
374	Danielle	Wilson	jennifer91@gmail.com	95873525
375	Evan	Haas	vjones@hotmail.com	83076642
376	Mark	Walter	hjones@hotmail.com	57764273
377	Emily	Davis	danielcastillo@hotmail.com	89281848
378	Jeffery	Bradshaw	james17@hotmail.com	52132804
379	Kathleen	Vincent	kristen10@gmail.com	86320749
380	Bryan	Rhodes	kingjohnny@gmail.com	51121496
381	Jillian	Adams	phelpsmaria@gmail.com	56999995
382	Julie	Dixon	wcastillo@yahoo.com	14393721
383	Katherine	Bass	nicholasbrown@hotmail.com	25289799
384	Larry	Hernandez	rjohnson@gmail.com	75197576
385	Jeffrey	Wallace	westmario@yahoo.com	73110533
386	Zachary	Jones	jowilliams@yahoo.com	28380053
387	Diane	Stone	megancoleman@gmail.com	94731723
388	Jeffery	Anderson	john13@hotmail.com	50679958
389	Keith	Huff	valentinebryan@yahoo.com	80970852
390	Reginald	Powers	whamilton@yahoo.com	76712896
391	Dana	Pruitt	john58@gmail.com	23245813
392	Melissa	Torres	annelopez@yahoo.com	85644709
393	Janet	Lara	jonesdavid@hotmail.com	38671036
394	Brandon	Anderson	donald79@hotmail.com	98611682
395	Katherine	Mccarthy	lwilliams@yahoo.com	70908572
396	Ashley	Hall	matthew67@hotmail.com	50170838
397	Bill	Pacheco	elizabeth49@yahoo.com	18208020
398	Victoria	Henson	treilly@gmail.com	42235890
399	Jacob	Herrera	jesse15@hotmail.com	83341092
400	Brenda	Rush	bwarren@hotmail.com	72821427
401	Ethan	Weber	carpenternicolas@yahoo.com	71324409
402	Robert	Allen	edwardsstephanie@hotmail.com	34262779
403	Perry	Hall	melissa21@yahoo.com	44119433
404	Paul	Glenn	thodges@hotmail.com	82015046
405	Mallory	Duran	burtoncheryl@yahoo.com	53264631
406	Jocelyn	Cardenas	janderson@hotmail.com	91092613
407	Diana	Johnson	carrie46@hotmail.com	69035920
408	Tim	Valenzuela	mmosley@yahoo.com	60211470
409	Michelle	Harrison	fowlervanessa@gmail.com	37428093
410	Frank	Garcia	dwayne21@gmail.com	49632277
411	Thomas	Bell	deborah86@gmail.com	86503825
412	Sarah	Carr	wadesarah@hotmail.com	81996923
413	Kenneth	White	jenniferoliver@yahoo.com	33064192
414	Reginald	Barber	ggarcia@hotmail.com	49492445
415	Kimberly	Mckinney	madison38@hotmail.com	29550398
416	Mary	Castillo	carrjoseph@yahoo.com	10015602
417	Derek	Guzman	joshuareyes@yahoo.com	51039483
418	Amy	Barrera	darin06@yahoo.com	27107707
419	Tammy	Garcia	greertammy@hotmail.com	29526783
420	Nicholas	Walker	rickysmith@yahoo.com	26984078
421	Kelly	Smith	david93@gmail.com	48272156
422	Brenda	Jones	jean08@gmail.com	40207368
423	Mario	Carrillo	wvillanueva@yahoo.com	64281842
424	Debra	Mann	alansaunders@hotmail.com	87407199
425	Robert	Knight	edwardsmelanie@hotmail.com	73803265
426	Joshua	Robbins	nguyenwilliam@gmail.com	58737693
427	Shane	Miller	allisonhector@yahoo.com	72997212
428	Ashley	Morales	carolharris@yahoo.com	19041032
429	Brian	Anderson	jasonanderson@yahoo.com	36697176
430	Jared	Barber	erinritter@gmail.com	66322695
431	Gloria	Hernandez	edward11@yahoo.com	33949917
432	Darren	Chambers	smithsandra@yahoo.com	42807968
433	William	Hicks	nross@hotmail.com	90789168
434	Connor	Johnson	marieramirez@hotmail.com	52153297
435	Jeffrey	Poole	hwright@yahoo.com	29092833
436	Lucas	Payne	andrewramirez@yahoo.com	79171388
437	Rachel	Edwards	romeronicole@yahoo.com	76568577
438	Veronica	Clark	david35@yahoo.com	94037269
439	Michael	Rodriguez	kristincarter@hotmail.com	29783516
440	Christopher	Jones	dixonamanda@hotmail.com	44676820
441	Jasmine	Young	craigmorrison@hotmail.com	21191591
442	Andrew	Walters	vmartin@yahoo.com	90373823
443	Angela	Sims	eric78@gmail.com	70372531
444	Thomas	Crane	nguyenadam@gmail.com	80378472
445	Jennifer	Meyer	christy37@gmail.com	64297811
446	Grant	Reese	sarahjones@yahoo.com	56012004
447	Joseph	Boyd	michellemiller@hotmail.com	79176918
448	Amy	Woods	robin73@gmail.com	39181947
449	Tristan	Vazquez	sharontran@hotmail.com	31227788
450	Laura	Bentley	jorgemason@gmail.com	69429051
451	Jerry	Castillo	ustanton@gmail.com	73726509
452	Jonathan	Sanchez	morgan56@gmail.com	27104843
453	Maria	Castillo	lopezjohn@hotmail.com	51494636
454	Allison	Santos	carol40@gmail.com	49157210
455	Nathaniel	Lee	unixon@yahoo.com	42067501
456	Dana	Scott	jeansalinas@gmail.com	64338592
457	Francisco	Graham	hodgesrebecca@yahoo.com	93093161
458	Randy	Moore	khernandez@hotmail.com	66019988
459	Andre	May	ramirezwhitney@gmail.com	79152973
460	Christine	Nguyen	shawnanderson@yahoo.com	11429180
461	Joseph	Allen	darryl44@hotmail.com	53526188
462	Victoria	Marshall	berickson@yahoo.com	73145630
463	Brenda	Robinson	pagelaura@gmail.com	37071193
464	James	Gonzalez	frederickpatterson@gmail.com	43819918
465	Richard	Price	amartinez@yahoo.com	98876984
466	Juan	Mason	carolclark@hotmail.com	17040466
467	Renee	Turner	yprince@hotmail.com	69294489
468	Brenda	Chen	ebony41@yahoo.com	15651860
469	James	Hopkins	chelsealyons@yahoo.com	41301545
470	Robert	Brewer	jrobertson@yahoo.com	28829707
471	Bruce	Carter	elizabethhorton@gmail.com	62973608
472	Jason	King	langbrianna@yahoo.com	33317310
473	Patricia	Stanley	wwaller@hotmail.com	47618768
474	Timothy	Mccormick	powellandrew@yahoo.com	36769160
475	Louis	Martin	kelly07@yahoo.com	13874999
476	David	Diaz	vwebb@gmail.com	64084566
477	Emily	Smith	theresa37@hotmail.com	54313150
478	Anthony	Anderson	donnasmith@yahoo.com	87076394
479	James	Wells	howard44@hotmail.com	12934830
480	Marilyn	Mccormick	kimberlyrandolph@yahoo.com	99674486
481	Alexandria	Wise	nicole38@yahoo.com	70916092
482	Christopher	Olson	jaredmiller@gmail.com	22411813
483	Robert	Stanton	tylerwiggins@gmail.com	19857992
484	Richard	Thompson	jwright@gmail.com	51249657
485	Gregory	Gomez	xwhite@yahoo.com	96950522
486	Daniel	Parker	rickysmith@yahoo.com	94506627
487	Michael	Carpenter	dpetty@hotmail.com	37485599
488	Kelly	Robbins	john24@yahoo.com	59297108
489	Tina	Pruitt	uchang@hotmail.com	30836258
490	Stephanie	Wilcox	andersonamy@hotmail.com	20180945
491	Timothy	Grimes	thomasfrederick@yahoo.com	83416155
492	Christopher	Johnson	andrew60@hotmail.com	90000679
493	Sydney	Swanson	jodigrant@gmail.com	69717161
494	Grace	Arroyo	mmiddleton@hotmail.com	63835748
495	Michael	Perez	edward57@yahoo.com	32866472
496	Ariel	Reyes	rebeccahendricks@hotmail.com	25340325
497	Brandon	Day	tmiller@gmail.com	14029362
498	Anthony	King	lopezjose@hotmail.com	22039389
499	Jamie	Fry	sdavenport@hotmail.com	56142996
500	Hannah	Wilson	codysmith@yahoo.com	24731465
501	Andrew	Nichols	wendy99@gmail.com	31644781
502	Neil	Thompson	walterterri@yahoo.com	89174287
503	Julie	Yoder	anita58@hotmail.com	51613467
504	Lacey	Johnson	murillocynthia@yahoo.com	17282729
505	Michael	Doyle	james79@hotmail.com	49772615
506	Nicole	Miller	seanlevine@gmail.com	34377972
507	Daniel	Gutierrez	jeffhayes@hotmail.com	43846028
508	Shannon	Ellis	cmay@hotmail.com	60063015
509	Stephen	Russell	jeffmurphy@yahoo.com	80115144
510	Melissa	Vincent	emarshall@gmail.com	15689643
511	Amanda	Christensen	robert77@gmail.com	26883839
512	Charles	Spencer	youngcarol@hotmail.com	97462200
513	Kaitlyn	Macias	baileybeth@gmail.com	58117138
514	Wesley	House	david20@gmail.com	64390488
515	Lindsey	Soto	twatkins@gmail.com	82170608
516	Jessica	Price	melaniewong@yahoo.com	29402834
517	Steven	Gordon	mooreterry@hotmail.com	44084070
518	Andrew	Smith	matthewstyler@gmail.com	53954635
519	Jacob	Johnson	jenkinseric@gmail.com	44323901
520	Brian	Gibson	eallen@hotmail.com	11274899
521	Jason	Johnson	vreynolds@hotmail.com	93561501
522	James	Conrad	brianna91@yahoo.com	24983772
523	Diana	White	popemichael@hotmail.com	53600060
524	Faith	Smith	djohnson@yahoo.com	81428335
525	Catherine	Navarro	jonathan20@gmail.com	69121525
526	John	Rose	atkinsaustin@hotmail.com	50160483
527	Colleen	Taylor	melanie41@gmail.com	94917328
528	Rachel	Todd	bramirez@yahoo.com	76666836
529	Abigail	Owens	nasherika@hotmail.com	87326964
530	Jessica	Sanchez	shelia23@yahoo.com	26371541
531	Joseph	Harris	adamsheather@yahoo.com	40115543
532	Christina	Shaffer	michael32@yahoo.com	92545656
533	Mark	Lang	jasminebailey@gmail.com	37993063
534	John	Anderson	fsingleton@hotmail.com	77359431
535	Jessica	Mckinney	ilarson@yahoo.com	23827778
536	Carl	Vasquez	charles51@yahoo.com	77098734
537	Bradley	Perry	carl95@hotmail.com	76891891
538	Noah	Martinez	brianwarren@gmail.com	41510087
539	Robert	Phillips	richardsonlatasha@gmail.com	27911322
540	Terri	Humphrey	michelle82@gmail.com	65055289
541	Ariana	Cruz	esparzaamy@yahoo.com	54652148
542	Diana	Mathews	reevesrodney@hotmail.com	33878958
543	Andrew	Johnson	robyndonovan@hotmail.com	40586489
544	Brandon	Williams	brian43@hotmail.com	61527615
545	Haley	Henry	simpsonjoel@gmail.com	76492839
546	Shannon	Estes	jacob49@gmail.com	57650973
547	Joel	Taylor	bryan49@gmail.com	42538286
548	Joseph	Gonzalez	qclark@yahoo.com	63806147
549	Amanda	Sanford	annaellis@hotmail.com	89592513
550	Leslie	Grant	carlsonchristy@yahoo.com	55849627
551	Christopher	Nelson	tracismith@hotmail.com	23730479
552	Micheal	Barton	garciamary@gmail.com	29210257
553	Brittany	Rodriguez	ymartin@gmail.com	24460315
554	Kevin	Banks	howard63@hotmail.com	27243185
555	Cindy	Jordan	jonessara@yahoo.com	79110491
556	Kimberly	Carr	zachary84@yahoo.com	43580545
557	Danielle	Shaw	sstephenson@yahoo.com	81804550
558	Jennifer	Moore	hrhodes@yahoo.com	18237595
559	Connie	Perez	simonjason@yahoo.com	37172535
560	Mark	Yu	echan@gmail.com	42148896
561	Hailey	Bates	justinmorton@gmail.com	61811154
562	Alexis	Bright	kristenjohnson@hotmail.com	40150564
563	Gina	Ramirez	jacob66@gmail.com	24448450
564	Gloria	Navarro	lyork@gmail.com	57198827
565	Paula	Taylor	karen60@yahoo.com	87554675
566	Mark	Hudson	duranleah@hotmail.com	37370013
567	Melanie	Kennedy	xwhite@hotmail.com	90588638
568	Ashley	Williams	meaganbeck@yahoo.com	30754240
569	Latoya	Flowers	sheila16@gmail.com	26063205
570	Marc	Baxter	joshua77@gmail.com	10268283
571	David	Bennett	hamiltonandrew@gmail.com	61043766
572	Peter	Whitaker	thomasmichelle@hotmail.com	18237981
573	Anthony	Meyer	randy69@hotmail.com	49910661
574	Ricky	Powers	stricklandashley@gmail.com	91028182
575	James	Perez	dmaldonado@hotmail.com	54013809
576	Guy	Adkins	thill@hotmail.com	17375362
577	Debra	Wilson	wbrown@gmail.com	64884861
578	Robert	Bruce	plopez@yahoo.com	41265899
579	Joshua	Wheeler	shelleytaylor@hotmail.com	27084882
580	Ryan	Banks	kevin93@hotmail.com	28047755
581	James	Evans	stevenriggs@hotmail.com	14450132
582	Laura	Hamilton	radams@yahoo.com	68382149
583	Amanda	York	rangelamanda@gmail.com	33082086
584	Ashley	Ramirez	annadiaz@gmail.com	57593440
585	Hannah	Lewis	jhill@yahoo.com	33911382
586	Crystal	Brown	shafferrobin@yahoo.com	16762089
587	Valerie	Rice	smithkyle@yahoo.com	71588327
588	Jennifer	Moore	aguilarsamuel@hotmail.com	22759073
589	Kimberly	Wilson	burtondavid@hotmail.com	93134336
590	Alicia	Martinez	christy39@hotmail.com	20439644
591	Catherine	Williams	david18@gmail.com	67747217
592	Melinda	Harris	tpalmer@hotmail.com	82313778
593	Harold	Thompson	espinozawendy@hotmail.com	78284611
594	Ronald	Fernandez	steven36@yahoo.com	46217839
595	Melissa	Taylor	vgonzalez@yahoo.com	60896934
596	Timothy	Weiss	danielgeorge@gmail.com	29734849
597	Joseph	Simmons	james71@hotmail.com	97573058
598	Dave	Lewis	william82@gmail.com	22140235
599	Karen	Hughes	hraymond@yahoo.com	26510168
600	Samuel	Cross	christopherblack@hotmail.com	65007864
601	Natalie	Olsen	smithrobert@hotmail.com	95164811
602	Roger	Harvey	nathan12@yahoo.com	15564336
603	Michael	Martinez	griffithchelsea@hotmail.com	23885720
604	Justin	Henderson	wilsonsusan@hotmail.com	52449248
605	Kevin	Collins	matthewgraham@yahoo.com	31282906
606	Andrew	Dalton	yolandataylor@gmail.com	56003679
607	Craig	Brandt	faguirre@yahoo.com	26588193
608	Sarah	Jones	jimenezdonna@gmail.com	51130152
609	Miranda	Martinez	amandagreen@hotmail.com	78108872
610	Kathleen	Robinson	boydnicole@yahoo.com	65772388
611	Stephanie	Bryant	jessica83@yahoo.com	16275311
612	Angela	Martinez	andrewhiggins@yahoo.com	88697189
613	Shirley	Aguilar	jacksonantonio@gmail.com	42716232
614	Jonathan	Rose	cmoore@yahoo.com	30456743
615	Gary	Thomas	ghernandez@yahoo.com	94610759
616	Nicholas	Thompson	anageorge@yahoo.com	35455526
617	Dennis	Owens	colliermarcus@yahoo.com	23339963
618	Diana	Stewart	cynthia62@yahoo.com	83697746
619	Angela	Rodriguez	pcollier@gmail.com	86756344
620	Jenna	Parker	dean00@gmail.com	38292606
621	Victoria	Jackson	tammy98@yahoo.com	39628453
622	Andrea	Frye	william73@yahoo.com	62637751
623	Johnathan	Sanchez	jeffery97@hotmail.com	17817152
624	Edward	Rivera	william96@yahoo.com	34758646
625	Erica	Horne	gordoncandice@hotmail.com	10283027
626	James	King	heidirobinson@yahoo.com	12074060
627	John	Martinez	ojohnson@gmail.com	77676165
628	Sheila	Kelly	lauren36@gmail.com	27526200
629	Mary	Peterson	sextonanthony@gmail.com	85023887
630	Katherine	Murray	boliver@yahoo.com	21552666
631	Adam	Dixon	bmorgan@gmail.com	65062022
632	Laura	Stokes	troy53@yahoo.com	46871755
633	Caitlyn	Jacobs	aevans@hotmail.com	77902492
634	Joseph	Smith	qwatts@gmail.com	46813490
635	Robin	Williamson	samuel16@hotmail.com	62128055
636	Andrew	Smith	danielsmith@yahoo.com	15966102
637	Sean	Anderson	angela91@hotmail.com	60586440
638	Ariel	Rangel	alexander59@yahoo.com	61568290
639	Erik	Griffin	halltodd@gmail.com	68831616
640	Amber	Griffin	brad93@yahoo.com	80062479
641	Mario	Harris	qlowe@gmail.com	52201111
642	Lisa	Garcia	cmccall@hotmail.com	33635952
643	Brett	Robinson	andrea75@yahoo.com	10236583
644	Victoria	Brown	uarnold@yahoo.com	35534606
645	Jennifer	Little	alicia31@gmail.com	26132058
646	George	Smith	ashleychan@yahoo.com	84878280
647	Timothy	Clark	david68@yahoo.com	78636291
648	Victoria	Beck	ronaldhubbard@yahoo.com	58245396
649	Jenna	Marquez	mariahvasquez@gmail.com	87022170
650	David	Mcknight	russogary@yahoo.com	25121526
651	Gabrielle	Adams	zingram@hotmail.com	68019052
652	David	Dougherty	rebeccalewis@yahoo.com	40223564
653	Nicole	Parker	carol59@gmail.com	21221074
654	Monica	Graham	wangpeter@gmail.com	32214764
655	Robin	Hodges	karroyo@yahoo.com	19774338
656	David	Mann	michelleharmon@yahoo.com	32665577
657	John	Patterson	larsentiffany@yahoo.com	51640900
658	Stephen	Mccormick	samuel48@gmail.com	73748966
659	Anthony	Howard	curtis89@hotmail.com	15390801
660	Michael	Doyle	ocummings@yahoo.com	22358171
661	Hannah	Johnson	allentiffany@yahoo.com	62104429
662	David	Carr	jdonovan@yahoo.com	58415932
663	Jennifer	Mcdonald	curtisgomez@gmail.com	27903075
664	Michael	Mendoza	markhines@yahoo.com	58343358
665	Kristen	Shaffer	billybryant@yahoo.com	68227264
666	Samuel	Miller	garciaanthony@yahoo.com	18862989
667	Alexandra	Jones	lindseymcdowell@gmail.com	64286585
668	Juan	Nichols	fwilson@yahoo.com	28816930
669	Cindy	Todd	smithjohnny@hotmail.com	85439125
670	Amanda	Carter	wayne19@hotmail.com	23819432
671	Luke	Massey	davisjames@gmail.com	30466189
672	Amy	Jones	mharris@gmail.com	58642608
673	Lee	Hill	lmiller@gmail.com	94709609
674	Heather	Salas	larryeverett@hotmail.com	97309821
675	Adam	Cooley	lisa54@hotmail.com	50972911
676	Juan	Miller	greenstephanie@hotmail.com	82932519
677	Leah	Lewis	kevinhoward@gmail.com	73779397
678	Breanna	Miller	gortega@yahoo.com	71902397
679	Colin	Richard	misty50@yahoo.com	11035787
680	Laura	Smith	mejiakathryn@hotmail.com	43223463
681	Samuel	Lee	robertmurphy@hotmail.com	97416753
682	Kara	Bentley	jose59@hotmail.com	40655474
683	Teresa	Mcmahon	michael25@yahoo.com	30144335
684	Kaitlin	Garcia	zross@hotmail.com	36409677
685	Dakota	Santiago	rachel16@gmail.com	20092782
686	Jennifer	Chung	leehamilton@gmail.com	76095544
687	Mark	Berger	johnthomas@hotmail.com	17280934
688	William	Taylor	karenguerra@yahoo.com	82126403
689	Natalie	Hurst	ethompson@yahoo.com	58248702
690	Maria	Smith	michael75@gmail.com	94925688
691	Frank	Edwards	juanclark@hotmail.com	43652555
692	Kathleen	Richards	andrea49@hotmail.com	24946333
693	Bryce	Carr	wellsheather@hotmail.com	61265296
694	Ashley	Hamilton	randall22@hotmail.com	67243488
695	Larry	Sanders	heathermoreno@hotmail.com	45334530
696	Shannon	Wong	williamjones@gmail.com	28245329
697	Veronica	Anthony	maciasmindy@yahoo.com	84901672
698	Shane	Aguilar	andreaanderson@yahoo.com	41982254
699	Shannon	Norris	alec54@gmail.com	39383414
700	Steven	Rodriguez	curtisking@hotmail.com	66500918
701	Christine	Carter	rmurphy@gmail.com	67299266
702	Kevin	Bowers	willisjustin@yahoo.com	65707502
703	Samantha	Patel	porterzachary@yahoo.com	50394149
704	Patrick	Sheppard	qvillegas@gmail.com	33183834
705	Janice	Wood	jennifershelton@yahoo.com	47160871
706	Olivia	Preston	kathleen84@yahoo.com	74227889
707	Heather	Andrade	millsamanda@yahoo.com	22047819
708	Linda	Johnson	julie09@yahoo.com	68191302
709	Diana	Daniels	mckinneyjermaine@gmail.com	16015116
710	Dale	Morris	ghampton@yahoo.com	71965032
711	Ronald	Harris	michaelchavez@yahoo.com	96435294
712	Veronica	Garza	smithtina@gmail.com	30392495
713	Anthony	Smith	mcarlson@yahoo.com	85412697
714	Nicholas	Chan	flee@gmail.com	48735901
715	Sean	Hatfield	douglasjohnson@yahoo.com	27619642
716	Lisa	Morris	andrew37@gmail.com	26848980
717	Angelica	Martinez	vmunoz@yahoo.com	28123992
718	Carla	Cuevas	hollowaytodd@yahoo.com	59715278
719	Stephanie	Hamilton	oguerra@gmail.com	74660874
720	Dustin	Osborn	lindacox@hotmail.com	95621329
721	Yvonne	Daniels	becky19@yahoo.com	98502315
722	James	Herring	ypeterson@hotmail.com	16015074
723	David	Green	eallen@yahoo.com	47275495
724	William	Baxter	marksloan@hotmail.com	52463083
725	Tyler	Bernard	edwardsthomas@gmail.com	20320265
726	Chris	Lopez	christopher38@yahoo.com	63574671
727	Abigail	Santos	gary23@gmail.com	77402308
728	Jacob	White	andersongina@yahoo.com	84725541
729	Megan	Castro	fharris@gmail.com	50678052
730	Tony	Martinez	kellymassey@yahoo.com	16945144
731	Katelyn	Griffith	elizabeth58@hotmail.com	39956752
732	Catherine	Knight	juan73@hotmail.com	23728907
733	Mark	Banks	linkaren@yahoo.com	82801231
734	Jessica	Berg	allenlarson@hotmail.com	80350910
735	Rodney	Paul	heidi37@hotmail.com	42731532
736	Crystal	Walker	brian91@yahoo.com	27320629
737	Rebecca	Taylor	kenneth58@hotmail.com	37628281
738	Jamie	Cortez	autumnsutton@yahoo.com	86436117
739	Joshua	Gonzalez	ellisaaron@yahoo.com	30786295
740	Spencer	Stevens	michaelsoto@hotmail.com	67087574
741	Christina	Huerta	michelleproctor@yahoo.com	81761213
742	Joseph	Murray	nbaker@yahoo.com	18312702
743	Lisa	Rivera	scottjo@yahoo.com	50894796
744	Keith	Campbell	fernandotapia@yahoo.com	49183266
745	Janice	Cantrell	scottjohn@hotmail.com	37707128
746	Victoria	Brown	robinsonandrea@hotmail.com	22333701
747	George	White	xmedina@hotmail.com	41320254
748	David	Santana	katelyn39@hotmail.com	42293286
749	Timothy	Mcneil	richardsonvalerie@hotmail.com	22177284
750	Angela	Carter	victoria11@hotmail.com	70382589
751	Sue	Brooks	iandersen@yahoo.com	66680698
752	Victoria	Taylor	jefferywelch@hotmail.com	27464582
753	Deanna	Mathews	bobbychapman@gmail.com	66613345
754	Anna	Young	lisa91@hotmail.com	44349538
755	Amanda	Byrd	alyssabuck@yahoo.com	73687392
756	Barry	Morales	ymartinez@yahoo.com	93753779
757	Amber	Welch	jimmyjackson@yahoo.com	38699427
758	Angelica	Cooper	christopherreed@hotmail.com	10062685
759	Brian	Liu	nclay@gmail.com	83210320
760	Sharon	Jones	taylormoore@gmail.com	68381314
761	Cory	Jenkins	sonya96@gmail.com	20368957
762	Joseph	Martinez	pierceeric@hotmail.com	50641593
763	Karina	Robinson	millerelizabeth@yahoo.com	70007301
764	Julia	Hernandez	jennifer15@yahoo.com	52990557
765	Angela	Lopez	ngray@gmail.com	93917362
766	Nicole	Miller	pking@yahoo.com	31623234
767	Wendy	George	rachelfuentes@yahoo.com	36353785
768	Stacy	Park	deanna18@gmail.com	18775778
769	Joseph	Martinez	achen@hotmail.com	39174966
770	Andrew	Andrade	rromero@gmail.com	18571988
771	Diana	Thomas	pneal@yahoo.com	28272007
772	Amy	Powers	qharvey@gmail.com	61534216
773	Anthony	Blair	perryteresa@hotmail.com	59901832
774	Victoria	Anderson	brauncarmen@yahoo.com	35173982
775	Abigail	Ramos	stewartsherry@hotmail.com	27593215
776	Diana	Bray	irussell@yahoo.com	72458136
777	Sharon	Johnson	emilyprice@gmail.com	18033013
778	Alyssa	Rice	mooreandre@yahoo.com	62866020
779	Kayla	Henderson	jerome86@yahoo.com	97821012
780	Aaron	Lewis	jean33@gmail.com	34734690
781	Matthew	Baldwin	turnersteven@yahoo.com	38011276
782	Brian	Richardson	newmanlinda@yahoo.com	26219415
783	Hunter	Wright	timothy86@hotmail.com	16841003
784	Melissa	Navarro	kleinerin@gmail.com	71792310
785	Jacob	Stout	nicole44@yahoo.com	82104911
786	Barbara	Smith	ogaines@gmail.com	63529098
787	Donna	Maxwell	johnrobinson@hotmail.com	25342035
788	Jennifer	Anderson	trichardson@hotmail.com	73002027
789	Lacey	Gates	michael40@yahoo.com	38954472
790	Christopher	Schmidt	wpineda@hotmail.com	80435025
791	Emily	Cruz	lcarrillo@hotmail.com	88429156
792	Willie	Snow	sandrahill@gmail.com	35999378
793	Joshua	Barr	kimberly17@hotmail.com	54683095
794	Randall	Perez	ismith@gmail.com	25244053
795	Kimberly	Nelson	singletoncatherine@gmail.com	39082358
796	Joanna	Dorsey	jmayo@hotmail.com	34724366
797	Kelly	Duncan	rcoleman@gmail.com	35435237
798	Christopher	Curtis	greenechristina@hotmail.com	53770015
799	John	Watts	tammy19@hotmail.com	52335338
800	Daniel	Vega	harriskirsten@yahoo.com	61797562
801	Ashley	Norton	zachary11@gmail.com	19003748
802	Claudia	Miller	fnichols@hotmail.com	77955806
803	Adam	Gordon	cgreen@yahoo.com	95520230
804	Benjamin	Jenkins	usanders@gmail.com	28443901
805	Amanda	Peck	kanesteven@yahoo.com	56261623
806	Stephanie	Johnson	scottregina@hotmail.com	52449096
807	Scott	Jordan	camposrachel@yahoo.com	34904156
808	Bianca	Byrd	fduncan@hotmail.com	94574475
809	Jerry	Jackson	biancacopeland@yahoo.com	75439470
810	Sean	Bailey	dawn55@hotmail.com	62404926
811	Frederick	Stewart	wroberts@yahoo.com	17790698
812	Melissa	Bennett	lawrence42@yahoo.com	92902719
813	Bryan	Garcia	jbond@yahoo.com	34968060
814	Thomas	Jones	jesse25@hotmail.com	53264565
815	Michael	Avila	turnermary@hotmail.com	85848652
816	Earl	Ritter	anthony76@yahoo.com	47949164
817	Patrick	Foley	amber11@gmail.com	45872262
818	Robert	Sullivan	shirleygrant@yahoo.com	20938634
819	William	Jackson	zhardin@gmail.com	20698807
820	Eric	Hoffman	sjohnson@yahoo.com	94986899
821	Lauren	Martinez	jenniferwoods@hotmail.com	12887942
822	Kimberly	Brown	rhondaharris@hotmail.com	14322586
823	Kathleen	Wilkins	elizabeth69@yahoo.com	64490950
824	Joseph	Garcia	masonvictoria@hotmail.com	32251172
825	James	Wang	smithmichelle@hotmail.com	16278262
826	Teresa	Buck	lopezwilliam@yahoo.com	61447542
827	Rebecca	Gray	ginarivera@yahoo.com	59466419
828	Justin	Williams	kingmarc@hotmail.com	12298643
829	Martin	Wilson	shannon12@gmail.com	42500081
830	Cameron	Waters	mnewman@gmail.com	20195700
831	Andre	Garcia	igardner@hotmail.com	35179888
832	Joseph	Richards	dylanroberson@yahoo.com	61146486
833	Emily	Smith	brooksheather@hotmail.com	67850706
834	Ricky	Ryan	kyle24@gmail.com	29916408
835	Michael	Williams	rogersbrittany@gmail.com	24513548
836	Kayla	Robinson	marie25@hotmail.com	41489244
837	Dawn	Gross	coopertheresa@yahoo.com	39210359
838	Anthony	Gutierrez	mwilson@hotmail.com	36424249
839	Natalie	Clark	bakerjimmy@yahoo.com	23642557
840	Melinda	Fuller	ronnieponce@yahoo.com	81620704
841	Bethany	Anderson	hammondjacqueline@hotmail.com	80574407
842	Heather	Moon	carlos74@gmail.com	20575671
843	Chase	Frederick	andre44@gmail.com	78681156
844	Gina	Smith	normanamanda@hotmail.com	86301580
845	Stephanie	Richards	allensierra@hotmail.com	54607220
846	Dustin	Wright	curtis98@gmail.com	99876059
847	Jeffrey	Mata	browntina@hotmail.com	55417653
848	Rebecca	Avila	codyvasquez@hotmail.com	59674623
849	Robert	Dixon	jamiepalmer@yahoo.com	12461751
850	Daniel	White	teresa67@gmail.com	72868358
851	Caroline	Peterson	rpalmer@yahoo.com	21914976
852	Jeffrey	Hernandez	pamela37@gmail.com	69202964
853	Amber	Taylor	rowejennifer@hotmail.com	14587146
854	Karen	Roth	deborahsmith@yahoo.com	76983896
855	Larry	Perez	seanlewis@yahoo.com	10182144
856	Theresa	Riley	brendahopkins@yahoo.com	47869683
857	Steven	Williams	stephensamy@gmail.com	83332365
858	Austin	Rogers	ashleydavis@gmail.com	29324695
859	Heather	Gonzalez	hillstacey@hotmail.com	61894202
860	Richard	Huber	vrivas@gmail.com	41500469
861	Courtney	Dodson	james34@yahoo.com	87377980
862	Steven	Lopez	heather08@hotmail.com	16866600
863	Thomas	Day	billyhunter@yahoo.com	34773867
864	Michael	Solomon	robinsonhenry@hotmail.com	92333493
865	John	Coleman	jessicalee@gmail.com	15899321
866	Angela	Daniels	dbrown@yahoo.com	98062056
867	Raymond	Anthony	brojas@gmail.com	50768935
868	David	Collins	tgarcia@hotmail.com	37561045
869	Derrick	Palmer	william02@gmail.com	75714691
870	Sandra	Novak	heather91@yahoo.com	12649895
871	Peter	Nelson	hillrobert@hotmail.com	47979181
872	Cameron	Myers	jcarney@hotmail.com	97688716
873	Carla	Dixon	sean15@yahoo.com	14025778
874	Timothy	Lara	chapmandaniel@gmail.com	37822675
875	Steven	Townsend	cfernandez@hotmail.com	91908802
876	Willie	Ramos	jmorse@gmail.com	83748466
877	Tara	Kennedy	franklinwilliams@gmail.com	72650779
878	Laura	Hancock	davidle@yahoo.com	87914444
879	Stephen	Snyder	bishopmark@yahoo.com	91799044
880	Amanda	Rodriguez	watkinsthomas@gmail.com	32437861
881	Kristina	Brown	nealbeth@gmail.com	18678593
882	Corey	Poole	llowery@hotmail.com	20834294
883	Julie	Crawford	rsmith@gmail.com	69245641
884	Jessica	Lyons	kharmon@gmail.com	50362680
885	Meghan	Johnson	carol51@yahoo.com	15286267
886	Luis	Bowman	robertwalls@hotmail.com	79588016
887	Nathaniel	Jones	hjohnson@hotmail.com	43964854
888	Joe	Owens	ramosjennifer@gmail.com	60514168
889	Mark	Whitehead	davidstein@hotmail.com	80165627
890	Mark	Brown	william84@hotmail.com	20023319
891	Misty	Bruce	kbenton@yahoo.com	40864686
892	Melody	Meyer	nparker@hotmail.com	46421200
893	Jason	Burch	erika42@yahoo.com	39160662
894	George	White	ronnie67@hotmail.com	97809783
895	Willie	Walker	crawforddustin@hotmail.com	59616025
896	Nicole	Mcclain	xkirk@gmail.com	48730900
897	Caroline	Blake	connie44@gmail.com	88067005
898	Devin	Pratt	dramirez@gmail.com	54830070
899	Justin	Jackson	graydavid@gmail.com	17657783
900	Michelle	White	valdezmitchell@hotmail.com	56856179
901	Jennifer	Hernandez	gibsonkenneth@yahoo.com	68614326
902	Kristin	Vargas	jonesjustin@hotmail.com	55784063
903	Deborah	Anderson	kwashington@hotmail.com	96498387
904	Megan	Kennedy	beth51@gmail.com	18116960
905	Sharon	Jones	scott81@gmail.com	66144301
906	Maria	Morris	arellanomadeline@yahoo.com	33782093
907	Teresa	Reyes	georgestephanie@gmail.com	67197449
908	Christina	Chang	bcain@yahoo.com	56140197
909	Lisa	Shepherd	hbrown@yahoo.com	82277091
910	Garrett	Boyd	estesann@gmail.com	18050917
911	Madison	Combs	robinsonnathaniel@gmail.com	86018116
912	Andrew	Stewart	joshua91@gmail.com	52117698
913	Katherine	Ibarra	leekaren@gmail.com	47131264
914	Gabriel	Hendrix	qruiz@gmail.com	47527907
915	Margaret	Brown	ashleycoleman@hotmail.com	45825702
916	Rachel	Benton	rebeccabutler@yahoo.com	20918349
917	Scott	Brown	danielledavis@hotmail.com	14809165
918	Kevin	Howell	joshuahayes@yahoo.com	46439185
919	Scott	Farmer	boothjaclyn@hotmail.com	88355617
920	Nicole	Mills	caroltaylor@gmail.com	19199567
921	Denise	Martinez	scotttaylor@gmail.com	50249365
922	Larry	Hall	jyork@gmail.com	68846881
923	Yvonne	Ortiz	zhenderson@yahoo.com	88212919
924	Nathan	Cohen	cjames@hotmail.com	73193045
925	Melinda	Mosley	drakedavid@gmail.com	46068692
926	Steven	Calderon	stephanie40@yahoo.com	41683912
927	Elizabeth	Smith	iwilliams@yahoo.com	59207610
928	Hannah	Williams	ualvarez@hotmail.com	64567187
929	Peter	Richardson	jamesgallagher@hotmail.com	40242921
930	Michael	Moore	rodriguezjose@hotmail.com	44059518
931	Trevor	Hinton	erin89@hotmail.com	40665745
932	Lindsay	Alvarado	uvasquez@yahoo.com	14706324
933	Kevin	Gonzalez	stevengordon@gmail.com	76323076
934	Chelsea	Stokes	miguelgilmore@yahoo.com	55742970
935	Justin	Murphy	perezsarah@yahoo.com	46911068
936	Nancy	Wise	mitchell56@hotmail.com	34655442
937	Gregory	Lee	jcox@gmail.com	38994018
938	James	Sanchez	kathrynlambert@gmail.com	90766357
939	Roy	Smith	bsteele@gmail.com	88260423
940	Terrance	Rocha	wmurphy@gmail.com	92927607
941	Denise	Coleman	loganbrandt@gmail.com	28854121
942	James	West	madisoncobb@hotmail.com	34034081
943	Kimberly	Beltran	doylepamela@yahoo.com	23844133
944	Nancy	Browning	ochoaronald@gmail.com	46516760
945	Edwin	Walker	bsilva@yahoo.com	16612807
946	Kimberly	Wiley	craig95@hotmail.com	57387213
947	Michael	Landry	sarahtaylor@hotmail.com	53010519
948	Cameron	Wright	gsandoval@gmail.com	63863792
949	Holly	Cardenas	brianahughes@yahoo.com	77743436
950	Robert	Simmons	kwilliams@gmail.com	75568087
951	Bradley	Callahan	kaitlyn34@yahoo.com	93125818
952	Jennifer	Fischer	lgomez@hotmail.com	40253838
953	John	Russell	ramirezallen@hotmail.com	23566862
954	Kevin	Thompson	stephen16@gmail.com	67992787
955	Scott	Richardson	bakerjeremiah@hotmail.com	70613547
956	Michelle	Harris	cheryl94@yahoo.com	59648036
957	April	Barr	nancy56@gmail.com	20850100
958	Daniel	Tucker	valenciabeth@gmail.com	10287905
959	Ashley	Cooper	xwright@gmail.com	10226865
960	Mary	Barton	fshah@yahoo.com	55336452
961	Teresa	Walker	dunlapdavid@hotmail.com	43174660
962	Frank	Sanchez	danielsheppard@gmail.com	28715486
963	Patrick	Hubbard	davidtaylor@yahoo.com	67250032
964	David	Washington	kimhernandez@hotmail.com	73410695
965	Tammy	Griffin	farleyholly@gmail.com	25008753
966	Hannah	Summers	wallaceerica@hotmail.com	61062779
967	Natasha	Ellis	wrighthannah@yahoo.com	54955941
968	Matthew	Holden	seanlopez@gmail.com	36388402
969	Sharon	Patton	kelly67@yahoo.com	30632551
970	Kelly	Jensen	zcole@hotmail.com	76308687
971	Edwin	Wilson	joseph66@gmail.com	83291257
972	Robert	Campbell	megandudley@gmail.com	37170262
973	Tanya	Martinez	walldavid@yahoo.com	15573893
974	Andrew	Rodriguez	wellschristopher@yahoo.com	27729514
975	Jason	Wu	smithmichael@gmail.com	89615169
976	Tracie	Macias	ashley25@gmail.com	75334306
977	Jeanne	White	carlosanderson@gmail.com	35837910
978	John	Wells	traci55@yahoo.com	65685409
979	Johnny	Gonzales	wardmichael@yahoo.com	22005777
980	Ariel	Fowler	drose@hotmail.com	27809079
981	Stephanie	Hamilton	lori77@yahoo.com	94928395
982	Joel	Fox	deleonricky@hotmail.com	42391163
983	Richard	Brown	brownkevin@yahoo.com	49329142
984	Thomas	Petty	changdonald@yahoo.com	28415628
985	Karen	Davis	fvasquez@hotmail.com	90722735
986	Veronica	Garcia	tbarrett@hotmail.com	40542008
987	Joshua	Moore	ebrock@yahoo.com	80048528
988	Sherry	Herrera	nicholserika@hotmail.com	97933703
989	Hector	Barrera	katiemcdowell@hotmail.com	62460579
990	Sharon	Hayes	sheilamoore@yahoo.com	11151502
991	Brent	Murray	eric68@gmail.com	48979736
992	Tina	Martinez	dillonbutler@hotmail.com	67822382
993	Victoria	Rasmussen	joshua90@yahoo.com	97294153
994	Edward	Bennett	wilsonchristopher@gmail.com	74378230
995	Matthew	Orr	rguzman@gmail.com	26288134
996	Nicholas	Swanson	bpierce@gmail.com	49892657
997	Tracey	Jones	johnsonluis@gmail.com	65907478
998	Kim	Wood	ramosmary@hotmail.com	28925989
999	Matthew	Ramirez	antoniojordan@yahoo.com	78370696
1000	Jessica	Evans	cjacobs@yahoo.com	41663962
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, true);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 4, true);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 36, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, true);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 2, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 10, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 9, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 22, true);


--
-- Name: libros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.libros_id_seq', 6, true);


--
-- Name: prestamos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prestamos_id_seq', 1, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: libros libros_nombre_edicion_autor_5f9d4e23_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libros
    ADD CONSTRAINT libros_nombre_edicion_autor_5f9d4e23_uniq UNIQUE (nombre, edicion, autor);


--
-- Name: libros libros_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libros
    ADD CONSTRAINT libros_pkey PRIMARY KEY (id);


--
-- Name: prestamos prestamos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prestamos
    ADD CONSTRAINT prestamos_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_correo_dni_7a3f231e_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_dni_7a3f231e_uniq UNIQUE (correo, dni);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: prestamos_libro_id_725c326a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX prestamos_libro_id_725c326a ON public.prestamos USING btree (libro_id);


--
-- Name: prestamos_usuario_id_88adf907; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX prestamos_usuario_id_88adf907 ON public.prestamos USING btree (usuario_id);


--
-- Name: usuarios_correo_fd9ad5_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX usuarios_correo_fd9ad5_idx ON public.usuarios USING btree (correo, dni);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: prestamos prestamos_libro_id_725c326a_fk_libros_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prestamos
    ADD CONSTRAINT prestamos_libro_id_725c326a_fk_libros_id FOREIGN KEY (libro_id) REFERENCES public.libros(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: prestamos prestamos_usuario_id_88adf907_fk_usuarios_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prestamos
    ADD CONSTRAINT prestamos_usuario_id_88adf907_fk_usuarios_id FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

