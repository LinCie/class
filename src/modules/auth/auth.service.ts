import { prisma } from "@/database/prisma";

class AuthService {
	public async hashPassword(password: string): Promise<string> {
		return await Bun.password.hash(password);
	}

	public async verifyPassword(
		password: string,
		hash: string
	): Promise<boolean> {
		return await Bun.password.verify(password, hash);
	}

	public async createUser({
		username,
		password,
	}: {
		username: string;
		password: string;
	}) {
		const hash = await this.hashPassword(password);
		return await prisma.user.create({ data: { username, hash } });
	}

	public async verifyUser({
		username,
		password,
	}: {
		username: string;
		password: string;
	}) {
		const user = await this.getUser(username);

		if (await this.verifyPassword(password, user.hash)) {
			return user;
		} else {
			throw new Error("Password mismatch");
		}
	}

	public async getUser(username: string) {
		return await prisma.user.findFirstOrThrow({ where: { username } });
	}
}

export { AuthService };
