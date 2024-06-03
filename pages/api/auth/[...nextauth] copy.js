import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	adapter: {
		type: "mysql",
		database: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_SCHEMA,
		},
	},

	session: {
		jwt: true,
		maxAge: 5 * 60, // 5 minutes
	},
	callbacks: {
		async session({ session, token }) {
			if (token?.id) {
				session.user.name = token.name;
				session.user.email = token.email;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.name = user.name;
				token.email = user.email;
			}
			return token;
		},
	},
	pages: {
		signup: "/signup", // your custom signup page path
	},
});
