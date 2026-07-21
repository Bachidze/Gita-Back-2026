"use client"
import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUSchema } from '../validators/Sign-Up';
import { useRouter } from 'next/navigation';

import axios from "axios"
import Link from 'next/link';
import { SignInSchema } from '../validators/Sign-In';
import {setCookie} from "cookies-next"
export default function SignIn() {
    
    const {register,handleSubmit,formState: { errors }} = useForm({
        resolver:yupResolver(SignInSchema)
    })

    const [error,setError] = useState("")

    const router = useRouter()
    async function onSubmit(data){
        try {
            setError("")
            const res = await axios.post("http://localhost:3030/auth/sign-in",data)
            if(res.status === 200){
                setCookie("accessToken",res.data.data,{maxAge:60*60})
                router.push("/dashboard")
            }

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <div className='flex items-center justify-center h-screen text-white'>
        <form onSubmit={handleSubmit(onSubmit)} className='h-auto w-[400px] bg-black p-4 rounded-2xl flex flex-col gap-4'> 


            <input type="text" placeholder='Email' className='border rounded-xl pl-4 py-4' {...register("email")} />
            <p>{errors.email?.message}</p>

            <input type="password" placeholder='password' className='border rounded-xl pl-4 py-4' {...register("password")} />
            <p>{errors.password?.message}</p>

            <button  className='bg-white text-black rounded-xl py-3 cursor-pointer'>Sign-Up</button>

            <div className='flex justify-center gap-4'>
                <span>if you dont have account</span>
                <Link className='text-blue-600' href={"/sign-up"}>Sign up</Link>
            </div>
        </form>
    </div>
    </>
  )
}
