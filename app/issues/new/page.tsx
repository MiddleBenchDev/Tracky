'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDEEditor from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css"
import { Controller, useForm } from 'react-hook-form'
import ApiService from '@/app/services/apiService'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validation.schema'
import { z } from 'zod'
import ErrorMessage from '@/app/components/errorMessage'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
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
                {
                    errors?.title && <ErrorMessage message={errors?.title?.message!} />
                }
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDEEditor placeholder='Description' {...field} />}
                />
                {
                    errors?.description && <ErrorMessage message={errors?.description?.message!} />
                }
                <Button>Create Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage