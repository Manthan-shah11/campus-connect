import { getEvents } from '@/lib/events';
import { EventCard } from './EventCard';

export default function EventsPage() {
  const events = getEvents();

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 text-center md:mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
          Upcoming Events 2024
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground md:mt-4">
          Explore our vibrant lineup of technical, cultural, and community
          events.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
