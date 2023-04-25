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
    "username" varchar UNIQUE,
    "password" varchar NOT NULL,
    "account_balance" integer NOT NULL,
    CONSTRAINT "users_pk" PRIMARY KEY("id")
);

CREATE TABLE public.bets ( 
    "id" serial NOT NULL,
    "game_id" varchar NOT NULL,
    "category" varchar NOT NULL,
    "status" BOOLEAN NOT NULL,
    "total_pot" integer NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT "bets_pk" PRIMARY KEY("id")
);

CREATE TABLE public.bets_detail (
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "bets_id" integer NOT NULL,
    "team" varchar NOT NULL,
    "user_wager" integer NOT NULL,
    CONSTRAINT "bets_detail_pk" PRIMARY KEY("id")
);


--the lines below will label the columns in bets_detail as foreign keys and point towards the references
ALTER TABLE public.bets_detail ADD CONSTRAINT "bets_detail_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("id");
ALTER TABLE public.bets_detail ADD CONSTRAINT "bets_detail_fk1" FOREIGN KEY ("bets_id") REFERENCES public.bets("id");

--below we will enter two fake users into the users table
INSERT INTO public.users(id, username, password, account_balance) VALUES (1, 'user1', 'pass', 1000);
INSERT INTO public.users(id, username, password, account_balance) VALUES (2, 'user2', 'pass', 1000);
INSERT INTO public.users(id, username, password, account_balance) VALUES (3, 'user3', 'pass', 1000);
INSERT INTO public.users(id, username, password, account_balance) VALUES (4, 'user4', 'pass', 1000);




INSERT INTO public.bets(id, game_id, category, status, total_pot) VALUES (1, 'some_game', 'NBA', true, 1000);
INSERT INTO public.bets(id, game_id, category, status, total_pot) VALUES (2, 'another_game', 'NBA', true, 400);

INSERT INTO public.bets(id, game_id, category, status, total_pot) VALUES ('another_game', 'NBA', true, 400);


INSERT INTO public.bets_detail VALUES (1, 1, 1, 'suns', 500);
INSERT INTO public.bets_detail VALUES (2, 2, 1, 'warriors', 500);
INSERT INTO public.bets_detail VALUES (3, 3, 2, 'clippers', 200);
INSERT INTO public.bets_detail VALUES (4, 4, 2, 'hawks', 200);

-- constraint adds a label to 



-- SELECT u.username
-- FROM public.users u
-- INNER JOIN public.bets_detail bd
-- ON u.id = bd.user_id
-- WHERE bd.bets_id = (SELECT bets_id FROM public.bets_detail WHERE user_id = 3 AND team = 'clippers')
-- AND bd.user_id != 3 AND bd.bets_id = 2;