"use client"

import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
  children?: React.ReactNode
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

interface SelectValueProps {
  placeholder?: string
  children?: React.ReactNode
}

export const Select = ({ value, onValueChange, placeholder, className, children }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || '')

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.select-container')) {
      setIsOpen(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  React.useEffect(() => {
    setSelectedValue(value || '')
  }, [value])

  return (
    <div className={cn("relative select-container", className)}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return null

        if (child.type === SelectTrigger) {
          return React.cloneElement(child as React.ReactElement<SelectTriggerProps>, {
            onClick: () => setIsOpen(!isOpen),
            className: cn(child.props.className)
          })
        }

        if (child.type === SelectContent && isOpen) {
          return React.cloneElement(child as React.ReactElement<SelectContentProps>, {
            children: React.Children.map(child.props.children, contentChild => {
              if (!React.isValidElement(contentChild)) return null
              
              if (contentChild.type === SelectItem) {
                const itemProps = contentChild.props as SelectItemProps
                return React.cloneElement(contentChild as React.ReactElement<SelectItemProps>, {
                  ...itemProps,
                  onClick: () => handleSelect(itemProps.value),
                  className: cn(
                    itemProps.className,
                    selectedValue === itemProps.value && "bg-accent/10"
                  )
                })
              }
              return contentChild
            })
          })
        }

        if (child.type === SelectValue) {
          const selectedChild = React.Children.toArray(children)
            .find((child): child is React.ReactElement<SelectItemProps> => 
              React.isValidElement(child) && 
              child.type === SelectItem &&
              child.props.value === selectedValue
            )

          return React.cloneElement(child as React.ReactElement<SelectValueProps>, {
            children: selectedChild?.props.children || placeholder || "Seçiniz"
          })
        }

        return child
      })}
    </div>
  )
}

export const SelectTrigger = ({ children, className, onClick }: SelectTriggerProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer",
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </div>
  )
}

export const SelectValue = ({ placeholder, children }: SelectValueProps) => {
  return (
    <span className="text-sm truncate">
      {children || placeholder || "Seçiniz"}
    </span>
  )
}

export const SelectContent = ({ children, className }: SelectContentProps) => {
  return (
    <div className={cn(
      "absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto",
      className
    )}>
      <div className="py-1">
        {children}
      </div>
    </div>
  )
}

export const SelectItem = ({ value, children, className, onClick, ...props }: SelectItemProps) => {
  return (
    <div
      onClick={onClick}
      {...props}
      className={cn(
        "px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}
