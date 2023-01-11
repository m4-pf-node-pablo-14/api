import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedLoginRequest, mockedUserRequest, mockedUserRequestTwo } from "../../mocks";

describe("/follow", () => {
  let connection: DataSource;

  const object = {
    createUserTwo: undefined,
    authorization: undefined,
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUserRequest);
    const createUserTwo = await request(app).post("/users").send(mockedUserRequestTwo);
    const authorization = await request(app).post("/login").send(mockedLoginRequest);

    object.createUserTwo = createUserTwo;
    object.authorization = authorization;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to follow the user", async () => {
    const response = await request(app)
      .post(`/follow/${object.createUserTwo.body.id}`)
      .set("Authorization", `Bearer ${object.authorization.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(201);
  });

  test("It must be possible to unfollow the user", async () => {
    const response = await request(app)
      .delete(`/follow/${object.createUserTwo.body.id}`)
      .set("Authorization", `Bearer ${object.authorization.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });
});
