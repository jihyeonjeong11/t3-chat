--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Homebrew)
-- Dumped by pg_dump version 14.6 (Homebrew)

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

--
-- Name: Theme; Type: TYPE; Schema: public; Owner: jihyeonjeong
--

CREATE TYPE public."Theme" AS ENUM (
    'light',
    'dark'
);


ALTER TYPE public."Theme" OWNER TO jihyeonjeong;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: jihyeonjeong
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public."Account" OWNER TO jihyeonjeong;

--
-- Name: Conversation; Type: TABLE; Schema: public; Owner: jihyeonjeong
--

CREATE TABLE public."Conversation" (
    id text NOT NULL,
    "lastMessageId" text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    title text
);


ALTER TABLE public."Conversation" OWNER TO jihyeonjeong;

--
-- Name: ConversationUser; Type: TABLE; Schema: public; Owner: jihyeonjeong
--

CREATE TABLE public."ConversationUser" (
    "userId" text NOT NULL,
    "conversationId" text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ConversationUser" OWNER TO jihyeonjeong;

--
-- Name: Example; Type: TABLE; Schema: public; Owner: jihyeonjeong
--

CREATE TABLE public."Example" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Example" OWNER TO jihyeonjeong;

--
-- Name: Message; Type: TABLE; Schema: public; Owner: jihyeonjeong
--

CREATE TABLE public."Message" (
    id text NOT NULL,
    "messageText" text NOT NULL,
    "userId" text NOT NULL,
    "conversationId" text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Message" OWNER TO jihyeonjeong;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: jihyeonjeong
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO jihyeonjeong;

--
-- Name: User; Type: TABLE; Schema: public; Owner: jihyeonjeong
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp(3) without time zone,
    image text,
    username text,
    theme public."Theme" DEFAULT 'light'::public."Theme" NOT NULL
);


ALTER TABLE public."User" OWNER TO jihyeonjeong;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: jihyeonjeong
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO jihyeonjeong;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: jihyeonjeong
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
clgjdwws40003sieplyl0nsw6	clgjdwwr80000siep8zys2zde	oauth	google	112941912676653770624	1//0e-Y8qfchhl8GCgYIARAAGA4SNwF-L9IrypoDs1ueyHQgPC--86Ym895z0IlTFiPLpHgyVXM1MI-qn1pEKhAyfcVHFUkfedLFU6g	ya29.a0Ael9sCMi67phkV-r7RYU9NL7ZEA8_fWp39qqcB-cpsvLxZ1FGTIeuvl2B18PDkpSxe2xURJZEDMXBSgfPZvEluCJrOFYTQtXwG8p6o8aEHPcXS30Fr0J6XYT-rwO1oe4MtX0pvQnR29ePo2KGhu611SluhlxaCgYKATQSARASFQF4udJhN1xuoAnowLmAIpaKmBfDlA0163	1681651789	Bearer	https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid	eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk2OTcxODA4Nzk2ODI5YTk3MmU3OWE5ZDFhOWZmZjExY2Q2MWIxZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5ODQxMTU0OTIwODAtNmVjN25hNm9zOW4yYTYzbWtkaThtMTU2dTZnbWY2ODkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5ODQxMTU0OTIwODAtNmVjN25hNm9zOW4yYTYzbWtkaThtMTU2dTZnbWY2ODkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI5NDE5MTI2NzY2NTM3NzA2MjQiLCJlbWFpbCI6IndqZHdsZ3VzMTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJDRkd5U05aeWxwRXdOM1VuQ3JkOXhRIiwibmFtZSI6IlNhbCBKZW9uZyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhZZzQzTjBDcUdZdXAtcGttMkltN3pzcHg0WGJOLTBJVHlUZ2ctbj1zOTYtYyIsImdpdmVuX25hbWUiOiJTYWwiLCJmYW1pbHlfbmFtZSI6Ikplb25nIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2ODE2NDgxOTAsImV4cCI6MTY4MTY1MTc5MH0.n94sFdpvb8vJxEAs1ZQOVzIsNkPuXyTp_SgPOP031KZ6N3pfy70Wsskn5ELcgsSC8s8X1AQb9AG1R4Pc9hEFJ4G40B54z1padZB2qyqkWYfIsU2l_eZKMby1Oj2xvVN_Xfk_kJNESZADBX4FhrOpfAJQ30Fgnwq1ucU4i3KA8iiiQ19rijro8gFQr1Xpf4IK5UN65tYXDjGLMHyKaxal2hzqTNogDarnEAmU5TXBzAcYS-mey252N_QuJChrhAB-O9Y0QCHtXdZxkKGufdgSM5IyFp5pqjCTU6pzv0BHTlVwqGDBdR01i66ik3B4Ha8RdJT-GfVO-upz6c696A4yMA	\N
\.


--
-- Data for Name: Conversation; Type: TABLE DATA; Schema: public; Owner: jihyeonjeong
--

COPY public."Conversation" (id, "lastMessageId", "createdAt", title) FROM stdin;
clcojmpxo000lsiiokn9yg6v7	clcojn9xi000ysiio8wxud677	2023-01-09 17:29:55.015+09	\N
clcojmsxt000ssiion2k8i9gi	clcpfenzs0008siuxp1kbogll	2023-01-09 17:29:58.911+09	\N
clcn1so9c0004si0wiv9mmjmr	clgdjlner0001si6tqj0hmias	2023-01-08 16:22:53.517+09	\N
clgsxpgvk0001sifuiyqlzl2o	\N	2023-04-23 13:53:51.897+09	\N
\.


--
-- Data for Name: ConversationUser; Type: TABLE DATA; Schema: public; Owner: jihyeonjeong
--

COPY public."ConversationUser" ("userId", "conversationId", "createdAt") FROM stdin;
clcmmqz3k0000sizotchd7oha	clcn1so9c0004si0wiv9mmjmr	2023-01-08 16:22:53.517+09
clcmpmcq30005sizobr5oak56	clcn1so9c0004si0wiv9mmjmr	2023-01-08 16:22:53.517+09
clcojm5va000gsiio2uvfbrvk	clcojmpxo000lsiiokn9yg6v7	2023-01-09 17:29:55.015+09
clcojjogm000dsiioabx2x7in	clcojmpxo000lsiiokn9yg6v7	2023-01-09 17:29:55.015+09
clcojm5va000gsiio2uvfbrvk	clcojmsxt000ssiion2k8i9gi	2023-01-09 17:29:58.911+09
clcojjogm000dsiioabx2x7in	clcojmsxt000ssiion2k8i9gi	2023-01-09 17:29:58.911+09
clcojjogm000dsiioabx2x7in	clgsxpgvk0001sifuiyqlzl2o	2023-04-23 13:53:51.897+09
clgjdwwr80000siep8zys2zde	clgsxpgvk0001sifuiyqlzl2o	2023-04-23 13:53:51.897+09
\.


--
-- Data for Name: Example; Type: TABLE DATA; Schema: public; Owner: jihyeonjeong
--

COPY public."Example" (id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: jihyeonjeong
--

COPY public."Message" (id, "messageText", "userId", "conversationId", "createdAt") FROM stdin;
clcn1so9c0005si0wz7d0yedc	hi	clcmpmcq30005sizobr5oak56	clcn1so9c0004si0wiv9mmjmr	2023-01-08 16:22:53.517+09
clcn1tg2q0009si0wkw2izuqj	sup	clcmpmcq30005sizobr5oak56	clcn1so9c0004si0wiv9mmjmr	2023-01-08 16:23:29.565+09
clcoixnlj0002siio8mjegp70	1	clcmpmcq30005sizobr5oak56	clcn1so9c0004si0wiv9mmjmr	2023-01-09 17:10:25.572+09
clcoixo7d0005siio7o5jdqac	1	clcmpmcq30005sizobr5oak56	clcn1so9c0004si0wiv9mmjmr	2023-01-09 17:10:26.372+09
clcoixoox0008siio1dvo35ny	1	clcmpmcq30005sizobr5oak56	clcn1so9c0004si0wiv9mmjmr	2023-01-09 17:10:27.006+09
clcojbyrx000asiio7j0uq98f	2	clcmpmcq30005sizobr5oak56	clcn1so9c0004si0wiv9mmjmr	2023-01-09 17:21:33.257+09
clcojbzj4000csiiotg4lc6iw	1	clcmpmcq30005sizobr5oak56	clcn1so9c0004si0wiv9mmjmr	2023-01-09 17:21:34.236+09
clcojmpxo000nsiioh163qfc7	hello	clcojjogm000dsiioabx2x7in	clcojmpxo000lsiiokn9yg6v7	2023-01-09 17:29:55.015+09
clcojmsxt000usiio3bd3labi	this is message	clcojjogm000dsiioabx2x7in	clcojmsxt000ssiion2k8i9gi	2023-01-09 17:29:58.911+09
clcojn9xi000ysiio8wxud677	hi	clcojm5va000gsiio2uvfbrvk	clcojmpxo000lsiiokn9yg6v7	2023-01-09 17:30:20.93+09
clcondt770001si27bdnwz242	me	clcojm5va000gsiio2uvfbrvk	clcojmsxt000ssiion2k8i9gi	2023-01-09 19:14:57.807+09
clcondzte0004si275z2aq8ea	not	clcojjogm000dsiioabx2x7in	clcojmsxt000ssiion2k8i9gi	2023-01-09 19:15:06.381+09
clconf5s50006si27cxy5xj4k	message	clcojm5va000gsiio2uvfbrvk	clcojmsxt000ssiion2k8i9gi	2023-01-09 19:16:00.769+09
clconfl880002si9yd2bnp3ev	ee	clcojm5va000gsiio2uvfbrvk	clcojmsxt000ssiion2k8i9gi	2023-01-09 19:16:20.784+09
clconfn8h0004si9yoamzdykv	aa	clcojjogm000dsiioabx2x7in	clcojmsxt000ssiion2k8i9gi	2023-01-09 19:16:23.387+09
clconfx6o0001sia0u91wj2iv	hh	clcojjogm000dsiioabx2x7in	clcojmsxt000ssiion2k8i9gi	2023-01-09 19:16:36.261+09
clcong2m90004sia082vhahbn	ww	clcojjogm000dsiioabx2x7in	clcojmsxt000ssiion2k8i9gi	2023-01-09 19:16:43.311+09
clcong5ln0006sia0krv5ln38	hello	clcojm5va000gsiio2uvfbrvk	clcojmsxt000ssiion2k8i9gi	2023-01-09 19:16:47.19+09
clcopqt300001simxm4j9pzfb	buddy	clcojjogm000dsiioabx2x7in	clcojmsxt000ssiion2k8i9gi	2023-01-09 20:21:03.395+09
clcpfe0zd0001siuxhlwzoc9c	안녕하세요	clcojm5va000gsiio2uvfbrvk	clcojmsxt000ssiion2k8i9gi	2023-01-10 08:18:57.134+09
clcpfe7wq0004siuxg63dtu62	안녕	clcojjogm000dsiioabx2x7in	clcojmsxt000ssiion2k8i9gi	2023-01-10 08:19:06.108+09
clcpfeene0006siux910wh79a	뭐하니	clcojjogm000dsiioabx2x7in	clcojmsxt000ssiion2k8i9gi	2023-01-10 08:19:14.845+09
clcpfenzs0008siuxp1kbogll	안녕히가세요	clcojm5va000gsiio2uvfbrvk	clcojmsxt000ssiion2k8i9gi	2023-01-10 08:19:26.955+09
clgdjlner0001si6tqj0hmias	22	clcmmqz3k0000sizotchd7oha	clcn1so9c0004si0wiv9mmjmr	2023-04-12 19:22:26.478+09
clgsxpgvk0002sifuugr43nnx	gello	clgjdwwr80000siep8zys2zde	clgsxpgvk0001sifuiyqlzl2o	2023-04-23 13:53:51.897+09
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: jihyeonjeong
--

COPY public."Session" (id, "sessionToken", "userId", expires) FROM stdin;
clcmmqz450003sizo15jrxelt	cd2963ef-c7e4-45f7-9f93-c7c6b406449b	clcmmqz3k0000sizotchd7oha	2023-02-07 00:21:40.029
clcmtscar0002si0wmrmq9sls	e8d8908e-69cc-4de6-8499-fde5c8fea9d0	clcmpmcq30005sizobr5oak56	2023-02-08 08:10:18.905
clcojjogr000fsiiobhy3t76w	e3a9385f-d2ec-43c9-9370-71aa129262cd	clcojjogm000dsiioabx2x7in	2023-02-08 08:27:33.145
clcojm5vl000jsiiotwbdnu2d	28440915-3c97-48d5-bc8b-b25b93f22369	clcojm5va000gsiio2uvfbrvk	2023-02-08 08:29:29.018
clgjdwwsk0004sieptub9ynzr	da260532-5ec7-43ab-a421-812f8ab26ff8	clgjdwwr80000siep8zys2zde	2023-05-23 03:51:00.072
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: jihyeonjeong
--

COPY public."User" (id, name, email, "emailVerified", image, username, theme) FROM stdin;
clcmpmcq30005sizobr5oak56	randomguy1	email2@email2.com	2023-01-08 03:38:41.084	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s	random	light
clcojm5va000gsiio2uvfbrvk	jihyeon	email2@email.com	2023-01-09 08:29:29.012	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s	jihyeon	light
clcojjogm000dsiioabx2x7in	bill	email3@email3.com	2023-01-09 08:27:33.142	https://randomwordgenerator.com/img/picture-generator/g33815e6df811c258a606a9a313eb798de88de92031fc196fe0bb1d4bd4fa6be7c59d43cfbfedd1268b185db543d21ba8_640.jpg	bill	dark
clcmmqz3k0000sizotchd7oha	me	email@email.com	2023-04-12 10:22:13.584	https://w7.pngwing.com/pngs/311/425/png-transparent-humour-funny-face-youtube-joke-laughter-youtube-comics-face-comic-book-thumbnail.png	jihyeon2	light
clgjdwwr80000siep8zys2zde	Sal Jeong	wjdwlgus11@gmail.com	\N	https://lh3.googleusercontent.com/a/AGNmyxYg43N0CqGYup-pkm2Im7zspx4XbN-0ITyTgg-n=s96-c	\N	light
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: jihyeonjeong
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
email@email.com	03c41eca27d6cfe088811bfab43f42a22edc6cb0880bf5bdf381d6a21ddf4d41	2023-01-09 00:18:29.147
email3@email3.com	c8003a089b927595bf218a9df3553a01728a57d45b3336cdf56b4319f194bd9e	2023-01-10 08:26:13.729
email3@email3.com	c6294ed271a9d1070e12f720bb989085c34755d7b12dac96ecc456056eeed57f	2023-01-10 08:28:35.9
wjdwlgus11@gmail.com	8ce99d3499995396520849e062ef6d333d18eb077bfb4e7b7170d862fbf029ff	2023-04-13 10:18:01.836
email@email.com	93ea9d93853cc6922f82789e74033df95328f7f1ba9b25b2ca5ca9c94b2b01c1	2023-04-13 10:18:54.357
wjdwlgus11@gmail.com	34bde94a6a75e93adaae6c1a9a0836c56f713f3990faa63da9edce564fbddca8	2023-04-17 11:35:31.717
wjdwlgus11@gmail.com	5bc95e6e4b1ca665fc6c0c0997f95b7f39bbcd227b01fd546dba4d1e854023e6	2023-04-17 11:41:48.098
wjdwlgus11@gmail.com	62e94795787b4d871d68ed629328168ba59668fe3cd3484c1e88e3c0146e4b98	2023-04-17 11:42:33.981
wjdwlgus11@gmail.com	93921238398dd0746ed6f4712edb5be1981d397e1079d6857a769ab0f1c72307	2023-04-17 11:43:20.343
wjdwlgus11@gmail.com	6fd27401e94efce2d90b96f0a6ea0b22068460adedb929fc73396139bcabd1b0	2023-04-17 11:46:14.934
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Conversation Conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_pkey" PRIMARY KEY (id);


--
-- Name: Example Example_pkey; Type: CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."Example"
    ADD CONSTRAINT "Example_pkey" PRIMARY KEY (id);


--
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: jihyeonjeong
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- Name: ConversationUser_conversationId_idx; Type: INDEX; Schema: public; Owner: jihyeonjeong
--

CREATE INDEX "ConversationUser_conversationId_idx" ON public."ConversationUser" USING btree ("conversationId");


--
-- Name: ConversationUser_userId_conversationId_key; Type: INDEX; Schema: public; Owner: jihyeonjeong
--

CREATE UNIQUE INDEX "ConversationUser_userId_conversationId_key" ON public."ConversationUser" USING btree ("userId", "conversationId");


--
-- Name: Conversation_lastMessageId_idx; Type: INDEX; Schema: public; Owner: jihyeonjeong
--

CREATE INDEX "Conversation_lastMessageId_idx" ON public."Conversation" USING btree ("lastMessageId");


--
-- Name: Conversation_lastMessageId_key; Type: INDEX; Schema: public; Owner: jihyeonjeong
--

CREATE UNIQUE INDEX "Conversation_lastMessageId_key" ON public."Conversation" USING btree ("lastMessageId");


--
-- Name: Message_conversationId_idx; Type: INDEX; Schema: public; Owner: jihyeonjeong
--

CREATE INDEX "Message_conversationId_idx" ON public."Message" USING btree ("conversationId");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: jihyeonjeong
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: jihyeonjeong
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: jihyeonjeong
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: jihyeonjeong
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ConversationUser ConversationUser_conversationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."ConversationUser"
    ADD CONSTRAINT "ConversationUser_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public."Conversation"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ConversationUser ConversationUser_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."ConversationUser"
    ADD CONSTRAINT "ConversationUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Conversation Conversation_lastMessageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES public."Message"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Message Message_conversationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public."Conversation"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Message Message_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jihyeonjeong
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

