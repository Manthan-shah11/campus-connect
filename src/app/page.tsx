import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import placeholderData from '@/lib/placeholder-images.json';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = placeholderData.placeholderImages.find(p => p.id === 'hero');

  return (
    <section className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center">
      <Image
        src={heroImage?.imageUrl || 'https://picsum.photos/seed/hero/1920/1080'}
        alt={heroImage?.description || 'Vibrant college campus with students'}
        fill
        className="object-cover"
        priority
        data-ai-hint={heroImage?.imageHint || 'college campus'}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl p-4 text-center text-primary-foreground">
        <h1 className="text-4xl font-bold tracking-tight drop-shadow-md sm:text-5xl md:text-7xl font-headline">
          Campus Connect 2024
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-primary-foreground/90 drop-shadow-sm md:text-xl">
          Your portal to the most exciting events of the year. Discover, connect,
          and celebrate with us.
        </p>
        <Button asChild size="lg" className="group mt-8">
          <Link href="/events">
            Explore Events
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
