const markers = [
  {
    longitude: 113.2644,
    latitude: 23.1291,
    spatialReference: { wkid: 4326 },
    name: '广州塔',
    description: '广州标志性建筑，旅游打卡地。',
    height: '600m',
    id: 1,
    icon: {
      url: 'map/markers/marker.svg',
      width: 40,
      height: 45
    }
  },
  {
    longitude: 114.0579,
    latitude: 22.5431,
    spatialReference: { wkid: 4326 },
    name: '深圳市民中心',
    description: '深圳的标志性建筑之一。',
    height: '150m',
    id: 2,
    icon: {
      url: 'map/markers/marker.svg',
      width: 40,
      height: 45
    }
  }
]

export default [
  {
    url: '/api/markers',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: markers,
        message: 'success'
      }
    }
  }
]
