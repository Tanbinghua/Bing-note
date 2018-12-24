import fetch from './fetch'

export function signUp (data) {
  return fetch({
    url: '/api/users/',
    method: 'POST',
    data
  })
}
