import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    GithubProviders({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: 'soohyeonjo'
};

export default NextAuth(authOptions)