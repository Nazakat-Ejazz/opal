import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  className: string
  title: string
  description: string
}

const Modal = ({ trigger, children, title, description, className }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
