export const API_URL = process.env.VUE_APP_API_URL

export async function fetchMeetups () {
  return fetch(`${API_URL}/meetups`).then(response => response.json())
}

export async function fetchMeetup (id) {
  return fetch(`/api/meetups/${id}`).then(res => res.json())
}

export function getMeetupCoverLink (meetup) {
  return `${API_URL}/images/${meetup.imageId}`
}

export const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое'
}

export const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm'
}
