This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install node modules,

```bash
npm install
# or
npm ci
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To get started you'll need to add some environmental variables - I used `.env.local` for mine to not share them onto the repo.

```env
NEXTAUTH_SECRET="..."
SOFTRIG_CLIENTID="..."
SOFTRIG_WELLKNOWN=".../.well-known/openid-configuration"
SOFTRIG_SCOPE="..."
NEXT_PUBLIC_SOFTRIG_BASEURL=".../api"
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
