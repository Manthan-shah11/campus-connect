'use client';

import { useEffect, useState } from 'react';
import {
  summarizeEventDetails,
  type SummarizeEventDetailsOutput,
} from '@/ai/flows/summarize-event-details';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

type EventSummaryProps = {
  eventDetails: string;
};

export function EventSummary({ eventDetails }: EventSummaryProps) {
  const [summary, setSummary] = useState<SummarizeEventDetailsOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await summarizeEventDetails({ eventDetails });
        setSummary(result);
      } catch (e) {
        setError('Failed to generate summary. Please try again later.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [eventDetails]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <p className="text-sm leading-relaxed text-muted-foreground">
      {summary?.summary}
    </p>
  );
}
