import { createQuery } from '~/helpers/queryHelper'
const _findIndex = (arr = [], key, value) => {
  return arr.findIndex((item) => item[key] === value)
}

export const state = () => ({
  albums: [],
  photos: [],
})
export const getters = {
  getAlbums: (state) => {
    return state.albums
  },
  getUnsorted: (state) => {
    return state.photos.filter((item) => !item.albumId)
  },
  getPhotos: (state) => state.photos,
  getAlbumPhoto: (state) => (albumId) =>
    state.photos.filter((photo) => photo.albumId === albumId),
}
export const actions = {
  saveAlbums({ commit }, payload) {
    commit('saveAlbums', payload)
  },
  async getPhotos({ commit }) {
    console.log('called')
    await this.$photos.get('/photos', createQuery(40)).then((result) => {
      commit('savePhotos', result.data)
      return result.data
    })
  },
  updatePhotos({ commit }, payload) {
    commit('savePhotos', payload)
  },
  movePhoto({ commit }, payload) {
    commit('movePhoto', payload)
    commit('updatePhotosInAlbums', payload)
  },
  async getAlbums({ commit }) {
    return await this.$photos.get('/albums', createQuery(5)).then((result) => {
      commit('saveAlbums', result.data)
      return result.data
    })
  },
  sortPhotoInAlbum({ commit }, payload) {
    commit('sortPhotoInAlbum', payload)
  },
}
export const mutations = {
  addAlbum({ albums }, payload) {},
  saveAlbums(state, payload) {
    const parsedAlbums = payload.map((item) => ({
      ...item,
      isAlbum: true,
      type: 'is-album',
      photos: [],
    }))
    state.albums = parsedAlbums
  },
  sortAlbums(state, payload) {
    state.albums = payload
  },
  sortPhotoInAlbum(state, { albumId, oldIndex, newIndex }) {
    const currentAlbumIndex = _findIndex(state.albums, 'id', parseInt(albumId))

    if (currentAlbumIndex === -1) return
    const albumToChange = state.albums[currentAlbumIndex]
    let albumPhotos = albumToChange.photos
    albumPhotos = albumPhotos.splice(
      newIndex,
      0,
      albumPhotos.splice(oldIndex, 1)[0]
    )
    state.albums = state.albums.splice(currentAlbumIndex, 1, {
      ...albumToChange,
      photos: albumPhotos,
    })
  },
  updatePhotosInAlbums(
    state,
    { prevAlbumId = null, newAlbumId = null, photoId }
  ) {
    if (prevAlbumId) {
      const prevAlbumIndex = _findIndex(
        state.albums,
        'id',
        parseInt(prevAlbumId)
      )
      const prevAlbum = state.albums[prevAlbumIndex]
      state.albums[prevAlbumIndex].photos = prevAlbum.photos.filter(
        (item) => item.id !== parseInt(photoId)
      )
    }
    if (newAlbumId) {
      const newAlbumIndex = _findIndex(state.albums, 'id', parseInt(newAlbumId))
      if (newAlbumIndex === -1) return
      //

      const photo = state.photos.find((item) => item.id === parseInt(photoId))
      state.albums[newAlbumIndex].photos.push(photo)
    }
  },
  savePhotos(state, data) {
    data = data.map((item) => ({ ...item, albumId: null }))
    state.photos = data
  },
  sortPhoto(state, payload) {
    state.photos = payload
  },

  movePhoto(state, { prevAlbumId = null, newAlbumId = null, photoId }) {
    const currentPhotoIndex = _findIndex(state.photos, 'id', parseInt(photoId))

    if (currentPhotoIndex === -1) {
      return
    }
    let currentPhoto = state.photos[currentPhotoIndex]

    currentPhoto = { ...currentPhoto, albumId: parseInt(newAlbumId) || null }

    state.photos.splice(currentPhotoIndex, 1, currentPhoto)
  },
  removeAlbum(state, id) {
    state.albums = state.filter((item) => item.id !== id)
  },
}
