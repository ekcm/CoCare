'use client';

import {
  CheckCircle2,
  Clock,
  CalendarDays,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useT } from '@/hooks/useTranslation';
import { taskIconMap } from '@/lib/typing';

type TaskItemProps = {
  id: number;
  label: string;
  completed: boolean;
  date: string;
  time: string;
  icon: string;
  notes?: string;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskItem({
  label,
  time,
  date,
  completed,
  icon,
  notes,
  onToggle,
  onDelete,
}: TaskItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const deleteConfirmText = useT('Are you sure you want to delete this task?');
  const deleteText = useT('Delete');
  const cancelText = useT('Cancel');
  const deleteTaskAriaLabel = useT('Delete task');
  const hideNotesLabel = useT('Hide Notes');
  const viewNotesLabel = useT('View Notes');
  const translatedNotes = useT(notes || '');

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowConfirm(false);
  };

  const hasNotes = notes && notes.trim() !== '';

  return (
    <>
      <div
        onClick={onToggle}
        className={cn(
          'flex justify-between items-center p-3 rounded-xl shadow-sm cursor-pointer relative',
          completed
            ? 'bg-blue-50 dark:bg-zinc-800'
            : 'bg-white dark:bg-zinc-900'
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          {taskIconMap[icon]}
          <div className="min-w-0">
            <p
              className={cn(
                'text-sm font-medium break-words',
                completed && 'line-through text-muted-foreground'
              )}
            >
              {useT(label)}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <p className="flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                {date}
              </p>
              <p className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {time}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasNotes && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotes(!showNotes);
              }}
              className="p-1 rounded hover:bg-blue-100 dark:hover:bg-zinc-700 transition-colors"
              aria-label={showNotes ? hideNotesLabel : viewNotesLabel}
            >
              {showNotes ? (
                <ChevronUp className="w-5 h-5 text-blue-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-blue-500" />
              )}
            </button>
          )}
          <CheckCircle2
            className={cn(
              'w-7 h-7 transition-colors',
              completed ? 'text-blue-500' : 'text-gray-300'
            )}
          />
          <button
            type="button"
            onClick={handleDeleteClick}
            className="p-1 rounded hover:bg-red-100 dark:hover:bg-zinc-700 transition-colors"
            aria-label={deleteTaskAriaLabel}
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {hasNotes && showNotes && (
        <div className="mt-1 mb-3 mx-3 p-3 rounded-xl bg-blue-50 dark:bg-zinc-800 text-sm text-gray-800 dark:text-gray-100 whitespace-pre-wrap shadow">
          {translatedNotes}
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-lg flex flex-col items-center gap-3">
            <p className="text-sm">{deleteConfirmText}</p>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDelete();
                }}
                className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
              >
                {deleteText}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(false);
                }}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-700 text-sm"
              >
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
