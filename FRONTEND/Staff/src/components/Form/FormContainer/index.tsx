import { BaseSyntheticEvent, FormHTMLAttributes, PropsWithChildren } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';

export type FormContainerProps<T extends FieldValues = FieldValues> = PropsWithChildren<
  UseFormProps<T> & {
    onSuccess?: SubmitHandler<T>;
    onFailed?: SubmitErrorHandler<T> | undefined;
    FormProps?: FormHTMLAttributes<HTMLFormElement>;
    handleSubmit?: (e: BaseSyntheticEvent<T>) => Promise<void> | void;
    formContext: UseFormReturn<T>;
  }
>;

export function FormContainer<TFieldValues extends FieldValues = FieldValues>({
  handleSubmit,
  children,
  FormProps,
  formContext,
  onSuccess,
  onFailed,
}: PropsWithChildren<FormContainerProps<TFieldValues>>) {
  return (
    <FormProvider {...formContext}>
      <form
        noValidate
        {...FormProps}
        // @ts-ignore
        onSubmit={
          handleSubmit
            ? handleSubmit
            : onSuccess
            ? formContext.handleSubmit(onSuccess, onFailed)
            : () => ''
        }
      >
        {children}
      </form>
    </FormProvider>
  );
}
