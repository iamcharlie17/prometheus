-- Drop tables if they exist to ensure a clean slate
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE purchase_audit';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN
         RAISE;
      END IF;
END;
/
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE license_keys';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN
         RAISE;
      END IF;
END;
/
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE software';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN
         RAISE;
      END IF;
END;
/
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
/

-- Create the software table
CREATE TABLE software (
    id NUMBER PRIMARY KEY,
    developer_id NUMBER NOT NULL,
    name VARCHAR2(255) NOT NULL,
    description CLOB,
    version VARCHAR2(50) NOT NULL,
    price NUMBER(10, 2) NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL,
    download_url VARCHAR2(2048),
    icon_url VARCHAR2(2048),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_developer FOREIGN KEY (developer_id) REFERENCES users(id),
    CONSTRAINT chk_is_active CHECK (is_active IN (0, 1)) -- 0 for false, 1 for true
)
/

-- Create the license_keys table
CREATE TABLE license_keys (
    id NUMBER PRIMARY KEY,
    license_key VARCHAR2(255) NOT NULL UNIQUE,
    software_id NUMBER NOT NULL,
    customer_id NUMBER NOT NULL,
    status VARCHAR2(50) DEFAULT 'inactive' NOT NULL,
    activated_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_software_license FOREIGN KEY (software_id) REFERENCES software(id),
    CONSTRAINT fk_customer_license FOREIGN KEY (customer_id) REFERENCES users(id),
    CONSTRAINT chk_license_status CHECK (status IN ('active', 'inactive', 'expired'))
)
/

-- Create the purchase_audit table
CREATE TABLE purchase_audit (
    id NUMBER PRIMARY KEY,
    customer_id NUMBER NOT NULL,
    software_id NUMBER NOT NULL,
    license_id NUMBER NOT NULL,
    amount NUMBER(10, 2) NOT NULL,
    currency VARCHAR2(10) NOT NULL,
    status VARCHAR2(50) NOT NULL,
    payment_method VARCHAR2(100),
    transaction_id VARCHAR2(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_customer_purchase FOREIGN KEY (customer_id) REFERENCES users(id),
    CONSTRAINT fk_software_purchase FOREIGN KEY (software_id) REFERENCES software(id),
    CONSTRAINT fk_license_purchase FOREIGN KEY (license_id) REFERENCES license_keys(id),
    CONSTRAINT chk_purchase_status CHECK (status IN ('completed', 'pending', 'failed', 'refunded'))
)
/
