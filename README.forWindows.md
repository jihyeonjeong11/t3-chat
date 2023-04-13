


 wsl로 진행했음

 1. yarn 으로 dependency 설치함.

 https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-database

 2. 에 들어가서 wsl postgresql client 설치 (커맨드는 동봉하지 않음)

 3. sudo -u postgres psql

 로 psql 환경으로 등러가서

 \du를 보면 role들이 나열되어 있습니다.


 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 wjd       |                                                            | {}

 이런식으로 나오고

 
기본 superuser를 저는 그대로 사용할것이기 때문에
라고 롤의 비번을 바꾸어 줍니다.

 ALTER USER postgres WITH PASSWORD '123';

그리고 .env.example을 만들어 값을 넣어줍니다.

중요한것은 DATABASE_URL입니다.

postgresql://${유저이름}:${비번}@localhost:5432/{기본 db 이름입니다. postgres 기본}

입니다.

 DATABASE_URL=postgresql://postgres:123@localhost:5432/postgres

 해서 완성된 값은 다음과 같습니다.

그리고 npx prisma db push 하면 프리즈마에 지정된 스키마가 psql에 등록되고, yarn dev로 실행가능합니다.

다음에는 이메일 계정을 