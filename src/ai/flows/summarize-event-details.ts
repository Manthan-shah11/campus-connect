'use server';

/**
 * @fileOverview Summarizes event details, incorporating user-submitted content.
 *
 * - summarizeEventDetails - A function that summarizes event details.
 * - SummarizeEventDetailsInput - The input type for the summarizeEventDetails function.
 * - SummarizeEventDetailsOutput - The return type for the summarizeEventDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEventDetailsInputSchema = z.object({
  eventDetails: z.string().describe('Detailed description of the event.'),
  userContent: z
    .array(z.string())
    .optional()
    .describe('Array of user-submitted content related to the event.'),
});

export type SummarizeEventDetailsInput = z.infer<
  typeof SummarizeEventDetailsInputSchema
>;

const SummarizeEventDetailsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the event details.'),
});

export type SummarizeEventDetailsOutput = z.infer<
  typeof SummarizeEventDetailsOutputSchema
>;

export async function summarizeEventDetails(
  input: SummarizeEventDetailsInput
): Promise<SummarizeEventDetailsOutput> {
  return summarizeEventDetailsFlow(input);
}

const summarizeEventDetailsPrompt = ai.definePrompt({
  name: 'summarizeEventDetailsPrompt',
  input: {schema: SummarizeEventDetailsInputSchema},
  output: {schema: SummarizeEventDetailsOutputSchema},
  prompt: `You are an event summarization expert. Please provide a concise and informative summary of the event details, incorporating relevant user-submitted content if available.\n\nEvent Details: {{{eventDetails}}}\n\n{{#if userContent}}\nUser-Submitted Content:\n{{#each userContent}} - {{{this}}}\n{{/each}}\n{{else}}\nNo user-submitted content available.\n{{/if}}\n\nSummary:`,
});

const summarizeEventDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeEventDetailsFlow',
    inputSchema: SummarizeEventDetailsInputSchema,
    outputSchema: SummarizeEventDetailsOutputSchema,
  },
  async input => {
    const {output} = await summarizeEventDetailsPrompt(input);
    return output!;
  }
);
