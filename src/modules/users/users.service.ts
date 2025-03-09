import { prisma } from "@/database/prisma";

class UsersService {
	public async getUserById(id: number) {
		return await prisma.user.findFirstOrThrow({ where: { id } });
	}
}

export { UsersService };
