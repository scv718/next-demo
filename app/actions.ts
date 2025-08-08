'use server';

import { contactSchema, flattenError } from '@/lib/schema';
import { sendContactMessage } from '@/lib/services/contactService';

export async function contact(prevState: FormState, formData: FormData): Promise<FormState> {
  const data = Object.fromEntries(formData);
  const result = contactSchema.safeParse(data);
  if (!result.success) {
    return {
      success: result.success,
      valid: flattenError(result.error)
    };
  }

  return await sendContactMessage(result.data);
}
