-- Drop tables if they exist to ensure a clean slate
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE audit_logs';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN
         RAISE;
      END IF;
END;
/
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE users CASCADE CONSTRAINTS';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN
         RAISE;
      END IF;
END;
/
-- Create the users table
CREATE TABLE users (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    email VARCHAR2(255) NOT NULL UNIQUE,
    password VARCHAR2(255) NOT NULL,
    role VARCHAR2(50) DEFAULT 'user' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_role CHECK (role IN ('user', 'admin', 'developer'))
)
/
-- Create an audit table to log changes to the users table
CREATE TABLE audit_logs (
    log_id NUMBER PRIMARY KEY,
    table_name VARCHAR2(100),
    record_id VARCHAR2(100),
    action VARCHAR2(10),
    old_data CLOB,
    new_data CLOB,
    changed_by VARCHAR2(255),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
