export type PlaceholderCategory =
  | 'wedding'
  | 'birthday'
  | 'corporate'
  | 'engagement'
  | 'festive'
  | 'graduation'
  | 'anniversary'
  | 'housewarming'
  | 'reunion'
  | 'other'

interface CategoryPlaceholders {
  cover: string
  gallery: string[]
}

export const PLACEHOLDER_IMAGES: Record<PlaceholderCategory, CategoryPlaceholders> = {
  wedding: {
    cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
      'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=600&q=80',
      'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
    ],
  },
  birthday: {
    cover: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80',
      'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=600&q=80',
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80',
      'https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?w=600&q=80',
      'https://loremflickr.com/600/400/birthday,party?lock=7',
    ],
  },
  corporate: {
    cover: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
      'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&q=80',
    ],
  },
  engagement: {
    cover: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&q=80',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80',
      'https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=600&q=80',
      'https://loremflickr.com/600/400/engagement,couple?lock=1',
      'https://loremflickr.com/600/400/engagement,couple?lock=2',
      'https://loremflickr.com/600/400/engagement,ring?lock=3',
    ],
  },
  festive: {
    cover: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80',
      'https://loremflickr.com/600/400/festival,lights?lock=4',
      'https://loremflickr.com/600/400/festival,lantern?lock=5',
    ],
  },
  graduation: {
    cover: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80',
      'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80',
      'https://loremflickr.com/600/400/graduation,ceremony?lock=6',
      'https://loremflickr.com/600/400/graduation,diploma?lock=7',
    ],
  },
  anniversary: {
    cover: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80',
      'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
      'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=600&q=80',
      'https://loremflickr.com/600/400/anniversary,couple?lock=8',
      'https://loremflickr.com/600/400/anniversary,romantic?lock=9',
    ],
  },
  housewarming: {
    cover: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?w=600&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&q=80',
    ],
  },
  reunion: {
    cover: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
      'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=600&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80',
      'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=600&q=80',
      'https://loremflickr.com/600/400/friends,gathering?lock=10',
    ],
  },
  other: {
    cover: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
      'https://loremflickr.com/600/400/celebration,party?lock=11',
      'https://loremflickr.com/600/400/celebration,event?lock=12',
      'https://loremflickr.com/600/400/event,confetti?lock=13',
    ],
  },
}

// Per-template cover images for festive — each sub-theme gets its own image.
export const FESTIVE_COVER_BY_TEMPLATE: Record<string, string> = {
  CrescentTemplate:      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80', // mosque / Eid night
  GoldenPrayerTemplate:  'https://images.unsplash.com/photo-1590422749897-47036da0b0ff?w=800&q=80', // mosque golden light
  IftarTableTemplate:    'https://loremflickr.com/800/600/iftar,ramadan?lock=14',                   // iftar food spread
  DiyasTemplate:         'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80', // Diwali diyas
  FloralMandapTemplate:  'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80', // floral mandap / marigolds
  LanternTemplate:       'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80', // hanging lanterns
  FireworksNightTemplate:'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80', // fireworks night sky
  MidnightGalaTemplate:  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', // New Year gala / countdown
  MidnightGlamTemplate:  'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=800&q=80',   // glam sparkle NYE
  FestiveNightTemplate:  'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80', // festive street lights
  GeometricTemplate:     'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', // geometric / abstract
}
