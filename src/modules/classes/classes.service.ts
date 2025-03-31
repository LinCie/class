import { NotFoundError } from "elysia";
import { User } from "@prisma/client";
import { prisma } from "@/database/prisma";

class ClassService {
	public async createClass(user: User, name: string) {
		const teacher = await this.getTeacher(user.id);

		const newClass = await prisma.class.create({
			data: { name: name, teacher: { connect: { id: teacher.id } } },
		});

		return newClass;
	}

	public getClasses() {
		return prisma.class.findMany();
	}

	public getClassesAsTeacher(user: User) {
		return prisma.class.findMany({
			where: { teacher: { userId: user.id } },
		});
	}

	public getClassesAsStudent(user: User) {
		return prisma.class.findMany({
			where: { students: { some: { userId: user.id } } },
		});
	}

	public async getTeacher(id: number) {
		const teacher = await prisma.teacher.findFirst({
			where: { userId: id },
		});

		if (teacher) return teacher;

		return prisma.teacher.create({
			data: { userId: id },
		});
	}

	public async getStudent(id: number) {
		const student = await prisma.student.findFirst({
			where: { userId: id },
		});

		if (student) return student;

		return prisma.student.create({
			data: { userId: id },
		});
	}

	public getClassInfo(id: number) {
		return prisma.class.findFirstOrThrow({
			where: { id },
			include: {
				teacher: {
					include: {
						user: {
							select: { username: true },
						},
					},
				},
				students: {
					include: {
						user: {
							select: { username: true },
						},
					},
				},
			},
		});
	}

	public async joinClass(id: number, user: User) {
		const student = await this.getStudent(user.id);

		await prisma.class.update({
			where: {
				id,
				teacherId: { not: user.id },
			},
			data: {
				students: { connect: { id: student.id } },
			},
		});
	}

	public async deleteClass(id: number, user: User) {
		const classData = await prisma.class.findFirst({
			where: { id, teacher: { userId: user.id } },
		});
		if (!classData) {
			throw new NotFoundError("Class not found or you do not have permission");
		}

		await prisma.class.delete({ where: { id } });
	}
}

export { ClassService };
