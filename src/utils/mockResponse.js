function mockResponse() {
  const response = {
    end: jest.fn().mockImplementation(() => {
      return response;
    }),
    json: jest.fn().mockImplementation(() => {
      return response;
    }),
    location: jest.fn().mockImplementation(() => {
      return response;
    }),
    status: jest.fn().mockImplementation(() => {
      return response;
    }),
    send: jest.fn().mockImplementation(() => {
      return response;
    }),
  };

  return response;
}

module.exports = mockResponse;
