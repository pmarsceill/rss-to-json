import parse from "./parse";
declare const Parse: (url: RequestInfo | URL, options?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    mode?: "cors" | "no-cors" | "same-origin";
    credentials?: "same-origin" | "omit" | "include";
    cache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
    redirect?: "follow" | "manual" | "error";
    referrer?: string;
    referrerPolicy?: "same-origin" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
    integrity?: string;
    keepalive?: boolean;
}) => Promise<{
    title: any;
    description: any;
    link: any;
    image: any;
    category: any;
    items: any[];
}>;
export default parse;
export { parse, Parse };
