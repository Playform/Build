import type { BuildOptions } from "esbuild";

import type Interface from "../Interface/Build.js";

/**
 * @module Build
 *
 */
export default (async (...[File, Option]) => {
	for (const _File of File) {
		for (const __File of await (
			await import("fast-glob")
		).default(_File.replaceAll("'", "").replaceAll('"', ""), {
			ignore: Option?.Exclude ?? [],
		})) {
			Pipe.push(__File);
		}
	}

	Pipe.reverse();

	let Configuration: BuildOptions = Merge(
		(await import("../Variable/ESBuild.js")).default,
		{
			entryPoints: Pipe,
		},
	);

	Configuration = Merge(
		Option?.ESBuild
			? Merge(
					Configuration,
					await (
						await import("@Function/File.js")
					).default(Option.ESBuild),
				)
			: Configuration,
		{
			tsconfig: Option?.TypeScript ?? "tsconfig.json",
		},
	);

	Configuration.plugins?.push({
		name: "TypeScript",
		setup({ onEnd }) {
			onEnd(async () => {
				await Exec(`tsc -p ${Configuration.tsconfig}`);
				await Exec(`tsc-alias -f -p ${Configuration.tsconfig}`);
			});
		},
	});

	if (Option?.Watch) {
		await (await (await import("esbuild")).context(Configuration)).watch();
	} else {
		console.log(
			await (
				await import("esbuild")
			).analyzeMetafile(
				(await (await import("esbuild")).build(Configuration))
					?.metafile ?? "",
				{
					verbose: true,
				},
			),
		);
	}
}) satisfies Interface as Interface;

export const { default: Exec } = await import("../Function/Exec.js");

export const { default: Merge } = await import("../Function/Merge.js");

export const Pipe: string[] = [];

export const { extname, basename, relative, dirname, normalize, sep } =
	await import("path");

export const Current = (await import("url")).fileURLToPath(
	dirname(import.meta.url),
);
