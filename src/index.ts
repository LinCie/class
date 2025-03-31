import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { authModule, classModule } from "./modules";
import { PORT } from "./config";
import { logger } from "./utilities";
import { errorMiddleware } from "./middlewares";

const app = new Elysia()
	.use(errorMiddleware)
	.use(
		swagger({
			documentation: {
				tags: [{ name: "Auth", description: "Auth API Routes" }],
			},
		})
	)
	.get("/", () => "Hello Elysia")
	.use(authModule)
	.use(classModule)
	.listen(PORT);

logger.info(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
