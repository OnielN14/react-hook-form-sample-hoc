import React from 'react';
import { useForm, UseFormProps, FieldValues, UseFormReturn } from 'react-hook-form'

export type WithHookForm<Fields = FieldValues> = {
  hookForm: UseFormReturn<Fields>
}

export default function withHookForm<Props = any, Fields = FieldValues>(Component: React.ComponentClass<Props>, hookFormConfig?: UseFormProps<Fields>) {
  return (props: Omit<Props, keyof WithHookForm<Fields>>) => {
    const form = useForm<Fields>(hookFormConfig)

    //@ts-ignore
    return <Component {...props} hookForm={form} />
  }
}