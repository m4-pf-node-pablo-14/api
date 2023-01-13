import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedUserRequest } from "../../mocks";

describe("Tests routes /users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Must be able to create a user", async () => {
    const response = await request(app).post(`/users`).send(mockedUserRequest) ;

    expect(response.status).toBe(201);

  });
});
