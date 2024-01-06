import entryPoint from "./entryPoint";

export type UrlMapping = { 
  fullURL: string,
  urlKey: string,
};

export type UrlMappingGetAllParams = { 
  search?: string,
};

const urlMappingsApi = {
  getAll: (params?: UrlMappingGetAllParams) => entryPoint.get<UrlMapping[]>("", { params: params }),
  get: (key: string) => entryPoint.get<UrlMapping>(key),
  post: (data: UrlMapping) => entryPoint.post("", data),
};

export default urlMappingsApi;