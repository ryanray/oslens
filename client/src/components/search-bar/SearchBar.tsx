import { Box, Button, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Formik, Form, Field } from 'formik';

interface SearchBarProps {
  onSearchTermUpdate: (searchTerm: string) => void;
  isPending: boolean;
}

interface InnerFormProps {
  field: any;
  form: any;
}

function SearchBar({onSearchTermUpdate, isPending}: SearchBarProps) {
  return (
    <>
      <Formik initialValues={{search: ''}}
              onSubmit={(values, { setSubmitting }) => {
                onSearchTermUpdate(values.search);
                setSubmitting(false);
              }}>
      {({
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box w="100%" mb='20px' p='10px' bg={'#8ff5d9'} borderRadius='8px'>
              <Field name='search'>
                {({field, form}: InnerFormProps) => (
                  <FormControl isRequired>
                    <InputGroup size='sm' p='10px'>
                      <Input {...field} variant='unstyled' placeholder='Enter GitHub Organization...' />
                      <InputRightElement width='4.5rem' m='5px'>
                        <Button isLoading={(isSubmitting || isPending)} type='submit' rightIcon={<SearchIcon />} colorScheme='pink' size='xs'>Search</Button>
                      </InputRightElement>
                      <FormErrorMessage>{form.errors?.search}</FormErrorMessage>
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
            </Box>
          </Form>
      )}
      </Formik>
    </>
  );
}

export default SearchBar;