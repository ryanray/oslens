import { Alert } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

interface NavigationErrorProps {
  text: string;
}

function NavigationError({ text }: NavigationErrorProps) {
  return (
    <>
      <Alert status='error' borderRadius='8px' color='red.500'>
        <WarningIcon mr='5px' />
        { text }
      </Alert>
    </>
  )
}

export default NavigationError;