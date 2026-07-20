import { StatCard } from '@/components/dashboard/StatCard';
import { Card } from '@/components/ui/Card';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { Table, TableCell, TableRow } from '@/components/ui/Table';
import { dashboardStats, recentActivity, recentTickets } from '@/data/dashboard.placeholder';

function getStatusVariant(status: string): BadgeVariant {
  switch (status) {
    case 'Open':
      return 'warning';
    case 'In Progress':
      return 'info';
    case 'Resolved':
      return 'success';
    case 'Closed':
      return 'default';
    default:
      return 'default';
  }
}

function getPriorityVariant(priority: string): BadgeVariant {
  switch (priority) {
    case 'Critical':
      return 'danger';
    case 'High':
      return 'accent';
    case 'Medium':
      return 'info';
    case 'Low':
      return 'success';
    default:
      return 'default';
  }
}

const recentTicketColumns = [
  { key: 'id', header: 'Ticket ID' },
  { key: 'title', header: 'Title' },
  { key: 'status', header: 'Status' },
  { key: 'priority', header: 'Priority' },
  { key: 'assignedTo', header: 'Assigned To' },
];

export function DashboardPage() {
  return (
    <div className="page-container space-y-8">
      <section>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          Overview of support operations and recent ticket activity.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Tickets</h2>
            <p className="mt-1 text-sm text-slate-500">Latest tickets across the support queue.</p>
          </div>

          <Table columns={recentTicketColumns}>
            {recentTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium text-slate-900">{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(ticket.status)}>{ticket.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityVariant(ticket.priority)}>{ticket.priority}</Badge>
                </TableCell>
                <TableCell>{ticket.assignedTo}</TableCell>
              </TableRow>
            ))}
          </Table>
        </Card>

        <Card>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
            <p className="mt-1 text-sm text-slate-500">Latest actions across the platform.</p>
          </div>

          <ol className="space-y-4">
            {recentActivity.map((activity, index) => (
              <li key={activity.id} className="relative pl-6">
                {index < recentActivity.length - 1 ? (
                  <span
                    className="absolute left-[7px] top-5 h-full w-px bg-slate-200"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary-500 bg-white"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                <p className="mt-1 text-sm text-slate-600">{activity.description}</p>
                <p className="mt-1 text-xs text-slate-400">{activity.time}</p>
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </div>
  );
}
