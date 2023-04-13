sudo -u postgres psql
ALTER USER wjd WITH PASSWORD '123';

                                   List of roles
 Role name |                         Attributes                         | Member of
-----------+------------------------------------------------------------+-----------
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 wjd       |                                                            | {}

psql start