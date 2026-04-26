import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { startBlocks } from '../../blocks/StartBlocks'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    locale: true,
    localizationKey: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'locale', 'localizationKey', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug', type: 'text', required: true, index: true,
      admin: { description: 'URL slug in this locale (no leading /). e.g., "como-funciona".' },
    },
    {
      name: 'locale', type: 'select', required: true,
      options: [
        { label: 'English', value: 'en' },
        { label: 'Español', value: 'es' },
      ],
      defaultValue: 'en',
      admin: { position: 'sidebar', description: 'The locale this document represents (one doc per locale).' },
    },
    {
      name: 'localizationKey', type: 'text', required: true, index: true,
      admin: { position: 'sidebar', description: 'Stable key shared across en/es versions (e.g., "how-it-works"). Defaults to slug on save.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: startBlocks,
              required: false,
              admin: { initCollapsed: true },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt', type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [
      populatePublishedAt,
      ({ data }) => {
        if (data && !data.localizationKey && data.slug) data.localizationKey = data.slug
        return data
      },
    ],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
