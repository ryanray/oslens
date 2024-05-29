import { describe, expect, it } from 'vitest';
import { commitMapper, customSort, repoMapper, SortDirection } from './GithubService';
import { GithubCommitDto, GithubRepositoryDto } from './Github.types';

describe('GithubService', async () => {
  describe('customSort', () => {
    it('sorts ASC', () => {
      const repos = [
        { name: 'b', forks_count: 200 },
        { name: 'c', forks_count: 100 },
        { name: 'a', forks_count: 300 },
      ];

      const result = repos.sort(customSort('forks_count', SortDirection.ASC));

      expect(result).toStrictEqual([
        { name: 'c', forks_count: 100 },
        { name: 'b', forks_count: 200 },
        { name: 'a', forks_count: 300 },
      ]);
    });
    it('sorts DESC', () => {
      const repos = [
        { name: 'b', forks_count: 200 },
        { name: 'c', forks_count: 100 },
        { name: 'a', forks_count: 300 },
      ];

      const result = repos.sort(customSort('forks_count', SortDirection.DESC));

      expect(result).toStrictEqual([
        { name: 'a', forks_count: 300 },
        { name: 'b', forks_count: 200 },
        { name: 'c', forks_count: 100 },
      ]);
    });
  });
  describe('repoMapper', () => {
    it('maps the github repo dto to OSL dto', () => {
      const input: GithubRepositoryDto = {
        id: 100,
        description: 'a description',
        name: 'test',
        full_name: 'super/test',
        html_url: 'http://github.com/super/test',
        stargazers_count: 200,
        watchers_count: 300,
        forks_count: 400,
      };

      const mapped = repoMapper(input);

      expect(mapped).toStrictEqual({
        id: 100,
        description: 'a description',
        name: 'test',
        fullName: 'super/test',
        htmlUrl: 'http://github.com/super/test',
        stargazersCount: 200,
        watchersCount: 300,
        forksCount: 400,
      });
    });
  });
  describe('commitMapper', () => {
    it('maps the github commit dto to OSL dto', () => {
      const input: GithubCommitDto = {
        url: 'http://my.commit/100',
        html_url: 'http://my.commit/100.html',
        commit: {
          author: {
            name: 'Doc Brown',
            email: 'great.scott@flux.capacitor',
            date: '2015-10-20 4:29:00'
          },
          message: 'When this baby hits 88mph'
        }
      };

      const mapped = commitMapper(input);

      expect(mapped).toStrictEqual({
        url: 'http://my.commit/100',
        htmlUrl: 'http://my.commit/100.html',
        author: {
          name: 'Doc Brown',
          email: 'great.scott@flux.capacitor',
          date: '2015-10-20 4:29:00'
        },
        message: 'When this baby hits 88mph'
      });
    });
  });
});