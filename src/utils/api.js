import fetch from './fetch'
import qs from 'qs'

export function signUp (data) {
  return fetch({
    url: '/api/signup',
    method: 'POST',
    data: qs.stringify(data),
  })
}

export function signIn (data) {
  return fetch({
    url: '/api/signin',
    method: 'POST',
    data: qs.stringify(data),
  })
}

export function getInfo () {
  return fetch({
    url: '/api/getInfo',
    method: 'GET',
  })
}

export function getSide() {
  return fetch({
    url: '/api/getSide',
    method: 'GET',
  })
}

export function setInfo(data) {
  return fetch({
    url: '/api/setInfo',
    method: 'POST',
    data: qs.stringify(data),
  })
}

export function newNote(data) {
  return fetch({
    url: '/api/new',
    method: 'POST',
    headers: {
      "Content-Type":'application/x-www-form-urlencoded; charset=UTF-8',
    },
    data: qs.stringify(data),
  })
}

export function editNote(data) {
  return fetch({
    url: '/api/edit',
    method: 'POST',
    headers: {
      "Content-Type":'application/x-www-form-urlencoded; charset=UTF-8',
    },
    data: qs.stringify(data),
  })
}

export function clearNote(data) {
  return fetch({
    url: '/api/clear',
    method: 'POST',
    data: qs.stringify(data),
  })
}
