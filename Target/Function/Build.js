var m=async(...[s,e])=>{const i=[];s.forEach(async t=>(await(await import("fast-glob")).default(t.replaceAll("'","").replaceAll('"',""))).forEach(c=>i.push(c))),i.reverse();const a=n((await import("../Object/ESBuild.js")).default,{entryPoints:Object.fromEntries(i.map(t=>[t.replace("Source/","").split(".").slice(0,-1).join("."),t]))}),r=await(await import("esbuild")).build(e?.ESBuild?n(a,await(await import("../Function/File.js")).default(e?.ESBuild)):a);console.log(r.metafile?await(await import("esbuild")).analyzeMetafile(r.metafile,{verbose:!0}):{}),e?.TypeScript?o(`tsc -p ${e?.TypeScript}`):o("tsc"),o(`typedoc 			--commentStyle all 			--gitRevision main 			--customCss ${p(`${l}/../Sheet/TypeDoc.css`)} 			--includeVersion 			--out ./Documentation 			--plugin typedoc-plugin-remove-references 			--plugin typedoc-plugin-rename-defaults 			--plugin typedoc-plugin-mdn-links 			--plugin typedoc-plugin-zod 			--plugin @mxssfd/typedoc-theme 			--plugin typedoc-plugin-merge-modules 			--plugin ${p(`${l}/../../Target/Function/TypeDoc.js`)} 			--theme my-theme 			--entryPointStrategy expand 			--mergeModulesRenameDefaults 			--mergeModulesMergeMode module 			--entryPoints ${Object.values(a.entryPoints).join(" --entryPoints ")}`)};const{default:o}=await import("../Function/Exec.js"),{deepmerge:n}=await import("deepmerge-ts"),{resolve:p}=await import("path"),l=(await import("url")).fileURLToPath((await import("path")).dirname(import.meta.url));export{l as Current,o as Exec,n as deepmerge,m as default,p as resolve};
