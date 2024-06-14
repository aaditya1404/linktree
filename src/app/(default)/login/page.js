import LoginWithGoogle from '@/components/buttons/LoginWithGoogle'
import React from 'react'

const LoginPage = () => {
    return (
        <div>
            <div className='bg-white p-4 border max-w-xs mx-auto'>
                <h1 className='text-4xl font-bold text-center mb-6'>Sign In</h1>
                <LoginWithGoogle />
            </div>
        </div>
    )
}

export default LoginPage
