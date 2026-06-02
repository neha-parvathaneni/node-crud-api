describe("db config module", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("connectDB sets pool when sql.connect resolves", async () => {
    const connectMock = jest.fn().mockResolvedValue({ tag: "pool" });

    jest.doMock("mssql", () => ({ connect: connectMock }));
    jest.doMock("dotenv", () => ({ config: jest.fn() }));

    const { connectDB, getPool } = require("./db");

    await connectDB();

    expect(connectMock).toHaveBeenCalledTimes(1);
    expect(getPool()).toEqual({ tag: "pool" });
  });

  it("getPool throws when connectDB not called", () => {
    jest.doMock("mssql", () => ({ connect: jest.fn() }));
    jest.doMock("dotenv", () => ({ config: jest.fn() }));

    const { getPool } = require("./db");

    expect(() => getPool()).toThrow("No DB connection");
  });
});
