'use client'

import { verifyToken } from '@dalim/auth'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

import AuthFormMessage from './auth-form-message'

const EmailVerificationForm = () => {
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const searchParams = useSearchParams()

    if (!searchParams || !searchParams.has('token')) return null

    const token = searchParams.get('token')

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const automaticSubmission = useCallback(() => {
        if (error || success) return

        if (!token) {
            setError('Invalid token')
            return
        }

        verifyToken(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError('Something went wrong')
            })
    }, [token, success, error])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        automaticSubmission()
    }, [automaticSubmission])

    return (
        <div className="flex flex-1 items-center justify-center">
            <div title="Verify your Email">
                {success && (
                    <AuthFormMessage
                        title="Success"
                        type="default"
                        message={success}
                    />
                )}
                {error && (
                    <AuthFormMessage
                        title="We encountered a problem"
                        type="default"
                        message={error}
                    />
                )}
            </div>
        </div>
    )
}

export default EmailVerificationForm
