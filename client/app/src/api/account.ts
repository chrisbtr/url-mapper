import entryPoint from "./entryPoint";

export type CreateAccountData = {
  username: string;
  password: string;
};

export type LoginAccountData = {
  username: string;
  password: string;
};

export type AccountInfo = {
  username: string;
};

export type CreateAccountError = {
  username?: string[];
  password?: string[];
};

const accountApi = {
  createAccount: (data: CreateAccountData) =>
    entryPoint.post("account/register", data),
  login: (data: LoginAccountData) => entryPoint.post("account/login", data),
  logout: () => entryPoint.post("account/logout"),
  getAccount: () => entryPoint.get<AccountInfo>("account/user"),
};

export default accountApi;
