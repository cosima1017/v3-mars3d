import * as mars3d from 'mars3d'
export const imageLayer = new mars3d.layer.ImageLayer({
  url: 'http://192.168.10.131:8085/UEmap/yangzhousuidao/WGS84_TMS/',
  rectangle: {
    xmin: 119.115,
    xmax: 119.723,
    ymin: 32.1761,
    ymax: 32.6433
  },
  center: {
    lat: 32.5,
    lng: 119.5
  }
})
