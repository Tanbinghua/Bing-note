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

export function test (data) {
  return fetch({
    url: '/api/test',
    method: 'GET',
    data: qs.stringify(data)
  })
}
