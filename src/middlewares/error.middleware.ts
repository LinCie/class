import Elysia from "elysia";
import {
	PrismaClientInitializationError,
	PrismaClientKnownRequestError,
	PrismaClientRustPanicError,
	PrismaClientUnknownRequestError,
	PrismaClientValidationError,
} from "@prisma/client/runtime/library";

const errorMiddleware = new Elysia()
	.error({
		PrismaClientKnownRequestError,
		PrismaClientValidationError,
		PrismaClientUnknownRequestError,
		PrismaClientInitializationError,
		PrismaClientRustPanicError,
	})
	.onError({ as: "scoped" }, ({ error, code }) => {
		switch (code) {
			case "NOT_FOUND":
				return new Response(error.message, { status: 404 });
			case "INTERNAL_SERVER_ERROR":
				return new Response(error.message, { status: 500 });
			case "PrismaClientInitializationError":
				return new Response(error.message, { status: 500 });
			case "PrismaClientKnownRequestError":
				return new Response(error.message, { status: 400 });
			case "PrismaClientValidationError":
				return new Response(error.message, { status: 400 });
			case "PrismaClientUnknownRequestError":
				return new Response(error.message, { status: 500 });
			case "PrismaClientRustPanicError":
				return new Response(error.message, { status: 500 });
			default:
				return new Response("An unknown error occured on the server", {
					status: 500,
				});
		}
	});

export { errorMiddleware };
