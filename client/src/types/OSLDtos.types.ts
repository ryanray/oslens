export interface RepositoryDto {
  id: number;
  description: string;
  name: string;
  fullName: string;
  htmlUrl: string;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
}

export interface CommitDto {
  url: string;
  htmlUrl: string;
  author: {
    name: string;
    email: string;
    date: string;
  }
  message: string;
}