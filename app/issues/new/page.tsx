'use client'

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDEEditor from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css"

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder='Title' />
        <SimpleMDEEditor placeholder='Description' />
        <Button>Create Issue</Button>
    </div>
  )
}

export default NewIssuePage