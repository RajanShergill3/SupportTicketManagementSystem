import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';

export function TicketsPage() {
  return (
    <PageContainer
      title="Tickets"
      description="Ticket list and filtering will be implemented in a future task."
    >
      <Card className="mt-6">
        <p className="text-sm text-slate-600">Tickets placeholder content.</p>
      </Card>
    </PageContainer>
  );
}
