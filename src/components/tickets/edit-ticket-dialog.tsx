import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Ticket } from "@/types"
import { type TicketFormData, TicketForm } from "./ticket-form"

export interface EditTicketDialogProps {
  ticket: Ticket | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (ticketId: string, data: TicketFormData) => void | Promise<void>
}

export function EditTicketDialog({ ticket, open, onOpenChange, onSubmit }: EditTicketDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: TicketFormData) => {
    if (!ticket) return

    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit(ticket.id, data)
      }
      onOpenChange(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Prepara os initialValues baseados no ticket (sempre que o dialog abrir)
  const initialValues: Partial<TicketFormData> | undefined = ticket
    ? {
        title: ticket.title,
        description: ticket.description || "",
        priority: ticket.priority,
        workspace_id: ticket.workspace_id,
        assignee_id: ticket.assignee_id || "",
      }
    : undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Ticket</DialogTitle>
          <DialogDescription>
            Atualize as informações do ticket e clique em salvar para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        {ticket && (
          <TicketForm 
              initialValues={initialValues}
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
