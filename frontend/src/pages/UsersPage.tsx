import { ErrorMessage } from '@/components/ErrorMessage';
import { PageContainer } from '@/components/layout/PageContainer';
import { ActionMenu } from '@/components/ui/ActionMenu';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterSelect } from '@/components/ui/FilterSelect';
import { LoadingState } from '@/components/ui/LoadingState';
import { Pagination } from '@/components/ui/Pagination';
import { SearchInput } from '@/components/ui/SearchInput';
import { TableCell, TableRow } from '@/components/ui/Table';
import { useUsersTable } from '@/hooks/useUsersTable';
import { type User, type UserRole, type UserStatus } from '@/types/user.types';

const userColumns = [
  { key: 'avatar', header: 'Avatar' },
  { key: 'name', header: 'Full Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
  { key: 'createdAt', header: 'Created Date' },
  { key: 'actions', header: 'Actions' },
];

const roleFilterOptions = [
  { label: 'All Roles', value: 'all' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Developer', value: 'Developer' },
  { label: 'QA', value: 'QA' },
];

const statusFilterOptions = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
];

function getRoleVariant(role: UserRole) {
  switch (role) {
    case 'Admin':
      return 'info' as const;
    case 'Developer':
      return 'warning' as const;
    case 'QA':
      return 'success' as const;
    default:
      return 'default' as const;
  }
}

function getStatusVariant(status: UserStatus) {
  return status === 'Active' ? ('success' as const) : ('default' as const);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}

export function UsersPage() {
  const {
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    isLoading,
    error,
    clearError,
    filteredUsers,
    paginatedUsers,
    totalPages,
    pageSize,
    handleRefresh,
  } = useUsersTable();

  const renderTableContent = () => {
    if (isLoading) {
      return <LoadingState message="Loading users..." />;
    }

    if (error) {
      return (
        <div className="space-y-4">
          <ErrorMessage title="Failed to load users" message={error} />
          <Button variant="secondary" className="w-auto" onClick={clearError}>
            Dismiss
          </Button>
        </div>
      );
    }

    if (filteredUsers.length === 0) {
      return (
        <EmptyState
          title="No users found"
          description="Try adjusting your search or filters to find users."
          actionLabel="Reset filters"
          onAction={handleRefresh}
        />
      );
    }

    return (
      <>
        <DataTable columns={userColumns}>
          {paginatedUsers.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar name={user.name} />
              </TableCell>
              <TableCell className="font-medium text-slate-900">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={getRoleVariant(user.role)}>{user.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(user.status)}>{user.status}</Badge>
              </TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell>
                <ActionMenu
                  onView={() => undefined}
                  onEdit={() => undefined}
                  onDelete={() => undefined}
                />
              </TableCell>
            </TableRow>
          ))}
        </DataTable>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </>
    );
  };

  return (
    <PageContainer
      title="Users"
      description="Manage team members, roles, and account access across the support platform."
    >
      <Card className="mt-6 space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <SearchInput
              id="user-search"
              label="Search"
              value={search}
              placeholder="Search by name or email"
              onChange={setSearch}
            />
            <FilterSelect
              id="role-filter"
              label="Role"
              value={roleFilter}
              options={roleFilterOptions}
              onChange={setRoleFilter}
            />
            <FilterSelect
              id="status-filter"
              label="Status"
              value={statusFilter}
              options={statusFilterOptions}
              onChange={setStatusFilter}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" className="w-auto" onClick={handleRefresh}>
              Refresh
            </Button>
            <Button className="w-auto">Add User</Button>
          </div>
        </div>

        {renderTableContent()}
      </Card>
    </PageContainer>
  );
}
