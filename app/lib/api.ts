import type { Options } from "ky";
import ky from "ky";

function get(url: string, options: Options = {}) {
	return ky.get(url, options);
}

function post(url: string, body?: BodyInit, options: Options = {}) {
	return ky.post(url, { ...options, body });
}

function put(url: string, body?: BodyInit, options: Options = {}) {
	return ky.put(url, { ...options, body });
}

function del(url: string, options: Options = {}) {
	return ky.delete(url, options);
}

export const api = {
	get,
	post,
	put,
	del,
};
