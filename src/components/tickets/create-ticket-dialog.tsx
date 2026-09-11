import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { TicketForm, type TicketFormData } from "./ticket-form"

export interface CreateTicketDialogProps {
  onSubmit?: (data: TicketFormData) => void | Promise<void>
  trigger?: React.ReactNode
}

export function CreateTicketDialog({ onSubmit, trigger }: CreateTicketDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit(data)
      }
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {trigger ? (
          trigger
        ) : (
          <Button>
            <PlusIcon />
            Novo Ticket
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Ticket</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar um novo ticket. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <TicketForm 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
        />
      </DialogContent>
    </Dialog>
  )
}
