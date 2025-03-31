import Elysia from "elysia";

const errorMiddleware = new Elysia().onError(
	{ as: "scoped" },
	({ error, code }) => {
		switch (code) {
			case "NOT_FOUND":
				return new Response(error.message, { status: 404 });
			case "INTERNAL_SERVER_ERROR":
				return new Response(error.message, { status: 500 });
			default:
				return new Response("Internal Server Error!", { status: 500 });
		}
	}
);

export { errorMiddleware };
