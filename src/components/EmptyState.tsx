import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  iconSize?: number;
  iconClassName?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  iconSize = 64,
  iconClassName = 'text-zinc-400',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-600">
      <Icon size={iconSize} strokeWidth={1.5} className={`mb-6 ${iconClassName}`} />
      <p className="text-lg font-medium">{title}</p>
      {description && <p className="mt-2 text-sm">{description}</p>}
    </div>
  );
} 