const mockJsonResponse = (data: any) => {
  return {
    json: () => Promise.resolve(data),
    headers: new Headers(),
    ok: true,
    redirected: false,
    status: 200,
    statusText: "OK",
    type: "default",
    url: "http://mock.url",
    clone: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
    arrayBuffer: jest.fn(),
    body: jest.fn(),
    bodyUsed: false,
  };
};

const setupFetchMock = () => {
  global.fetch = jest.fn().mockImplementation((url) => {
    switch (url) {
      case "/static/entities.json":
        return mockJsonResponse([
          { id: 1, name: "test1" },
          { id: 2, name: "test2" },
        ]);
      case "/static/coords.json":
        return mockJsonResponse([
          { id: 1, x: 0, y: 100 },
          { id: 2, x: 50, y: 150 },
        ]);
      default:
        throw new Error(`Unhandled request: ${url}`);
    }
  });
};

export { setupFetchMock };
