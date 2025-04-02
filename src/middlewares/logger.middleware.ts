import { logger } from "@/utilities";
import Elysia from "elysia";

const loggerMiddleware = new Elysia().onAfterHandle(
	{ as: "scoped" },
	({ request, set }) =>
		logger.info(
			`${request.method} ${request.url} ${set.status} ${performance.now().toFixed(2)}ms`
		)
);

export { loggerMiddleware };
