import request from 'supertest'
import app from "../../../src/app";
import AppDataSource from "../../../src/data-source";
import { DataSource } from "typeorm"
import { mockedLoginRequest } from "../../mocks";

describe('test routes /login', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(res => {
        connection = res
      })
      .catch(err => {
        console.error('Error during Data Source initialization', err)
      })
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test('Must be able to login', async () => {
    const response = await request(app).post('/login').send(mockedLoginRequest)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  test('Should not be able to login with the user with incorrect password or email', async () => {
    const response = await request(app).post('/login').send(mockedLoginRequest)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message')
  })

  test('Should not be able to login with the user with date in deleteAt', async () => {
    const response = await request(app).post('/login').send(mockedLoginRequest)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
  })
})