'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const eventRegisterSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  mobile: z
    .string()
    .regex(/^\d{10}$/, { message: 'Mobile number must be 10 digits.' }),
  collegeId: z.string().min(1, { message: 'College ID is required.' }),
  year: z.string({ required_error: 'Please select your year of study.' }),
});

type EventRegisterFormProps = {
  eventName: string;
};

export function EventRegisterForm({ eventName }: EventRegisterFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const form = useForm<z.infer<typeof eventRegisterSchema>>({
    resolver: zodResolver(eventRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      collegeId: '',
      year: '',
    },
  });
  
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
        toast({
            title: "Authentication Required",
            description: "Please log in to register for events.",
            variant: "destructive",
        });
        router.push('/login');
    } else {
      const userData = JSON.parse(user);
      form.reset({
        email: userData.email,
        name: '',
        mobile: '',
        collegeId: '',
        year: '',
      });
      setIsAuthLoading(false);
    }
  }, [router, toast, form]);


  function onSubmit(values: z.infer<typeof eventRegisterSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Event Registration Data:', values);
      toast({
        title: 'Registration Successful!',
        description: `You have registered for ${eventName} 🎉`,
      });
      setIsLoading(false);
      router.push('/events');
    }, 1000);
  }

  if (isAuthLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} disabled/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                    <Input placeholder="9876543210" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="collegeId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>College ID</FormLabel>
                <FormControl>
                    <Input placeholder="C12345" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Study</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="first">First Year</SelectItem>
                  <SelectItem value="second">Second Year</SelectItem>
                  <SelectItem value="third">Third Year</SelectItem>
                  <SelectItem value="fourth">Fourth Year</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register Now
        </Button>
      </form>
    </Form>
  );
}
