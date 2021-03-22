import { random } from 'nanoid'

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

export function buildAgendaItem () {
  return {
    id: random(1)[0],
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null
  }
}

export function buildEmptyMeetup () {
  return {
    id: random(1)[0],
    title: '',
    description: '',
    imageId: null,
    date: new Date(),
    place: '',
    agenda: []
  }
}

export const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' }
]

export const getTalkLanguages = () => [
  { value: null, text: 'Не указано', id: random(1)[0] },
  { value: 'RU', text: 'RU', id: random(1)[0] },
  { value: 'EN', text: 'EN', id: random(1)[0] }
]
