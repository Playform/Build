import type { BuildOptions as Option } from "esbuild";
import type { Pattern } from "fast-glob";

import File from "../Fn/File.js";
import Default from "../Object/Option.js";

import { exec as Exec } from "child_process";
import { deepmerge as Merge } from "deepmerge-ts";
import { build as Build, analyzeMetafile } from "esbuild";
import Glob from "fast-glob";

/**
 * The `Build` function compiles and builds TypeScript files using esbuild and TypeScript compiler.
 * @param {Pattern[]} Files - An array of file patterns to be processed. Each pattern can include
 * wildcards (*) to match multiple files.
 * @param [Option] - The `Option` parameter is an optional object that can contain two properties:
 */
export default async (
	Files: Pattern[],
	Option?: { ESBuild?: string; TypeScript?: string }
) => {
	const Pipe: string[] = [];

	for (const File of Files) {
		for (const _File of await Glob(
			File.replaceAll("'", "").replaceAll('"', "")
		)) {
			Pipe.push(_File);
		}
	}

	Pipe.reverse();

	const _Configuration = Merge(Default, {
		entryPoints: Object.fromEntries(
			Pipe.map((File) => [
				File.replace("Source/", "").split(".").slice(0, -1.0).join("."),
				File,
			])
		),
	} satisfies Option);

	const Result = await Build(
		Option?.ESBuild
			? Merge(_Configuration, await File(Option?.ESBuild))
			: _Configuration
	);

	console.log(
		Result.metafile
			? await analyzeMetafile(Result.metafile, {
					verbose: true,
			  })
			: {}
	);

	if (Option?.TypeScript) {
		Exec(`tsc -p ${Option?.TypeScript}`);
	} else {
		Exec("tsc");
	}
};
