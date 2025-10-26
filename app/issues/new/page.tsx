'use client'

import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDEEditor from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css"
import { Controller, useForm } from 'react-hook-form'
import ApiService from '@/app/services/apiService'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const [error, setError] = useState({ isError: false, message: "" })

    const onSubmit = async (data: IssueForm) => {
        try {
            await ApiService.post('/api/issues', data)
            router.push('/issues')
        } catch (err) {
            setError({ isError: true, message: "An unexpected error occured!" })
            console.log(err)
        }
    }


    return (
        <div className='max-w-xl'>
            {(error?.isError && error?.message?.length > 0) && <Callout.Root color='red' className='my-5'>
                <Callout.Text>{error?.message}</Callout.Text>
            </Callout.Root>}
            <form onSubmit={handleSubmit((data) => onSubmit(data))} className='space-y-3'>
                <TextField.Root placeholder='Title' {...register('title')} />
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDEEditor placeholder='Description' {...field} />}
                />
                <Button>Create Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage