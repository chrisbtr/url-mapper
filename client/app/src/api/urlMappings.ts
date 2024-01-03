import entryPoint from "./entryPoint";

export type UrlMapping = { 
  fullURL: string,
  urlKey: string,
};

const urlMappingsApi = {
  getAll: () => entryPoint.get<UrlMapping[]>(""),
  get: (key: string) => entryPoint.get<UrlMapping>(key),
  post: (data: UrlMapping) => entryPoint.post("", data),
};

export default urlMappingsApi;