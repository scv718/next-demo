'use client';

import { useActionState } from 'react';

import { contact } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(contact, {});

  return (
    <Card className='bg-card border-border'>
      <CardContent className='p-8'>
        <form action={formAction} className='space-y-6'>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='fullName'>Full Name</Label>
              <Input id='fullName' name={'fullName'} placeholder='Enter your full name' />
              {state?.valid?.fullName && <p className='text-red-500 error-text'>{state?.valid?.fullName}</p>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phoneNumber'>Phone Number</Label>
              <Input id='phoneNumber' name={'phoneNumber'} type='text' placeholder='Enter your Phone Number' />
              {state?.valid?.phoneNumber && <p className='text-red-500 error-text'>{state?.valid?.phoneNumber}</p>}
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email Address</Label>
            <Input id='email' type='email' name={'email'} placeholder='Enter your email' />
            {state?.valid?.email && <p className='text-red-500 error-text'>{state?.valid?.email}</p>}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='subject'>Subject</Label>
            <Input id='subject' name={'subject'} placeholder='Enter the subject' />
            {state?.valid?.subject && <p className='text-red-500 error-text'>{state?.valid?.subject}</p>}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='message'>Your Message</Label>
            <Textarea id='message' name={'message'} placeholder='Tell us about your project...' rows={6} />
            {state?.valid?.message && <p className='text-red-500 error-text'>{state?.valid?.message}</p>}
          </div>
          <Button className='w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3'>
            {isPending ? 'Sending...' : 'Send Message'}
          </Button>
          {state?.error && <p className='text-red-500 error-text'>{state?.error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
