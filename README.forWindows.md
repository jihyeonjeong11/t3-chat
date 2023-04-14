


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

그리고 .env-example을 참고해서 .env을 만들어 값을 넣어줍니다.

중요한것은 DATABASE_URL입니다.

postgresql://${유저이름}:${비번}@localhost:5432/{기본 db 이름입니다. postgres 기본}

입니다.

 DATABASE_URL=postgresql://postgres:123@localhost:5432/postgres

 해서 완성된 값은 다음과 같습니다.

그리고 npx prisma db push 하면 프리즈마에 지정된 스키마가 psql에 등록되고, yarn dev로 실행가능합니다.



다음에는 이메일 계정을 

https://ethereal.email/login 에서 생성해 줍니다. (몇시간 지나면 새로 바꿔줘야함)

만든 주소는 이 형태로 .env에 넣어줍니다.

EMAIL_SERVER=smtp://yadira.ward53@ethereal.email:rE2R3VAXTz9EBaa2rB@smtp.ethereal.email:587
EMAIL_FROM=Raoul

yadira.ward53@ethereal.email 
이름

rE2R3VAXTz9EBaa2rB
비밀번호




known issues

1. 컴퓨터를 끄고 다시 킨 뒤에는

sudo service postgresql start 로 wsl에서 postgre 서버를 재실행 시켜줘야 합니다.

https://stackoverflow.com/questions/55473086/it-is-unable-to-restart-postgresql-in-wslubuntu

윈도우 리눅스 에뮬의 특성처럼 보이는데

fsync라는 옵션을 꺼주면 괜찮다고 위에서 말하고 있네요.

2. 이메일 인증 이후, 회원정보를 submit 하지 않고 메시지를 날리면 에러 납니다.

그냥 코드에러