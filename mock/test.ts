export default [
  {
    url: '/api/test',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          name: 'test'
        },
        message: 'success'
      }
    }
  }
]
