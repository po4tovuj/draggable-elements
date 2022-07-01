// import axios from 'axios'
export default function ({ $axios }, inject) {
  // Create a custom axios instance

  const photos = $axios.create({})
  photos.setBaseURL('https://jsonplaceholder.typicode.com/')
  // Set baseURL to something different
  //   cinema.setBaseURL('https://movies-app1.p.rapidapi.com/api/')
  //   set Headers for the api

  // Inject to context as $api
  inject('photos', photos)
}
