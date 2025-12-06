'use client';

import { LucideIcon } from 'lucide-react';

export interface PageHeaderProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
}

export function PageHeader({ icon: Icon, title, description }: PageHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-3">
                {Icon && <Icon className="h-8 w-8 text-primary" />}
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            </div>
            {description && (
                <p className="mt-2 text-muted-foreground">{description}</p>
            )}
        </div>
    );
}
