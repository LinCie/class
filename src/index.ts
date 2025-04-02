import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { authModule, classModule } from "./modules";
import { PORT } from "./config";
import { logger } from "./utilities";
import { errorMiddleware, loggerMiddleware } from "./middlewares";

const app = new Elysia()
	.use(loggerMiddleware)
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
	.use(errorMiddleware)
	.listen(PORT);

logger.info(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
