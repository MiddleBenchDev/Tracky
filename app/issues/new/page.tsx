'use client'

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDEEditor from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css"
import { Controller, useForm } from 'react-hook-form'
import ApiService from '@/app/services/apiService'
import { useRouter } from 'next/navigation'

interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()

    const onSubmit = async (data: IssueForm) => {
        await ApiService.post('/api/issues', data)
        router.push('/issues')
    }


    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))} className='max-w-xl space-y-3'>
            <TextField.Root placeholder='Title' {...register('title')} />
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDEEditor placeholder='Description' {...field} />}
            />
            <Button>Create Issue</Button>
        </form>
    )
}

export default NewIssuePage