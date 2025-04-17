import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { JWTSECRET } from "@/config";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";

const authModule = new Elysia({ prefix: "/api/auth" })
	.use(
		jwt({
			name: "jwt",
			secret: JWTSECRET,
			exp: "30d",
		})
	)
	.decorate("authService", new AuthService())
	.decorate("usersService", new UsersService())
	.post(
		"/register",
		async ({ authService, body, jwt, set }) => {
			const user = await authService.createUser(body);
			set.status = 201;
			return jwt.sign({ sub: String(user.id) });
		},
		{
			body: t.Object({ username: t.String(), password: t.String() }),
			detail: { tags: ["Auth"] },
		}
	)
	.post(
		"/login",
		async ({ authService, body, jwt }) => {
			const user = await authService.verifyUser(body);
			return jwt.sign({ sub: String(user.id) });
		},
		{
			body: t.Object({ username: t.String(), password: t.String() }),
			detail: { tags: ["Auth"] },
		}
	)
	.get(
		"/refresh",
		async ({ jwt, headers: { authorization }, usersService, error }) => {
			const bearer = authorization?.split(" ")[1];
			const token = await jwt.verify(bearer);
			if (!token) {
				return;
			}

			const user = await usersService.getUserById(Number(token.sub));
			if (!user) {
				return error(404);
			}

			return jwt.sign({ sub: String(user.id) });
		}
	);

export { authModule };
