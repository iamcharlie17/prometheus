CREATE OR REPLACE TRIGGER users_before_insert
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  -- Assign the next value from the sequence to the ID
  IF :NEW.id IS NULL THEN
    :NEW.id := users_seq.NEXTVAL;
  END IF;

  -- Set the updated_at timestamp
  :NEW.updated_at := CURRENT_TIMESTAMP;
END;
/
CREATE OR REPLACE TRIGGER users_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW
DECLARE
    v_old_data CLOB;
    v_new_data CLOB;
BEGIN
    v_old_data := '';
    v_new_data := '';

    IF UPDATING OR DELETING THEN
        v_old_data := 'email: ' || :OLD.email || ', role: ' || :OLD.role;
    END IF;

    IF UPDATING OR INSERTING THEN
        v_new_data := 'email: ' || :NEW.email || ', role: ' || :NEW.role;
    END IF;

    IF INSERTING THEN
        INSERT INTO audit_logs (log_id, table_name, record_id, action, new_data)
        VALUES (audit_logs_seq.NEXTVAL, 'users', :NEW.id, 'INSERT', v_new_data);
    ELSIF UPDATING THEN
        INSERT INTO audit_logs (log_id, table_name, record_id, action, old_data, new_data)
        VALUES (audit_logs_seq.NEXTVAL, 'users', :NEW.id, 'UPDATE', v_old_data, v_new_data);
    ELSIF DELETING THEN
        INSERT INTO audit_logs (log_id, table_name, record_id, action, old_data)
        VALUES (audit_logs_seq.NEXTVAL, 'users', :OLD.id, 'DELETE', v_old_data);
    END IF;
END;
