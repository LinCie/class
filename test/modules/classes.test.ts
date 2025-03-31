import { beforeEach, describe, expect, it } from "bun:test";
import { api, getTestUser, prisma } from "test/setup";

describe("Classes", () => {
	beforeEach(async () => {
		await prisma.class.deleteMany();
	});

	it("creates a class", async () => {
		const { token } = await getTestUser();
		const response = await api.classes.index.post(
			{ name: "test" },
			{ headers: { authorization: `Bearer ${token}` } }
		);

		expect(response.status).toBe(201);
		expect(response.data?.name).toBe("test");

		const createdClass = await prisma.class.findFirst({
			where: { name: "test" },
		});

		expect(createdClass).toBeDefined();
	});
});
