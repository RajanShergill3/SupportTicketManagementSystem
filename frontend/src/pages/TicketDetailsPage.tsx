import { useParams } from 'react-router-dom';

import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';

export function TicketDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <PageContainer
      title="Ticket Details"
      description={`Ticket details for ID ${id} will be implemented in a future task.`}
    >
      <Card className="mt-6">
        <p className="text-sm text-slate-600">Ticket details placeholder content.</p>
      </Card>
    </PageContainer>
  );
}
