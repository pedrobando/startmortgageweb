import 'server-only'
import type { Payload } from 'payload'

const TARGETS = ['Planning Session', 'Contact'] as const

export async function seedForms(payload: Payload, report: any) {
  const existing = await payload.find({
    collection: 'forms',
    where: { title: { in: TARGETS as unknown as string[] } },
    limit: TARGETS.length,
  })
  const have = new Set(existing.docs.map((d: any) => d.title))
  const to = process.env.RESEND_NOTIFICATION_TO || 'hello@startmortgage.com'

  if (!have.has('Planning Session')) {
    await payload.create({
      collection: 'forms',
      data: {
        title: 'Planning Session',
        submitButtonLabel: 'Book my session',
        confirmationType: 'message',
        confirmationMessage: lexicalParagraph(
          "Thanks! We'll reach out within 24 hours to schedule your planning session.",
        ),
        fields: [
          { blockType: 'text', name: 'name', label: 'Name', required: true, width: 100 },
          { blockType: 'email', name: 'email', label: 'Email', required: true, width: 100 },
          { blockType: 'text', name: 'phone', label: 'Phone', required: false, width: 100 },
          {
            blockType: 'select',
            name: 'language',
            label: 'Preferred language',
            required: false,
            width: 100,
            options: [
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Español' },
            ],
          },
          {
            blockType: 'textarea',
            name: 'goals',
            label: 'What are you hoping to accomplish?',
            required: false,
            width: 100,
          },
        ],
        emails: [
          {
            emailTo: to,
            subject: 'New Planning Session request',
            message: lexicalParagraph('A new lead has booked a planning session.'),
          },
        ],
      } as any,
    })
    report.created.push({ collection: 'forms', title: 'Planning Session' })
  }

  if (!have.has('Contact')) {
    await payload.create({
      collection: 'forms',
      data: {
        title: 'Contact',
        submitButtonLabel: 'Send message',
        confirmationType: 'message',
        confirmationMessage: lexicalParagraph('Thanks for reaching out!'),
        fields: [
          { blockType: 'text', name: 'name', label: 'Name', required: true, width: 100 },
          { blockType: 'email', name: 'email', label: 'Email', required: true, width: 100 },
          { blockType: 'textarea', name: 'message', label: 'Message', required: true, width: 100 },
        ],
        emails: [
          {
            emailTo: to,
            subject: 'New contact message',
            message: lexicalParagraph('A new contact form was submitted.'),
          },
        ],
      } as any,
    })
    report.created.push({ collection: 'forms', title: 'Contact' })
  }
}

function lexicalParagraph(text: string) {
  return {
    root: {
      type: 'root',
      children: [{
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        children: [{
          type: 'text',
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text,
          version: 1,
        }],
      }],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
