import React from 'react'

interface InstructionsCardProps {
    icon: string;
    title: string;
    description: string;
}

export default function InstructionsCard({ title, description }: InstructionsCardProps) {
    return (
        <div className="instructions-card">
            <div className="instructions-card-title">{title}</div>
            <div className="instructions-card-description">{description}</div>
        </div>
    )
}