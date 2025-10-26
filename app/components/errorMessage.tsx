import React from 'react'
import { Text } from '@radix-ui/themes'

const ErrorMessage = ({message}: {message: string}) => {
  return (
    <Text className='mb-2' color='red' as="p">{message}</Text>
  )
}

export default ErrorMessage