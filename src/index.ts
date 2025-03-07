import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { authModule } from "./modules/auth/auth.module";

const app = new Elysia()
	.use(
		swagger({
			documentation: {
				tags: [{ name: "Auth", description: "Auth API Routes" }],
			},
		})
	)
	.get("/", () => "Hello Elysia")
	.use(authModule)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
