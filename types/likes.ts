export interface Like {
  id?: number;
  postName: string;
}

export interface Error {
  error: string;
}

export interface LikesFunction {
  (postName: string | null): Promise<Like[] | Error>;
}
