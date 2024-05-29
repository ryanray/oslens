import { getCommitsByOrgAndRepo, getProjectsByOrg } from './GithubClient';
import { GithubCommitDto, GithubRepositoryDto, OSLCommitDto, OSLRepositoryDto } from './Github.types';

interface SearchArgs {
  orgName: string;
  repoName?: string;
}

export enum SortDirection {
  ASC='asc',
  DESC='desc',
}

export async function searchProjectsByOrg({ orgName }: SearchArgs) {
  const projects = await getProjectsByOrg({ orgName });
  return projects
      .sort(customSort('forks_count', SortDirection.DESC))
      .map((repo) => repoMapper(repo));
}

export async function listCommitsByProject({ orgName, repoName }: SearchArgs) {
  const commits = await getCommitsByOrgAndRepo({ orgName, repoName });
  return commits.map((commit) => commitMapper(commit));
}

export function customSort(key: string, direction: SortDirection) {
  // TODO generics for this guy
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  return (a: any, b: any) => {
    if (a[key] < b[key]) {
      return direction === SortDirection.ASC ? -1 : 1;
    } else if (a[key] > b[key]) {
      return direction === SortDirection.ASC ? 1 : -1;
    }
    return 0;
  }
}

export function repoMapper(repo: GithubRepositoryDto): OSLRepositoryDto {
  return {
    id: repo.id,
    description: repo.description,
    name: repo.name,
    fullName: repo.full_name,
    htmlUrl: repo.html_url,
    stargazersCount: repo.stargazers_count,
    watchersCount: repo.watchers_count,
    forksCount: repo.forks_count,
  };
}

export function commitMapper(commit: GithubCommitDto): OSLCommitDto {
  return {
    url: commit.url,
    htmlUrl: commit.html_url,
    author: {
      name: commit.commit.author.name,
      email: commit.commit.author.email,
      date: commit.commit.author.date,
    },
    message: commit.commit.message,
  }
}