-- Procedure to register a new user
CREATE OR REPLACE PROCEDURE register_user (
   p_name IN VARCHAR2,
   p_email IN VARCHAR2,
   p_password IN VARCHAR2,
   p_role IN VARCHAR2 DEFAULT 'user'
) AS
BEGIN
  INSERT INTO users (id, name, email, password, role)
  VALUES (users_seq.NEXTVAL, p_name, p_email, p_password, p_role);
END;
/

-- Procedure to add a new software product
CREATE OR REPLACE PROCEDURE add_software (
   p_developer_id IN NUMBER,
   p_name IN VARCHAR2,
   p_description IN CLOB,
   p_version IN VARCHAR2,
   p_price IN NUMBER,
   p_download_url IN VARCHAR2,
   p_icon_url IN VARCHAR2
) AS
BEGIN
  INSERT INTO software (id, developer_id, name, description, version, price, download_url, icon_url)
  VALUES (software_seq.NEXTVAL, p_developer_id, p_name, p_description, p_version, p_price, p_download_url, p_icon_url);
END;
/

-- Procedure to create a new license key for a software product
CREATE OR REPLACE PROCEDURE create_license_key (
   p_license_key IN VARCHAR2,
   p_software_id IN NUMBER,
   p_customer_id IN NUMBER,
   p_expires_at IN TIMESTAMP
) AS
BEGIN
  INSERT INTO license_keys (id, license_key, software_id, customer_id, status, expires_at)
  VALUES (license_keys_seq.NEXTVAL, p_license_key, p_software_id, p_customer_id, 'inactive', p_expires_at);
END;
/

-- Procedure to log a new purchase in the audit table
CREATE OR REPLACE PROCEDURE log_purchase (
   p_customer_id IN NUMBER,
   p_software_id IN NUMBER,
   p_license_id IN NUMBER,
   p_amount IN NUMBER,
   p_currency IN VARCHAR2,
   p_status IN VARCHAR2,
   p_payment_method IN VARCHAR2,
   p_transaction_id IN VARCHAR2
) AS
BEGIN
  INSERT INTO purchase_audit (id, customer_id, software_id, license_id, amount, currency, status, payment_method, transaction_id)
  VALUES (purchase_audit_seq.NEXTVAL, p_customer_id, p_software_id, p_license_id, p_amount, p_currency, p_status, p_payment_method, p_transaction_id);
END;
/

-- Procedure to log a generic audit event
-- COMMIT has been removed to prevent ORA-04092 error when called from a trigger.
CREATE OR REPLACE PROCEDURE log_audit_action (
    p_table_name IN VARCHAR2,
    p_record_id IN VARCHAR2,
    p_action IN VARCHAR2,
    p_old_data IN CLOB,
    p_new_data IN CLOB,
    p_changed_by IN VARCHAR2
) AS
BEGIN
    INSERT INTO audit_logs(log_id, table_name, record_id, action, old_data, new_data, changed_by)
    VALUES (audit_logs_seq.NEXTVAL, p_table_name, p_record_id, p_action, p_old_data, p_new_data, p_changed_by);
END;
/

-- This procedure handles a complete business transaction.
-- The final COMMIT should be managed by the calling application, so it is removed here.
CREATE OR REPLACE PROCEDURE process_purchase (
   p_customer_id    IN NUMBER,
   p_software_id    IN NUMBER,
   p_amount         IN NUMBER,
   p_currency       IN VARCHAR2,
   p_payment_method IN VARCHAR2,
   p_transaction_id IN VARCHAR2,
   -- OUT parameter to return the generated key to the application
   p_generated_key  OUT VARCHAR2
) AS
   v_new_license_id NUMBER;
   v_license_key    VARCHAR2(255);
   v_expires_at     TIMESTAMP;
BEGIN
   -- Step 1: Generate a unique license key
   v_license_key := 'LIC-' || p_software_id || '-' || DBMS_RANDOM.STRING('X', 16);

   -- Step 2: Determine the expiration date (e.g., 12 months from now)
   v_expires_at := ADD_MONTHS(CURRENT_TIMESTAMP, 12);

   -- Step 3 & 4: Insert the new license and get its ID back
   INSERT INTO license_keys (
       id, license_key, software_id, customer_id, status, activated_at, expires_at
   ) VALUES (
       license_keys_seq.NEXTVAL, v_license_key, p_software_id, p_customer_id, 'active', CURRENT_TIMESTAMP, v_expires_at
   )
   RETURNING id INTO v_new_license_id;

   -- Step 5: Log the transaction in the purchase audit table
   INSERT INTO purchase_audit (
       id, customer_id, software_id, license_id, amount, currency, status, payment_method, transaction_id
   ) VALUES (
       purchase_audit_seq.NEXTVAL, p_customer_id, p_software_id, v_new_license_id, p_amount, p_currency, 'completed', p_payment_method, p_transaction_id
   );

   -- Set the OUT parameter so the application can get the key
   p_generated_key := v_license_key;

   -- Step 6: COMMIT is removed. The application will handle it.

EXCEPTION
   WHEN OTHERS THEN
      -- If any step fails, undo everything
      ROLLBACK;
      -- Re-raise the exception so the calling application knows there was an error
      RAISE;
END process_purchase;
/
