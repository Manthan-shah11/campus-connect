import { getEventBySlug } from '@/lib/events';
import { EventRegisterForm } from './EventRegisterForm';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { notFound } from 'next/navigation';

type EventRegisterPageProps = {
  params: {
    slug: string;
  };
};

export default function EventRegisterPage({ params }: EventRegisterPageProps) {
  const event = getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">
            Register for {event.name}
          </CardTitle>
          <CardDescription>
            Confirm your details to secure your spot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EventRegisterForm eventName={event.name} />
        </CardContent>
      </Card>
    </div>
  );
}
