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

CREATE TABLE public.users {
    "id" serial PRIMARY KEY NOT NULL,
    "money" integer,
    "username" varchar UNIQUE,
    "password" varchar NOT NULL,
    CONSTRAINT "users_pk" PRIMARY KEY ("id")
}

CREATE TABLE public.bets {
    "id" serial PRIMARY KEY NOT NULL,
    FOREIGN KEY("sender_id") REFERENCES public.users("id")
    "price" integer NOT NULL,
    "category" varchar NOT NULL,
    "status" BOOLEAN NOT NULL,

    "created_at" TIMESTAMP DEFAULT NOW(),
    

}

CREATE TABLE bet_details {
    

}