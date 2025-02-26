'use client';

// import { registerUser } from '@/app/actions/authActions';
import { RegisterSchema } from '@/lib/schemas/registerSchema';
import { handleFormServerErrors } from '@/lib/util';
// import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardBody, Button, Input } from '@heroui/react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';
import { registerUser } from '@/app/actions/authActions';
// import Link from 'next/link';
// import UserDetailsForm from './UserDetailsForm';
// import ProfileForm from './ProfileForm';
// import { useRouter } from 'next/navigation';

// const stepSchemas = [registerSchema, profileSchema];

export default function RegisterForm() {
    // const router = useRouter();
    // const [activeStep, setActiveStep] = useState(0);
    // const currentValidationSchema = stepSchemas[activeStep];

    // const methods = useForm<RegisterSchema>({
    //     resolver: zodResolver(registerSchema),
    //     mode: 'onTouched'
    // });

        const { register, handleSubmit, setError, formState: { errors, isValid, isSubmitting } } = useForm<RegisterSchema>({
            // resolver: zodResolver(registerSchema),
            mode: 'onTouched'
        });

    // const { handleSubmit, setError, getValues, formState: { errors, isValid, isSubmitting } } = methods;

    const onSubmit = async (data:RegisterSchema) => {
        
        const result = await registerUser(data);
        if (result.status === 'success') {
            console.log('User created successfully');
        //     router.push('/register/success');
        } else {
            handleFormServerErrors(result, setError);
        }
    }

    // const getStepContent = (step: number) => {
    //     switch (step) {
    //         case 0:
    //             return <UserDetailsForm />
    //         case 1:
    //             return <ProfileForm />
    //         default:
    //             return 'Unknown step';
    //     }
    // }

    // const onBack = () => {
    //     setActiveStep(prev => prev - 1);
    // }

    // const onNext = async () => {
    //     if (activeStep === stepSchemas.length - 1) {
    //         await onSubmit();
    //     } else {
    //         setActiveStep(prev => prev + 1);
    //     }
    // }

    // return (
    //     <Card className='w-2/5 mx-auto'>
    //         <CardHeader className='flex flex-col items-center justify-center'>
    //             <div className='flex flex-col gap-2 items-center text-secondary'>
    //                 <div className='flex flex-row items-center gap-3'>
    //                     <GiPadlock size={30} />
    //                     <h1 className='text-3xl font-semibold'>Register</h1>
    //                 </div>
    //                 <p className='text-neutral-500'>Welcome to NextMatch</p>
    //             </div>
    //         </CardHeader>
    //         <CardBody>
    //             {/* <FormProvider {...methods}> */}
    //                 <form onSubmit={handleSubmit(onSubmit)}>
    //                     <div className='space-y-4'>
    //                         {/* {getStepContent(activeStep)} */}
                            //  {{errors.root?.serverError && (
                            //     <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
                            // )} 
    //                         <div className='flex flex-row items-center gap-6'>
    //                             {/* {activeStep !== 0 && (
    //                                 <Button onClick={onBack} fullWidth>
    //                                     Back
    //                                 </Button>
    //                             )} */}
    //                             <Button
    //                                 // isLoading={isSubmitting}
    //                                 isDisabled={!isValid}
    //                                 fullWidth color='secondary' type='submit'
    //                             >
    //                                 {/* {activeStep === stepSchemas.length -1 ? 'Submit' : 'Continue'} */}
    //                             </Button>
    //                         </div>

    //                     </div>
    //                 </form>
    //             {/* </FormProvider> */}

    //         </CardBody>
    //     </Card>
    // )


    return (
        <Card className='w-2/5 mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-secondary'>
                    <div className='flex flex-row items-center gap-3'>
                        <GiPadlock size={30} />
                        <h1 className='text-3xl font-semibold'>Register</h1>
                    </div>
                    <p className='text-neutral-500'>Welcome back to NextMatch</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <Input 
                            defaultValue=''
                            label='Name'
                            variant='bordered'
                            {...register('name')}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                        />
                        <Input 
                            defaultValue=''
                            label='Email'
                            variant='bordered'
                            {...register('email')}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                      <Input
                          defaultValue=''
                          label='Password'
                          variant='bordered'
                          type='password'
                          {...register('password')}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                        />
                        {errors.root?.serverError && (
                                 <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
                             )} 
                        <Button
                            isLoading={isSubmitting}
                            isDisabled={!isValid}
                            fullWidth
                            color='secondary'
                            type='submit'
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
  )
}
