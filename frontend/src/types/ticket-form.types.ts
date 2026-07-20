import { type TicketPriority } from '@/types/ticket.types';

export interface TicketFormValues {
  title: string;
  description: string;
  priority: TicketPriority | '';
  reporter: string;
  assignee: string;
}

export interface CreateTicketInput {
  title: string;
  description: string;
  priority: TicketPriority;
  reporter: string;
  assignee: string;
}

export interface UpdateTicketInput {
  title: string;
  description: string;
  priority: TicketPriority;
  assignee: string;
}

export const EMPTY_TICKET_FORM_VALUES: TicketFormValues = {
  title: '',
  description: '',
  priority: '',
  reporter: '',
  assignee: '',
};
