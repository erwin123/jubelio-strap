--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-04-19 16:26:53

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
-- TOC entry 202 (class 1259 OID 16394)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    "Id" integer NOT NULL,
    "ProductName" text,
    "ProductNo" text
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16397)
-- Name: product_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.product ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."product_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 205 (class 1259 OID 16431)
-- Name: product_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_detail (
    "Id" integer NOT NULL,
    "ProductNo" text,
    "Description" text,
    "ProductImg" text,
    "Stock" integer,
    "ProductName" text
);


ALTER TABLE public.product_detail OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16429)
-- Name: product_detail_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.product_detail ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."product_detail_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2823 (class 0 OID 16394)
-- Dependencies: 202
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product ("Id", "ProductName", "ProductNo") FROM stdin;
\.


--
-- TOC entry 2826 (class 0 OID 16431)
-- Dependencies: 205
-- Data for Name: product_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_detail ("Id", "ProductNo", "Description", "ProductImg", "Stock", "ProductName") FROM stdin;
\.


--
-- TOC entry 2832 (class 0 OID 0)
-- Dependencies: 203
-- Name: product_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."product_Id_seq"', 606, true);


--
-- TOC entry 2833 (class 0 OID 0)
-- Dependencies: 204
-- Name: product_detail_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."product_detail_Id_seq"', 511, true);


--
-- TOC entry 2696 (class 2606 OID 16438)
-- Name: product_detail product_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_detail
    ADD CONSTRAINT product_detail_pkey PRIMARY KEY ("Id");


-- Completed on 2020-04-19 16:26:54

--
-- PostgreSQL database dump complete
--

