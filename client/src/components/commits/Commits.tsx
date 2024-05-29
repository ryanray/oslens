import { Fragment } from 'react';
import { Alert, Box, Center, Divider, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { InfoIcon } from '@chakra-ui/icons';
import { CommitDto } from '../../types/OSLDtos.types';

interface CommitsProps {
  commits: CommitDto[];
  isPending: boolean;
}

function Commits({ commits = [], isPending }: CommitsProps) {
  if (isPending) {
    return (
      <>
        <Box w="100%" mb='80px' bg={'#8ff5d9'} borderRadius='8px'>
        </Box>
      </>
    )
  }
  if (!commits.length) {
    return (
      <>
        <Box w="100%" mb='80px' bg={'#8ff5d9'} borderRadius='8px'>
          <Alert status='info'>
            <InfoIcon />
            No commits found. Please select a different repo.
          </Alert>
        </Box>
      </>
    )
  }
  return (
    <>
      <Box w="100%" mb='80px' bg={'#8ff5d9'} borderRadius='8px'>
        {
          commits.map((commit) => {
            return (
                <Fragment key={commit.url}>
                  <Link href={commit.htmlUrl} isExternal _hover={{ color: 'pink.500', cursor: 'pointer' }}>
                    <Box ml='3' p='10px'>
                      <Flex>
                        <Box p='10px 10px 10px 0'>
                          <Icon as={ExternalLinkIcon} />
                        </Box>
                        <Box flex='10'>
                          <Text fontWeight='bold'>
                            {commit.author.name}
                          </Text>
                          <Text fontSize='sm' style={{textOverflow: 'ellipsis'}}>{commit.message.substring(0, 110)}...</Text>
                        </Box>
                        <Box flex='4'>
                          <Center>
                            <Text fontSize='sm'>{commit.author.date}</Text>
                          </Center>
                        </Box>
                      </Flex>
                    </Box>
                  </Link>
                  <Divider orientation='horizontal' style={{borderColor: '#61d2be'}} />
                </Fragment>
            )
          })
        }
      </Box>
      <Divider orientation='horizontal' style={{borderColor: '#61d2be'}} />
    </>
  )
}

export default Commits;