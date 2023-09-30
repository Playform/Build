/**
 * @module TypeDoc
 *
 */
export default class
	extends (await import("typedoc")).DefaultTheme
	implements Type
{
	override getRenderContext(
		...[Event]: Parameters<Type["getRenderContext"]>
	): Context {
		return new Context(this, Event, this.application.options);
	}
}

import type Context from "../../Interface/TypeDoc/Context.js";

import type Type from "../../Interface/TypeDoc/Theme.js";

export const { default: Context } = await import("./Context.js");
