export const EVENTS = {
  weather: [
    { id: 'storm', title: 'Fierce Storm', description: 'A violent storm rolls in.', consequences: 'Travel is slowed and visibility reduced.' }
  ],
  road: [
    { id: 'bandits', title: 'Ambush by Bandits', description: 'Bandits block the path.', consequences: 'Players must fight or bargain.' }
  ],
  intrigue: [
    { id: 'secretMeeting', title: 'Secret Meeting', description: 'Rumors of a clandestine meeting.', consequences: 'Opportunities for spying or alliances.' }
  ]
} as const;
export type EventCategory = keyof typeof EVENTS;
