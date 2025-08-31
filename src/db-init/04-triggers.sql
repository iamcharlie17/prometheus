-- =====================================================================
-- USERS Triggers
-- =====================================================================

CREATE OR REPLACE TRIGGER users_before_insert
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  -- Assign the next value from the sequence to the ID if it's null
  IF :NEW.id IS NULL THEN
    :NEW.id := users_seq.NEXTVAL;
  END IF;

  -- Set the created_at and updated_at timestamps on creation
  :NEW.created_at := CURRENT_TIMESTAMP;
  :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER users_before_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
  -- Update the updated_at timestamp on modification
  :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER users_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW
DECLARE
    v_old_data CLOB;
    v_new_data CLOB;
    v_action   VARCHAR2(10);
BEGIN
    -- Determine the action
    IF INSERTING THEN
        v_action := 'INSERT';
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
    ELSIF DELETING THEN
        v_action := 'DELETE';
    END IF;

    -- Capture old data for UPDATE and DELETE
    IF UPDATING OR DELETING THEN
        v_old_data := 'Name: ' || :OLD.name || ', Email: ' || :OLD.email || ', Role: ' || :OLD.role;
    END IF;

    -- Capture new data for INSERT and UPDATE
    IF INSERTING OR UPDATING THEN
        v_new_data := 'Name: ' || :NEW.name || ', Email: ' || :NEW.email || ', Role: ' || :NEW.role;
    END IF;

    -- Log the action
    log_audit_action(
        p_table_name => 'users',
        p_record_id  => NVL(TO_CHAR(:NEW.id), TO_CHAR(:OLD.id)),
        p_action     => v_action,
        p_old_data   => v_old_data,
        p_new_data   => v_new_data,
        p_changed_by => USER -- Or a more specific user context if available
    );
END;
/


-- =====================================================================
-- SOFTWARE Triggers
-- =====================================================================

CREATE OR REPLACE TRIGGER software_before_insert
BEFORE INSERT ON software
FOR EACH ROW
BEGIN
  IF :NEW.id IS NULL THEN
    :NEW.id := software_seq.NEXTVAL;
  END IF;
  :NEW.created_at := CURRENT_TIMESTAMP;
  :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER software_before_update
BEFORE UPDATE ON software
FOR EACH ROW
BEGIN
  :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER software_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON software
FOR EACH ROW
DECLARE
    v_old_data CLOB;
    v_new_data CLOB;
    v_action   VARCHAR2(10);
BEGIN
    IF INSERTING THEN
        v_action := 'INSERT';
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
    ELSIF DELETING THEN
        v_action := 'DELETE';
    END IF;

    IF UPDATING OR DELETING THEN
        v_old_data := 'Name: ' || :OLD.name || ', Version: ' || :OLD.version || ', Price: ' || :OLD.price;
    END IF;

    IF INSERTING OR UPDATING THEN
        v_new_data := 'Name: ' || :NEW.name || ', Version: ' || :NEW.version || ', Price: ' || :NEW.price;
    END IF;

    log_audit_action('software', NVL(TO_CHAR(:NEW.id), TO_CHAR(:OLD.id)), v_action, v_old_data, v_new_data, USER);
END;
/

-- =====================================================================
-- LICENSE_KEYS Triggers
-- =====================================================================

CREATE OR REPLACE TRIGGER license_keys_before_insert
BEFORE INSERT ON license_keys
FOR EACH ROW
BEGIN
  IF :NEW.id IS NULL THEN
    :NEW.id := license_keys_seq.NEXTVAL;
  END IF;
  :NEW.created_at := CURRENT_TIMESTAMP;
  :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER license_keys_before_update
BEFORE UPDATE ON license_keys
FOR EACH ROW
BEGIN
  :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER license_keys_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON license_keys
FOR EACH ROW
DECLARE
    v_old_data CLOB;
    v_new_data CLOB;
    v_action   VARCHAR2(10);
BEGIN
    IF INSERTING THEN
        v_action := 'INSERT';
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
    ELSIF DELETING THEN
        v_action := 'DELETE';
    END IF;

    IF UPDATING OR DELETING THEN
        v_old_data := 'License Key: ' || :OLD.license_key || ', Status: ' || :OLD.status || ', Expires At: ' || TO_CHAR(:OLD.expires_at, 'YYYY-MM-DD HH24:MI:SS');
    END IF;

    IF INSERTING OR UPDATING THEN
        v_new_data := 'License Key: ' || :NEW.license_key || ', Status: ' || :NEW.status || ', Expires At: ' || TO_CHAR(:NEW.expires_at, 'YYYY-MM-DD HH24:MI:SS');
    END IF;

    log_audit_action('license_keys', NVL(TO_CHAR(:NEW.id), TO_CHAR(:OLD.id)), v_action, v_old_data, v_new_data, USER);
END;
/


-- =====================================================================
-- PURCHASE_AUDIT Triggers
-- =====================================================================

CREATE OR REPLACE TRIGGER purchase_audit_before_insert
BEFORE INSERT ON purchase_audit
FOR EACH ROW
BEGIN
  IF :NEW.id IS NULL THEN
    :NEW.id := purchase_audit_seq.NEXTVAL;
  END IF;
  :NEW.created_at := CURRENT_TIMESTAMP;
  :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

CREATE OR REPLACE TRIGGER purchase_audit_before_update
BEFORE UPDATE ON purchase_audit
FOR EACH ROW
BEGIN
  :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/

-- Note: An audit trigger for an audit table itself can be redundant,
-- but is included here for completeness based on the request pattern.
CREATE OR REPLACE TRIGGER purchase_audit_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON purchase_audit
FOR EACH ROW
DECLARE
    v_old_data CLOB;
    v_new_data CLOB;
    v_action   VARCHAR2(10);
BEGIN
    IF INSERTING THEN
        v_action := 'INSERT';
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
    ELSIF DELETING THEN
        v_action := 'DELETE';
    END IF;

    IF UPDATING OR DELETING THEN
        v_old_data := 'Transaction: ' || :OLD.transaction_id || ', Amount: ' || :OLD.amount || ', Status: ' || :OLD.status;
    END IF;

    IF INSERTING OR UPDATING THEN
        v_new_data := 'Transaction: ' || :NEW.transaction_id || ', Amount: ' || :NEW.amount || ', Status: ' || :NEW.status;
    END IF;

    log_audit_action('purchase_audit', NVL(TO_CHAR(:NEW.id), TO_CHAR(:OLD.id)), v_action, v_old_data, v_new_data, USER);
END;
/
