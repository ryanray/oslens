import { useQuery } from '@tanstack/react-query';

export function commitQuery(fullName?: string) {
  return useQuery({
    queryKey: ['repoCommits', fullName],
    queryFn: () => {
      if (!fullName) {
        return [];
      }
      return fetch(`http://localhost:8080/commits/${fullName}`).then((res) => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 404) {
          return [];
        }
        throw new Error(`Unable to fetch commits for repo: ${fullName}`);
      });
    },
    retry: false,
  });
}