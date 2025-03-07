export const apps = [
	{
		name: "class",
		script: "./server",
		exec_interpreter: "none",
		exec_mode: "fork_mode",
		watch: false,
		autorestart: true,
		max_memory_restart: "256M",
	},
];
