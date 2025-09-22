import type { Event } from '@/lib/events';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CalendarDays, Clock, MapPin, Sparkles } from 'lucide-react';
import { EventSummary } from './EventSummary';

type EventModalProps = {
  event: Event;
};

export function EventModal({ event }: EventModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="relative mb-4 h-64 w-full">
            <Image
              src={event.image.url}
              alt={`Image for ${event.name}`}
              fill
              className="rounded-md object-cover"
              sizes="100vw"
              data-ai-hint={event.image.hint}
            />
          </div>
          <DialogTitle className="text-3xl font-bold font-headline">
            {event.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-1 gap-4 text-muted-foreground sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <CalendarDays className="mt-1 h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Date</h3>
                <p>{event.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-1 h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Time</h3>
                <p>{event.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 col-span-full">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Venue</h3>
                <p>{event.venue}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold font-headline text-foreground">
              About the Event
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {event.longDescription}
            </p>
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold font-headline text-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Summary
            </h3>
            <EventSummary eventDetails={event.longDescription} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
