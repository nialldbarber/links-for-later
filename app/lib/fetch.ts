import type { Options } from "ky";
import ky from "ky";

export const api = {
	get: (url: string, options: Options = {}) => ky.get(url, options),
	post: (url: string, body?: BodyInit, options: Options = {}) =>
		ky.post(url, { ...options, body }),
};
