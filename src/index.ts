import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { logger } from "@bogeychan/elysia-logger";
import { authModule } from "./modules/auth/auth.module";
import { PORT } from "./config/env";
import { classModule } from "./modules/classes/classes.module";

const app = new Elysia()
	.use(
		swagger({
			documentation: {
				tags: [{ name: "Auth", description: "Auth API Routes" }],
			},
		})
	)
	.use(
		logger({
			level: "info",
		})
	)
	.get("/", () => "Hello Elysia")
	.use(authModule)
	.use(classModule)
	.listen(PORT);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
