import Uri from './Uri'
import * as Cesium from 'mars3d-cesium'
//hackin Cesium.Resource.fetch
let rawFetch = Cesium.Resource.prototype.fetch
Cesium.Resource.prototype.fetch = function (options) {
  // let self = this
  let { url } = this
  // let {responseType} = options;

  let promise
  let uri = new Uri(url)

  //对+进行转义
  if (this.url.indexOf('+')) {
    this.url = this.url.replace(/\+/g, '%2B')
  }
  promise = rawFetch.bind(this)

  return promise(options, uri)
}

let rawPrimitiveAdd = Cesium.PrimitiveCollection.prototype.add
Cesium.PrimitiveCollection.prototype.add = function (primitive, index) {
  // let self = this
  let rawPrimitiveAdd1 = rawPrimitiveAdd.bind(this)
  if (primitive instanceof Cesium.ViewportQuad) {
    return
  }

  return rawPrimitiveAdd1(primitive, index)
}

export default {}
