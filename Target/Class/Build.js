#!/usr/bin/env node
var i=new(await import("commander")).Command().name("Build").version("0.0.3").description("\u{1F300}\u2000Build.").argument("<File...>","File.").option("-ES, --ESBuild <File>","ESBuild.").option("-TS, --TypeScript <File>","TypeScript.").action((await import("../Function/Build.js")).default).parse();export{i as default};
