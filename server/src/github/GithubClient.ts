import { Octokit } from '@octokit/rest';
import { GithubCommitDto, GithubRepositoryDto } from './Github.types';

interface ProjectSearchArgs {
  orgName: string;
  repoName?: string;
}

const LIMIT_PER_PAGE = 30;

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getProjectsByOrg({ orgName }: ProjectSearchArgs): Promise<GithubRepositoryDto[]> {
  // TODO error handling
  const response = await octokit.request('GET /orgs/{org/repos', {
    org: orgName,
    per_page: LIMIT_PER_PAGE,
  });

  return response.data as GithubRepositoryDto[];
}

export async function getCommitsByOrgAndRepo({ orgName, repoName }: ProjectSearchArgs): Promise<GithubCommitDto[]> {
  // TODO error handling
  if (!repoName) {
    throw new Error('repository name is required.');
  }
  const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: orgName,
    repo: repoName,
    per_page: LIMIT_PER_PAGE,
  });

  return response.data as unknown as GithubCommitDto[];
}