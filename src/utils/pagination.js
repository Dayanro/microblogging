import { LIMIT_ITEMS } from "./constants";

export const pageSize = (limit) => (limit < LIMIT_ITEMS ? limit : LIMIT_ITEMS);
export const documenToSkip = (page, limit) => (page - 1) * limit;
