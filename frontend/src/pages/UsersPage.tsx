import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';

export function UsersPage() {
  return (
    <PageContainer
      title="Users"
      description="User management will be implemented in a future task."
    >
      <Card className="mt-6">
        <p className="text-sm text-slate-600">Users placeholder content.</p>
      </Card>
    </PageContainer>
  );
}
