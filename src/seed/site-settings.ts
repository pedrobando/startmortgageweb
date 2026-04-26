import 'server-only'
import type { Payload } from 'payload'

/**
 * Site-settings seeding is idempotent: we read the current values and only
 * fill in any unset top-level groups with the canonical defaults from the
 * spec (which match homepage.md, NOT the stale index.html JSON-LD).
 */
export async function seedSiteSettings(payload: Payload, report: any) {
  const current = (await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)) as any
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      brand: {
        accentColor: current?.brand?.accentColor || '#83C340',
      },
      toggles: {
        showMarquee: current?.toggles?.showMarquee ?? true,
        showStickyBar: current?.toggles?.showStickyBar ?? true,
        darkOffer: current?.toggles?.darkOffer ?? false,
      },
      business: {
        phone: current?.business?.phone || '(689) 210-3448',
        phoneE164: current?.business?.phoneE164 || '+16892103448',
        email: current?.business?.email || 'hello@startmortgage.com',
        address: {
          street: current?.business?.address?.street || '112 N Clyde Ave',
          city: current?.business?.address?.city || 'Kissimmee',
          region: current?.business?.address?.region || 'FL',
          postalCode: current?.business?.address?.postalCode || '34741',
          country: current?.business?.address?.country || 'US',
          lat: current?.business?.address?.lat ?? 28.2919,
          lng: current?.business?.address?.lng ?? -81.4076,
        },
        nmls: {
          broker: current?.business?.nmls?.broker || '2821608',
          parent: current?.business?.nmls?.parent || '2718409',
          founder: current?.business?.nmls?.founder || '1631454',
        },
        founderBio: {
          name: current?.business?.founderBio?.name || 'Jexayra Rivera',
          jobTitle: current?.business?.founderBio?.jobTitle || 'Mortgage Broker, Founder',
          bio: current?.business?.founderBio?.bio,
        },
        rating: {
          value: current?.business?.rating?.value ?? 4.9,
          count: current?.business?.rating?.count ?? 127,
        },
      },
      forms: {
        notificationEmail: current?.forms?.notificationEmail || 'hello@startmortgage.com',
      },
    } as any,
  })
  report.created.push({ global: 'site-settings' })
}
