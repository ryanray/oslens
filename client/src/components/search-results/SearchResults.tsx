import { Fragment } from 'react';
import { Box, Divider, Flex, Icon, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { RepositoryDto } from '../../types/OSLDtos.types';

interface SearchResultsProps {
  results: RepositoryDto[];
  onUpdateSelectedRepo: (result: RepositoryDto) => void
}

function SearchResults({ results = [], onUpdateSelectedRepo }: SearchResultsProps) {
  if (!results.length) {
    return (<></>);
  }
  return (
    <>
      <Box w="100%" mb='80px' bg={'#8ff5d9'} borderRadius='8px'>
        {
          results.map((result: RepositoryDto) => {
            return (
              <Fragment key={result.id}>
                <Box ml='3' p='10px'>
                  <Flex>
                    <Box p='15px 10px 0 0' _hover={{ color: 'pink.500', cursor: 'pointer' }} onClick={() => onUpdateSelectedRepo(result)}>
                      <Icon as={ViewIcon} />
                    </Box>
                    <Box flex='10'>
                      <Text fontWeight='bold'>
                        {result.name}
                      </Text>
                      <Text fontSize='sm'>{result.description}</Text>
                    </Box>
                    <Stat w='40px' size='sm' flex='1'>
                      <StatLabel>forks</StatLabel>
                      <StatNumber>{result.forksCount}</StatNumber>
                    </Stat>
                  </Flex>
                </Box>
                <Divider orientation='horizontal' style={{borderColor: '#61d2be'}} />
              </Fragment>
            )
          })
        }
      </Box>
    </>
  )
}

export default SearchResults;