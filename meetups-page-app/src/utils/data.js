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

export async function login (email, password) {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })
  }).then((res) => {
    return res.json()
  })
}

export async function register (email, fullname, password) {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, fullname, password })
  }).then((res) => res.json())
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
