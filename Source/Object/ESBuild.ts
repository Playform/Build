export default {
	color: true,
	format: "esm",
	metafile: true,
	minify: true,
	outdir: "Target",
	platform: "node",
	target: "esnext",
	write: true,
	logLevel: "debug",
	plugins: [
		{
			name: "Target",
			setup({ onStart, initialOptions: { outdir } }) {
				onStart(async () => {
					try {
						outdir
							? await (
									await import("fs/promises")
							  ).rm(outdir, {
									recursive: true,
							  })
							: {};
					} catch (_Error) {}
				});
			},
		},
		(await import("esbuild-plugin-copy")).copy({
			resolveFrom: "out",
			assets: [
				{
					from: "./Source/Notation/TypeScript.json",
					to: "./Notation/",
				},
				{
					from: "./Source/Sheet/TypeDoc.css",
					to: "./Sheet/",
				},
			],
		}),
	],
	define: {
		"process.env.VERSION_PACKAGE": `'${(
			await (await import("../Function/JSON.js")).default("package.json")
		)?.version}'`,
	},
} satisfies BuildOptions as BuildOptions;

import type { BuildOptions } from "esbuild";
