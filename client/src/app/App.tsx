import { useEffect, useState } from 'react'
import './App.css';
import logo from '../assets/logo.png';

import {
  Box,
  Container,
  Center,
} from '@chakra-ui/react';

import Commits from '../components/commits/Commits';
import SearchBar from '../components/search-bar/SearchBar';
import SearchResults from '../components/search-results/SearchResults';
import NavigationError from '../components/navigation-error/NavigtionError';
import { commitQuery } from '../queries/CommitQuery';
import { searchQuery } from '../queries/SearchQuery';
import { RepositoryDto } from '../types/OSLDtos.types';

function App() {
  const [showCommits, setShowCommits] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<RepositoryDto | undefined>(undefined);
  const [navigationError, setNavigationError] = useState('');

  const { isPending: isSearchPending, error: searchError, data: searchData, } = searchQuery(searchTerm);
  const { isPending: isCommitsPending, error: commitsError, data: commitsData, } = commitQuery(selectedRepo?.fullName);

  useEffect(() => {
    if (searchError) {
      setNavigationError('Unable to get search results. Please try again later.');
    }
  }, [searchError]);

  useEffect(() => {
    if (commitsError) {
      setNavigationError('Unable to get commits. Please try again later.');
    }
  }, [commitsError]);

  function handleSearchTermUpdate(newTerm: string) {
    setNavigationError('');
    setSearchTerm(newTerm);
    setSelectedRepo(undefined);
    setShowCommits(false);
  }

  function handleSelectedRepoUpdate(selectedRepo: RepositoryDto) {
    setNavigationError('');
    setSelectedRepo(selectedRepo);
    setShowCommits(true);
  }

  return (
    <>
      <Box w="100%" h="300px" bgGradient="linear(to-t, #61d2be, pink.500)" />
      <Container maxW='2xl'>
        <Box w='100%'>
          <Center mb='10px'>
            <img src={logo} />
          </Center>
          <SearchBar isPending={isSearchPending} onSearchTermUpdate={handleSearchTermUpdate} />
          { navigationError && <NavigationError text={navigationError} />}
          { !showCommits && <SearchResults results={searchData} onUpdateSelectedRepo={handleSelectedRepoUpdate} />}
          { showCommits && <Commits isPending={isCommitsPending} commits={commitsData} />}
        </Box>
      </Container>
    </>
  )
}

export default App;
