import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout } from '@/layouts/MainLayout';
import { CreateTicketPage } from '@/pages/CreateTicketPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { EditTicketPage } from '@/pages/EditTicketPage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { TicketDetailsPage } from '@/pages/TicketDetailsPage';
import { TicketsPage } from '@/pages/TicketsPage';
import { UsersPage } from '@/pages/UsersPage';

/**
 * Application route configuration.
 */
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/new" element={<CreateTicketPage />} />
          <Route path="/tickets/:id/edit" element={<EditTicketPage />} />
          <Route path="/tickets/:id" element={<TicketDetailsPage />} />
        </Route>

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
