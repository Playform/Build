interface Environment {
	ASSETS: Fetcher;
}

export default <ExportedHandler<Environment>>{
	fetch: (request: Request, env: Environment) => {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
			return new Response("Ok");
		}

		return env.ASSETS.fetch(request);
	},
};

import type {
	ExportedHandler,
	Fetcher,
	Request,
} from "@cloudflare/workers-types";
import { Response } from "@cloudflare/workers-types";