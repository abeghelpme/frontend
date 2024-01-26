import DOMPurify from "isomorphic-dompurify";

const getPurifiedHTML = (HTMLString: string) => DOMPurify.sanitize(HTMLString);

export { getPurifiedHTML };
