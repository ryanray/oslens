export interface GithubRepositoryDto {
  id: number;
  name: string;
  description: string;
  full_name: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
}

export interface OSLRepositoryDto {
  id: number;
  description: string;
  name: string;
  fullName: string;
  htmlUrl: string;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
}

export interface GithubCommitDto {
  url: string;
  html_url: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    }
    message: string;
  }
}

export interface OSLCommitDto {
  url: string;
  htmlUrl: string;
  author: {
    name: string;
    email: string;
    date: string;
  }
  message: string;
}