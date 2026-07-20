import { useEffect, useRef, useState } from 'react';

interface ActionMenuProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

/**
 * Placeholder row action menu.
 */
export function ActionMenu({ onView, onEdit, onDelete, disabled = false }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={() => setIsOpen((current) => !current)}
        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Actions
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onView();
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            View
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            Edit
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}
