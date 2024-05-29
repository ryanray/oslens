import { useQuery } from '@tanstack/react-query';

export function searchQuery(searchTerm?: string) {
  return useQuery({
    queryKey: ['orgRepos', searchTerm],
    queryFn: () => {
      if (!searchTerm) {
        return [];
      }
      return fetch(`http://localhost:8080/search?orgName=${searchTerm}`).then((res) => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 404) {
          return [];
        }
        throw new Error('Unable to fetch search results');
      });
    },
    retry: false,
  });
}
