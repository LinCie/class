import Elysia from "elysia";
import { jwt } from "@elysiajs/jwt";
import { JWTSECRET } from "@/config/env";
import { UsersService } from "@/modules/users/users.service";

const verifyMiddleware = new Elysia()
	.use(
		jwt({
			name: "jwt",
			secret: JWTSECRET,
		})
	)
	.decorate("usersService", new UsersService())
	.resolve(
		{ as: "global" },
		async ({ jwt, error, headers: { authorization }, usersService }) => {
			const token = await jwt.verify(authorization);
			if (!token) {
				return error(401);
			}

			const user = await usersService.getUserById(Number(token.sub));
			if (!user) {
				return error(404);
			}

			return { user };
		}
	);

export { verifyMiddleware };
