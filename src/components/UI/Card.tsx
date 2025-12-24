import * as React from "react"
import { cn } from "@/src/utils/class-utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'light' | 'dark' | 'feature'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'light', ...props }, ref) => {
        const variants = {
            light: "bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300",
            dark: "bg-[#1a1a1a] p-8 border border-gray-800 rounded-lg hover:border-gray-600 transition-all duration-300",
            feature: "group p-8 bg-white border border-gray-200 hover:border-primary-200 rounded-2xl transition-all duration-300 hover:-translate-y-1"
        }

        return (
            <div
                ref={ref}
                className={cn(variants[variant], className)}
                {...props}
            />
        )
    }
)
Card.displayName = "Card"

export { Card }
