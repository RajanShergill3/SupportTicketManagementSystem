import { useParams } from 'react-router-dom';

export function TicketDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="page-container">
      <h1 className="page-title">Ticket Details</h1>
      <p className="page-description">
        Ticket details for ID <span className="font-medium text-slate-900">{id}</span> will be
        implemented in a future task.
      </p>
      <div className="mt-6 card">
        <p className="text-sm text-slate-600">Ticket details placeholder content.</p>
      </div>
    </div>
  );
}
