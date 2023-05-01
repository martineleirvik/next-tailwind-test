import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: "Email", type: "email", placeholder: "johndoe@test.com"},
                password: {label: "Password", type: "password"},
            },
            authorize: (credentials) => {

                if (
                    credentials.username === "johndoe@test.com" && 
                    credentials.password === "test"
                ) {
                    return {
                        id: 2,
                        name: "John",
                        email: "johndoe@tdest.com"
                    }
                }
                //login failed
                return null
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user })=> {
            // first time jwt callback is run, user object is available
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id
            }
            return session
        }
    },
    secret: "test",
    jwt: {
        secret: "test",
        encryption: true
    }
})
