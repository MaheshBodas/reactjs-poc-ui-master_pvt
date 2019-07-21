const mockAxios = jest.genMockFromModule('axios')
// this is key to fix the axios.create() undefined error
mockAxios.create = jest.fn(() => mockAxios)
export default mockAxios
// this is 'manual mocking' btw
// export default {
//   get: jest.fn(() => Promise.resolve({data: {}}),
//   post: jest.fn(() => Promise.resolve({data: {}})
// }

// // or if you wanna cover for the 'create' method too
// const mockAxios = {
//   get: jest.fn(() => Promise.resolve({data: {}}),
//   post: jest.fn(() => Promise.resolve({data: {}})
// }

// mockAxios.create = jest.fn(() => mockAxios)

// export default mockAxios