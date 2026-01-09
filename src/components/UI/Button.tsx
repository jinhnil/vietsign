import * as React from "react"
import { cn } from "@/src/utils/class-utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'headerPill'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', ...props }, ref) => {
        const variants = {
            primary: "bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
            secondary: "bg-white text-gray-700 border border-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors",
            headerPill: "text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-5 py-2.5 rounded-full shadow-lg shadow-primary-600/20 transition-all hover:scale-105"
        }

        return (
            <button
                className={cn(variants[variant], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
