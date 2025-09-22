import placeholderData from '@/lib/placeholder-images.json';

export type Event = {
  id: string;
  slug: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  longDescription: string;
  image: {
    url: string;
    hint: string;
  };
  colorAccent: string;
};

const getImage = (id: string) => {
  const imageData = placeholderData.placeholderImages.find(p => p.id === id);
  return {
    url: imageData?.imageUrl || 'https://picsum.photos/seed/default/600/400',
    hint: imageData?.imageHint || 'event image',
  };
};

const eventsData: Event[] = [
  {
    id: '1',
    slug: 'elicium-2024',
    name: 'Elicium 2024',
    date: 'December 15-16, 2024',
    time: '10:00 AM - 10:00 PM',
    venue: 'Main College Auditorium',
    description:
      'The annual technical and cultural fest, full of innovation and excitement.',
    longDescription:
      "Elicium is the flagship annual event of our college, blending technology and culture into a grand spectacle. This two-day fest features a plethora of events including coding competitions, robotics challenges, paper presentations, live music, dance performances, and celebrity nights. It's a platform for students to showcase their talents and learn from industry experts. Get ready for an unforgettable experience of learning, competition, and entertainment.",
    image: getImage('elicium'),
    colorAccent: 'hsl(320 70% 50%)',
  },
  {
    id: '2',
    slug: 'blood-donation-camp',
    name: 'Blood Donation Camp',
    date: 'October 28, 2024',
    time: '9:00 AM - 5:00 PM',
    venue: 'College Gymnasium',
    description: 'Give the gift of life. Your donation can save up to three lives.',
    longDescription:
      'In collaboration with the Red Cross Society, our college is organizing a Blood Donation Camp. This noble cause aims to help those in need and raise awareness about the importance of blood donation. All healthy individuals are encouraged to participate. Refreshments will be provided for all donors. Every drop counts, and your contribution can make a huge difference.',
    image: getImage('bloodDonation'),
    colorAccent: 'hsl(0 84% 60%)',
  },
  {
    id: '3',
    slug: 'international-yoga-day',
    name: 'International Yoga Day',
    date: 'June 21, 2024',
    time: '7:00 AM - 9:00 AM',
    venue: 'College Sports Ground',
    description: 'Unite with mind and body. Celebrate health and wellness.',
    longDescription:
      'Join us in celebrating International Yoga Day with a rejuvenating morning session of yoga and meditation. Led by certified instructors, this session is open to all students and staff, regardless of experience level. Discover the benefits of yoga for physical and mental well-being. Please bring your own yoga mat.',
    image: getImage('yogaDay'),
    colorAccent: 'hsl(120 40% 60%)',
  },
  {
    id: '4',
    slug: 'rangoli-workshop',
    name: 'Rangoli Workshop',
    date: 'November 5, 2024',
    time: '2:00 PM - 4:00 PM',
    venue: 'Art & Craft Room',
    description:
      'Unleash your creativity with colors in this hands-on workshop.',
    longDescription:
      "Get into the festive spirit by learning the beautiful art of Rangoli. This workshop will cover basic to advanced techniques for creating stunning traditional and modern designs. All materials will be provided. It's a perfect opportunity to relax, be creative, and prepare for the upcoming Diwali celebrations.",
    image: getImage('rangoli'),
    colorAccent: 'hsl(30 90% 55%)',
  },
  {
    id: '5',
    slug: 'ganpati-aagman',
    name: 'Ganpati Aagman',
    date: 'September 7, 2024',
    time: '4:00 PM onwards',
    venue: 'College Entrance',
    description: 'Welcome Lord Ganesha with music, dance, and devotion.',
    longDescription:
      'Experience the vibrant and devotional atmosphere of Ganpati Aagman. We will welcome the idol of Lord Ganesha to our campus with a grand procession featuring dhol-tasha, traditional dances, and chants. The celebration marks the beginning of the 10-day Ganeshotsav on campus.',
    image: getImage('ganpati'),
    colorAccent: 'hsl(25 95% 53%)',
  },
  {
    id: '6',
    slug: 'pre-navratri-celebration',
    name: 'Pre-Navratri Celebration',
    date: 'September 20, 2024',
    time: '6:00 PM - 10:00 PM',
    venue: 'SDJ International College, Palsana & Maniba Aahir Samaj AC Hall, Palsana',
    description:
      'Get ready to dance the night away with Garba and Dandiya beats with Kajal Naik and Kaushik Parekh!',
    longDescription:
      "Gear up for Navratri with our grand pre-celebration! Don your traditional attire and join us for an evening of energetic Garba and Dandiya Raas with VR Event by Kajal Naik and Kaushik Parekh and Band. We'll have live music, food stalls, and prizes for the best dancers and best-dressed attendees. It's an evening of culture, music, and community you won't want to miss. For details, contact: 97129 62662.",
    image: getImage('navratri'),
    colorAccent: 'hsl(280 80% 60%)',
  },
];

export const getEvents = () => eventsData;

export const getEventBySlug = (slug: string) =>
  eventsData.find(event => event.slug === slug);
