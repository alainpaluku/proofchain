'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm, AuthFormData, Logo, useTranslation } from '@proofchain/ui';
import { useAuth } from '@proofchain/shared';

export default function LoginPage() {
    const router = useRouter();
    const { signIn, signUp, resetPassword } = useAuth();
    const { t } = useTranslation();

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
                return { success: false, error: { message: t('auth', 'modeNotSupported') } };
        }
    };

    return (
        <AuthForm
            mode="login"
            onSubmit={handleSubmit}
            logo={<Logo subtitle="Admin" size="lg" href={undefined} />}
        />
    );
}
