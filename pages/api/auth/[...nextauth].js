// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import sequelize from "@/utils/db";

const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				await sequelize.authenticate();
				try {
					const user = await User.findOne({
						where: { email: credentials.email },
					});
					if (!user) {
						throw new Error("No user found with the provided email.");
					}
					const isPasswordCorrect = await bcrypt.compare(
						credentials.password,
						user.password
					);
					if (!isPasswordCorrect) {
						throw new Error("Password is incorrect.");
					}
					return user;
				} catch (err) {
					console.error("Authorize error:", err);
					throw new Error("Authentication failed.");
				}
			},
		}),
	],
	session: {
		jwt: true,
		maxAge: 5 * 60, // 5 minutes
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token?.id) {
				session.user = token;
				session.user.email = token.email;
			}
			return session;
		},
		async signIn({ user, account }) {
			await sequelize.authenticate();
			if (account?.provider == "credentials") {
				console.log("Login Type:", account);
				return true;
			}
			if (account?.provider == "github") {
				try {
					const existingUser = await User.findOne({
						where: { email: user.email },
					});
					if (!existingUser) {
						await User.create({
							email: user.email,
							name: user.name,
							image: user.image,
						});
					}
					return true;
				} catch (err) {
					console.error("Error saving user:", err);
					return false;
				}
			}
			return true;
		},
	},
};

export default NextAuth(authOptions);

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
