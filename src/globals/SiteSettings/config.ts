import type { GlobalConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: { description: 'Site-wide brand, business, and toggle settings.' },
  fields: [
    {
      name: 'brand', type: 'group', fields: [
        {
          name: 'accentColor', type: 'text', defaultValue: '#83C340',
          admin: { description: 'Hex like #83C340. Drives the --accent CSS variable.' },
        },
        { name: 'logoIconBlack', type: 'upload', relationTo: 'media' },
        { name: 'logoIconWhite', type: 'upload', relationTo: 'media' },
        { name: 'logoWordmarkBlack', type: 'upload', relationTo: 'media' },
        { name: 'logoWordmarkWhite', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'toggles', type: 'group', fields: [
        { name: 'showMarquee', type: 'checkbox', defaultValue: true },
        { name: 'showStickyBar', type: 'checkbox', defaultValue: true },
        {
          name: 'darkOffer', type: 'checkbox', defaultValue: false,
          admin: { description: 'Render the homepage offer block on a dark background.' },
        },
      ],
    },
    {
      name: 'business', type: 'group', fields: [
        { name: 'phone', type: 'text', defaultValue: '(689) 210-3448' },
        { name: 'phoneE164', type: 'text', defaultValue: '+16892103448' },
        { name: 'email', type: 'email', defaultValue: 'hello@startmortgage.com' },
        {
          name: 'address', type: 'group', fields: [
            { name: 'street', type: 'text', defaultValue: '112 N Clyde Ave' },
            { name: 'city', type: 'text', defaultValue: 'Kissimmee' },
            { name: 'region', type: 'text', defaultValue: 'FL' },
            { name: 'postalCode', type: 'text', defaultValue: '34741' },
            { name: 'country', type: 'text', defaultValue: 'US' },
            { name: 'lat', type: 'number', defaultValue: 28.2919 },
            { name: 'lng', type: 'number', defaultValue: -81.4076 },
          ],
        },
        {
          name: 'nmls', type: 'group', fields: [
            { name: 'broker', type: 'text', defaultValue: '2821608' },
            { name: 'parent', type: 'text', defaultValue: '2718409' },
            { name: 'founder', type: 'text', defaultValue: '1631454' },
          ],
        },
        {
          name: 'founderBio', type: 'group', fields: [
            { name: 'name', type: 'text', defaultValue: 'Jexayra Rivera' },
            { name: 'jobTitle', type: 'text', localized: true, defaultValue: 'Mortgage Broker, Founder' },
            { name: 'bio', type: 'richText', localized: true },
          ],
        },
        {
          name: 'rating', type: 'group', fields: [
            { name: 'value', type: 'number', defaultValue: 4.9 },
            { name: 'count', type: 'number', defaultValue: 127 },
          ],
        },
      ],
    },
    {
      name: 'forms', type: 'group', fields: [
        {
          name: 'notificationEmail', type: 'email', defaultValue: 'hello@startmortgage.com',
          admin: { description: 'Where new form submissions are emailed.' },
        },
      ],
    },
    {
      name: 'social', type: 'array', fields: [
        {
          name: 'platform', type: 'select',
          options: ['facebook', 'instagram', 'linkedin', 'tiktok', 'youtube'],
        },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
