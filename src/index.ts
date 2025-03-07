import { Elysia } from "elysia";
import { authModule } from "./modules/auth/auth.module";

const app = new Elysia()
	.get("/", () => "Hello Elysia")
	.use(authModule)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
