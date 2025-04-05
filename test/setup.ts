import { $ } from "bun";
import { afterAll, beforeAll } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { PrismaClient } from "@prisma/client";
import { app } from "@/index";
import { PORT } from "@/config";

export const prisma = new PrismaClient();
export const api = treaty<typeof app>(`localhost:${PORT}`).api;

export async function getTestUser() {
	const token = await api.auth.login.post({
		username: "testuser",
		password: "testpassword",
	});

	return { token: token.data };
}

beforeAll(async () => {
	await $`bunx prisma migrate reset --force`;
	await api.auth.register.post({
		username: "testuser",
		password: "testpassword",
	});
});

afterAll(async () => {
	await prisma.$disconnect();
	app.stop()
});
