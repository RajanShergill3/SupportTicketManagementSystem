interface AvatarProps {
  name: string;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Reusable avatar placeholder using user initials.
 */
export function Avatar({ name, className = '' }: AvatarProps) {
  return (
    <div
      className={[
        'flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700',
        className,
      ].join(' ')}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}

interface AvatarWithNameProps {
  name: string;
  subtitle?: string;
}

export function AvatarWithName({ name, subtitle }: AvatarWithNameProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={name} />
      <div className="hidden text-left sm:block">
        <p className="text-sm font-medium text-slate-900">{name}</p>
        {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : null}
      </div>
    </div>
  );
}

