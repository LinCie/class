import { Elysia, t } from "elysia";
import { ClassService } from "./classes.service";
import { verifyMiddleware } from "@/middlewares/verify.middleware";

const classModule = new Elysia({ prefix: "/api/classes" })
	.use(verifyMiddleware)
	.decorate("classService", new ClassService())
	.get(
		"/",
		({ classService, user, query }) => {
			switch (query.as) {
				case "student":
					return classService.getClassesAsStudent(user);

				case "teacher":
					return classService.getClassesAsTeacher(user);

				default:
					return classService.getClasses();
			}
		},
		{
			query: t.Optional(t.Object({ as: t.String() })),
			detail: { tags: ["Class"] },
		}
	)
	.get(
		"/:id",
		({ params, classService }) => {
			return classService.getClassInfo(Number(params.id));
		},
		{
			beforeHandle({ params, error }) {
				try {
					Number(params.id);
				} catch {
					return error(400);
				}
			},
			detail: { tags: ["Class"] },
		}
	)
	.post(
		"/",
		({ classService, body, user, set }) => {
			set.status = 201;
			return classService.createClass(user, body.name);
		},
		{
			body: t.Object({ name: t.String() }),
			detail: { tags: ["Class"] },
		}
	)
	.patch(
		"/:id/join",
		({ classService, user, params, set }) => {
			set.status = 204;
			return classService.joinClass(Number(params.id), user);
		},
		{
			beforeHandle({ params, error }) {
				try {
					Number(params.id);
				} catch {
					return error(400);
				}
			},
			detail: { tags: ["Class"] },
		}
	)
	.delete(
		"/:id",
		({ classService, user, params, set }) => {
			set.status = 204;
			return classService.deleteClass(Number(params.id), user);
		},
		{
			beforeHandle({ params, error }) {
				try {
					Number(params.id);
				} catch {
					return error(400);
				}
			},
			detail: { tags: ["Class"] },
		}
	);

export { classModule };
