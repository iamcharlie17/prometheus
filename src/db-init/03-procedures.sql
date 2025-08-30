CREATE OR REPLACE PROCEDURE register_user (
   p_name IN VARCHAR2,
   p_email IN VARCHAR2,
   p_password IN VARCHAR2,
   p_role IN VARCHAR2 DEFAULT 'user'
) AS
BEGIN
  INSERT INTO users (id, name, email, password, role)
  VALUES (users_seq.NEXTVAL, p_name, p_email, p_password, p_role);
  COMMIT;
END;
