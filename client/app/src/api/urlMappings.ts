import entryPoint from "./entryPoint";

export type UrlMapping = {
  fullURL: string;
  urlKey: string;
};

export type UrlMappingGetAllParams = {
  search?: string;
  page?: number;
  page_size?: number;
};

export type UrlMappingGetAllResponse = {
  count: number;
  next: null | string;
  previous: null | string;
  results: UrlMapping[];
};

export type UrlMappingPostError = {
  fullURL?: string[];
  urlKey?: string[];
};

const urlMappingsApi = {
  getAll: (params?: UrlMappingGetAllParams) =>
    entryPoint.get<UrlMappingGetAllResponse>("mappings", { params: params }),
  get: (key: string) => entryPoint.get<UrlMapping>(`mappings/${key}`),
  post: (data: UrlMapping) => entryPoint.post("mappings/", data),
};

export default urlMappingsApi;
