'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm, AuthFormData, Logo } from '@proofchain/ui';
import { useAuth } from '@proofchain/shared';

export default function LoginPage() {
    const router = useRouter();
    const { signIn, signUp, resetPassword } = useAuth();

    const handleSubmit = async (data: AuthFormData) => {
        let result;

        switch (data.mode) {
            case 'login':
                result = await signIn(data.email, data.password);
                if (result.success) {
                    router.push('/');
                }
                return result;

            case 'register':
                result = await signUp(data.email, data.password, data.name);
                return result;

            case 'forgot-password':
                result = await resetPassword(data.email);
                return result;

            default:
                return { success: false, error: { message: 'Mode non supporté' } };
        }
    };

    return (
        <AuthForm
            mode="login"
            onSubmit={handleSubmit}
            logo={<Logo subtitle="Issuer" size="lg" href={undefined} />}
        />
    );
}
