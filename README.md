# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

https://medium.com/geekculture/5-vscode-extensions-tricks-to-speed-up-react-nextjs-development-workflow-1b3b5773840d

install helper extensions

https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js

eslint setting

using husky later

https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js

npx prisma db push
add current schema and create db instance

https://www.youtube.com/watch?v=yfBV5H8RvKQ&t=2863s&ab_channel=WebDevJunkie

need admin panel and ui

adming -> multiple user with different support tickets

fixed chat panel in right bottom first

second commit:

message panel styling

after made changes to prisma schema

npx prisma migrate dev

i can use

npx prisma studio

we need to wire with agora console???

check agora-rtm-sdk

on next session

let's change direction.

https://www.youtube.com/watch?v=YIJb27L4JkY&ab_channel=Deion

this actually has example for trpc 10 chat connection code.
(don;t know if this one using websocket or not but not using agora so...)

since I changed pirating target, i just replace old one to this project with t3 nextauth.

But I will return old one after this one, to write websocket chat feature.
12/21

12/25
check that IconButton.tsx's type DetailedHTMLProps

[&-svg]:h-6 usage too.

https://playcode.io/1044775
I faked image file with faker-js/faker check that.

this is what youtuber prefers:

anything that can be reusable use components folder

else all goes to controllers

https://norwayy.tistory.com/366

check Conversations non-null assertion code. We can use this since we are using dummy data here.

12/31

install brew postgresql
brew services start postgresql

DATABASE_URL=postgresql://jihyeonjeong:postgres@localhost:5432/t1_chatapp

psql postgres

CREATE DATABASE t1_chatapp;

//DATABASE_URL=postgresql://jihyeonjeong:postgres@localhost:5432/t1_chatapp

// needed to change url from .env to this. jihyeonjeong is my username
// https://github.com/remix-run/blues-stack/issues/49

// \c t1_chatapp
// \d+ to see all tables
// \d+ "User"

01/09

see wsServer.ts.

we added node-fetch@2 because https://github.com/trpc/examples-next-prisma-websockets-starter/blob/main/package.json

trpc docs said so.

01/09

next-themes for dark theme logic.

04/16

trying altogic email authentication test

https://dev.to/altogic/complete-email-authentication-with-nextjs-and-altogic-1h1i

new dependencies: altogic cookies-next
