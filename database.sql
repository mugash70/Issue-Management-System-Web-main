-- Table: public.employees
CREATE TABLE public.employees
(
    emp_id integer NOT NULL,
    name character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    temporary_pw character varying COLLATE pg_catalog."default",
    updated_pw character varying COLLATE pg_catalog."default",
    profile_photo bytea,
    role character varying COLLATE pg_catalog."default",
    CONSTRAINT "Employees_pkey" PRIMARY KEY (emp_id),
    CONSTRAINT employee UNIQUE (email)
);

-- Table: public.issues

CREATE TABLE public.issues
(
    id uuid NOT NULL,
    creator character varying COLLATE pg_catalog."default",
    recipient character varying COLLATE pg_catalog."default",
    creator_location point,
    message character varying COLLATE pg_catalog."default",
    status character varying COLLATE pg_catalog."default",
    date_created date,
    CONSTRAINT "Issues_pkey" PRIMARY KEY (id)
);

-- Table: public.organization

CREATE TABLE public.organizations
(
    org_id integer NOT NULL,
    org_name character varying COLLATE pg_catalog."default",
    colour_scheme bytea,
    logo bytea,
    admin_name character varying COLLATE pg_catalog."default",
    admin_email character varying COLLATE pg_catalog."default",
    admin_password character varying COLLATE pg_catalog."default",
    
    CONSTRAINT "Organization_pkey" PRIMARY KEY (org_id),
    CONSTRAINT organization UNIQUE (admin_email)
);


-- Table: public.reports

CREATE TABLE public.reports
(
    id uuid NOT NULL,
    issue_status character varying COLLATE pg_catalog."default",
    no_issues_per_status integer,
    issue_creator_location point,
    issue_creation_date date,
    issue_closure_date date,
    user_closed_issue character varying COLLATE pg_catalog."default",
    CONSTRAINT "Reports_pkey" PRIMARY KEY (id)
);

-- Table: public.superadmins

-- DROP TABLE public.superadmins;

CREATE TABLE public.superadmins
(
    sadmin_id integer NOT NULL,
    name character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    phone_number character varying COLLATE pg_catalog."default",
    profile_photo bytea,
    role character varying COLLATE pg_catalog."default",   
    org_id integer NOT NULL,

    CONSTRAINT "sadmin_id" PRIMARY KEY (sadmin_id),
    CONSTRAINT superadmin UNIQUE (email)
);