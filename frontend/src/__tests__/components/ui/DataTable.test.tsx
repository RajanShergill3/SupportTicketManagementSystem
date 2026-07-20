import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DataTable } from '@/components/ui/DataTable';
import { Table, TableCell, TableRow } from '@/components/ui/Table';
import { render, screen } from '@/test/render';

const columns = [
  { key: 'title', header: 'Title' },
  { key: 'status', header: 'Status' },
];

describe('DataTable', () => {
  it('renders column headers and row content', () => {
    render(
      <DataTable columns={columns}>
        <TableRow>
          <TableCell>Login failure</TableCell>
          <TableCell>Open</TableCell>
        </TableRow>
      </DataTable>,
    );

    expect(screen.getByRole('columnheader', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
    expect(screen.getByText('Login failure')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
  });
});

describe('Table', () => {
  it('renders headers and supports row click callbacks', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Table columns={columns}>
        <TableRow onClick={onClick}>
          <TableCell>Login failure</TableCell>
          <TableCell>Open</TableCell>
        </TableRow>
      </Table>,
    );

    await user.click(screen.getByText('Login failure'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
