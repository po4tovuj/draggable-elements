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
}
// error are handled in pages
export const actions = {
  //* <----- album actions -----> */
  addAlbum({ commit, dispatch }, payload) {
    commit('addAlbum', payload)
    // do nothing if no photos were added
    const photoIds = payload.photos.map((item) => item.id)
    if (photoIds.length) {
      dispatch('addPhotoToAlbum', {
        albumId: payload.id,
        photos: payload.photos,
      })
    }
  },
  addPhotoToAlbum({ commit }, payload) {
    commit('addPhotoToAlbum', payload)
  },
  changeAlbumName({ commit }, payload) {
    commit('changeAlbumName', payload)
  },
  async getAlbums({ commit }) {
    return await this.$photos.get('/albums', createQuery(5)).then((result) => {
      commit('saveAlbums', result.data)
      return result.data
    })
  },
  deleteAlbum({ commit }, id) {
    commit('deleteAlbum', id)
  },

  //* <----- photos actions -----> */

  sortPhotoInAlbum({ commit }, payload) {
    commit('sortPhotoInAlbum', payload)
  },

  async getPhotos({ commit }) {
    await this.$photos.get('/photos', createQuery(40)).then((result) => {
      commit('savePhotos', result.data)
      return result.data
    })
  },
  updatePhotos({ commit }, payload) {
    commit('savePhotos', payload)
  },
  movePhoto({ commit }, payload) {
    // lets separate update photoList and album
    commit('movePhoto', payload)
    commit('updatePhotoInAlbums', payload)
  },
}
export const mutations = {
  /*
    Because of draggable and to save order we should store data as Array (albums/photos)
    and for reactive update with saving order use splice method or map
  */

  addAlbum(state, album) {
    state.albums = [...state.albums, { ...album, photos: [] }]
  },
  // lets be sure that we have initial photo list
  saveAlbums(state, payload) {
    const parsedAlbums = payload.map((item) => ({
      ...item,
      photos: [],
    }))
    state.albums = parsedAlbums
  },

  changeAlbumName(state, { id, title = 'title' }) {
    const albumToChangeIndex = _findIndex(state.albums, 'id', parseInt(id))

    const albumToUpdate = state.albums[albumToChangeIndex]

    state.albums = state.albums.map((item) =>
      item.id !== id
        ? item
        : {
            ...albumToUpdate,
            title,
          }
    )
  },
  deleteAlbum(state, id) {
    state.albums = state.albums.filter((item) => item.id !== id)
    state.photos = state.photos.map((item) => {
      if (item.albumId !== id) return item
      item.albumId = null
      return item
    })
  },
  sortAlbums(state, payload) {
    state.albums = payload
  },
  // if photo was dragg inside album
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
  updatePhotoInAlbums(
    state,
    { prevAlbumId = null, newAlbumId = null, photoId }
  ) {
    // if we move photo between albums remove photo from prevAlbum
    // use parseInt as in some cases id's came as string but in store its number
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
    // if moved to an album from unsorted
    if (newAlbumId) {
      const newAlbumIndex = _findIndex(state.albums, 'id', parseInt(newAlbumId))
      if (newAlbumIndex === -1) return
      // update photo as well
      const photo = state.photos.find((item) => item.id === parseInt(photoId))
      state.albums[newAlbumIndex].photos.push(photo)
    }
  },
  savePhotos(state, data) {
    /* initial data is coming with some albumId inside,
    as it's not real data, lets clear this field
    */
    data = data.map((item) => ({ ...item, albumId: null }))
    state.photos = data
  },
  // update photoList with changed order
  sortPhoto(state, payload) {
    state.photos = payload
  },
  // on move photo update photoList
  movePhoto(state, { newAlbumId = null, photoId }) {
    const currentPhotoIndex = _findIndex(state.photos, 'id', parseInt(photoId))

    if (currentPhotoIndex === -1) {
      return
    }
    let currentPhoto = state.photos[currentPhotoIndex]

    currentPhoto = { ...currentPhoto, albumId: parseInt(newAlbumId) || null }

    state.photos.splice(currentPhotoIndex, 1, currentPhoto)
  },
  // adding photo to album through the modal and manual select
  addPhotoToAlbum(state, { albumId, photos }) {
    const albumToUpdateIndex = _findIndex(state.albums, 'id', parseInt(albumId))
    if (albumToUpdateIndex === -1) {
      return
    }
    const albumToUpdate = state.albums[albumToUpdateIndex]
    const updatedPhotos = state.photos.map((item) => {
      // update only items which should dbe updated in photos list
      const shouldBeUpdated = photos.includes(item.id)

      if (shouldBeUpdated) {
        item.albumId = albumId
        albumToUpdate.photos.push(item)
      }
      return item
    })
    state.photos = updatedPhotos
    // update albums as well
    state.albums = state.albums.map((item) =>
      item.id !== albumToUpdate.id ? item : albumToUpdate
    )
  },
  removeAlbum(state, id) {
    state.albums = state.filter((item) => item.id !== id)
  },
}
