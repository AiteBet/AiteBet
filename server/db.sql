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

DROP TABLE IF EXISTS public.bets_detail;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.bets;


CREATE TABLE public.users (
    "id" serial NOT NULL,
    "money" integer,
    "username" varchar UNIQUE,
    "password" varchar NOT NULL,
    CONSTRAINT "users_pk" PRIMARY KEY("id")
);

CREATE TABLE public.bets ( 
    "id" serial NOT NULL,
    "category" varchar NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT "bets_pk" PRIMARY KEY("id")
);

CREATE TABLE public.bets_detail (
    "user_id" integer NOT NULL,
    "bets_id" integer NOT NULL,
    "team" varchar NOT NULL,
    "user_wager" integer NOT NULL
);


--the lines below will label the columns in bets_detail as foreign keys and point towards the references
ALTER TABLE public.bets_detail ADD CONSTRAINT "bets_detail_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("id");
ALTER TABLE public.bets_detail ADD CONSTRAINT "bets_detail_fk1" FOREIGN KEY ("bets_id") REFERENCES public.bets("id");

--below we will enter two fake users into the users table
-- INSERT INTO public.users VALUES (1, 100, 'Michael_Jordan', 'last_dance');
-- INSERT INTO public.users VALUES (2, 100, 'Scotty_Pippin', 'second_fiddle');


-- constraint adds a label to 