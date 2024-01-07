import entryPoint from "./entryPoint";

export type UrlMapping = { 
  fullURL: string,
  urlKey: string,
};

export type UrlMappingGetAllParams = { 
  search?: string,
  page?: number,
  page_size?: number,
};

export type UrlMappingGetAllResponse = {
  count: number,
  next: null | string,
  previous: null | string,
  results: UrlMapping[]
};

const urlMappingsApi = {
  getAll: (params?: UrlMappingGetAllParams) => entryPoint.get<UrlMappingGetAllResponse>("", { params: params }),
  get: (key: string) => entryPoint.get<UrlMapping>(key),
  post: (data: UrlMapping) => entryPoint.post("", data),
};

export default urlMappingsApi;