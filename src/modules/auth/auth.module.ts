import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { JWTSECRET } from "@/config";
import { AuthService } from "./auth.service";

const authModule = new Elysia({ prefix: "/api/auth" })
	.use(
		jwt({
			name: "jwt",
			secret: JWTSECRET,
		})
	)
	.decorate("authService", new AuthService())
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
	);

export { authModule };
