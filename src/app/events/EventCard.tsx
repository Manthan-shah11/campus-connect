'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Event } from '@/lib/events';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarDays, MapPin } from 'lucide-react';
import { EventModal } from './EventModal';

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex h-full transform flex-col overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={event.image.url}
            alt={`Image for ${event.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={event.image.hint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 text-xl font-bold font-headline">
          {event.name}
        </CardTitle>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.venue}</span>
          </div>
        </div>
        <p className="mt-3 text-sm">{event.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <EventModal event={event} />
        <Button asChild>
          <Link href={`/events/${event.slug}/register`}>Register</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
