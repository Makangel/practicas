import { test, expect } from '@playwright/test';
import exp from 'constants';
import { describe } from 'node:test';
const request = require('supertest');
const reqres = require('../test-data/reqres/reqres.json');
import { expect as expectChai } from 'chai';
const listUsersSchema = require('../test-data/reqres/schemas/listUsersSchema.json');
const listUserSchema = require('../test-data/reqres/schemas/listUserSchema.json');
const listResourcesSchema = require('../test-data/reqres/schemas/listResourcesSchema.json');
const listResourceSchema = require('../test-data/reqres/schemas/listResourceSchema.json');
const delayedResponseSchema = require('../test-data/reqres/schemas/delayedResponseSchema.json');
const createUserSchema = require('../test-data/reqres/schemas/createUserSchema.json');
const updateUserSchema = require('../test-data/reqres/schemas/updateUserSchema.json');
const registerLoginUserSchema = require('../test-data/reqres/schemas/registerLoginUserSchema.json');
const badRegisterLoginUserSchema = require('../test-data/reqres/schemas/badRegisterLoginUserSchema.json');


test.describe('reqres tests', () => {
    const baseurl = 'https://reqres.in';
    let userId;
    let token;

    test('GET - list users', async ({ page }) => {
        request(baseurl)
            .get('/api/users?page=2')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                expectChai(res).to.be.jsonSchema(listUsersSchema);
            })
    });

    test('GET - list a single user', async ({ page }) => {
        request(baseurl)
            .get('/api/users/2')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                expectChai(res).to.be.jsonSchema(listUserSchema);
            })
    });

    test('GET - user not found', async ({ page }) => {
        request(baseurl)
            .get('/api/users/23')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(404);
            })
    });

    test('GET - list resources', async ({ page }) => {
        request(baseurl)
            .get('/api/unknown')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                expectChai(res).to.be.jsonSchema(listResourcesSchema);
            })
    });

    test('GET - list a single resource', async ({ page }) => {
        request(baseurl)
            .get('/api/unknown/2')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                expectChai(res).to.be.jsonSchema(listResourceSchema);
            })
    });

    test('GET - resource not found', async ({ page }) => {
        request(baseurl)
            .get('/api/unknown/23')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(404);
            })
    });

    test('GET - delayed response', async ({ page }) => {
        request(baseurl)
            .get('/api/users?delay=3')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                expectChai(res).to.be.jsonSchema(delayedResponseSchema);
            })
    });

    test('POST - create user', async ({ page }) => {
        request(baseurl)
            .post('/api/users')
            .send(reqres.user)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                expect(res.body.name).toBe(reqres.user.name);
                expect(res.body.job).toBe(reqres.user.job);
                expectChai(res).to.be.jsonSchema(createUserSchema);
                userId = res.body.id;
            });

    });

    test('PUT - update user', async ({ page }) => {
        request(baseurl)
            .put('/api/users/2')
            .send(reqres.updatedUser)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                expect(res.body.name).toBe(reqres.updatedUser.name);
                expect(res.body.job).toBe(reqres.updatedUser.job);
                expectChai(res).to.be.jsonSchema(updateUserSchema);
            })
    });

    test('PATCH - update user', async ({ page }) => {
        request(baseurl)
            .patch('/api/users/2')
            .send({ name: reqres.updatedUser.name, job: reqres.updatedUser.job })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                expect(res.body.name).toBe(reqres.updatedUser.name);
                expect(res.body.job).toBe(reqres.updatedUser.job);
                expectChai(res).to.be.jsonSchema(updateUserSchema);
            })
    });

    test('DELETE - delete user', async ({ page }) => {
        request(baseurl)
            .delete('/api/users/2')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(204);
            })
    });

    test('POST - successful register user', async ({ page }) => {
        request(baseurl)
            .post('/api/register')
            .send(reqres.registerUser)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                expect(res.body.name).toBe(reqres.registerUser.name);
                expect(res.body.job).toBe(reqres.registerUser.job);
                expectChai(res).to.be.jsonSchema(registerLoginUserSchema);
                userId = res.body.id;
            });

    });

    test('POST - unsuccessful register user', async ({ page }) => {
        request(baseurl)
            .post('/api/users')
            .send({ email: reqres.registerUser.email })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(201);
                expectChai(res).to.be.jsonSchema(badRegisterLoginUserSchema);
            });

    });

    test('POST - successful login user', async ({ page }) => {
        request(baseurl)
            .post('/api/login')
            .send(reqres.registerUser)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                expectChai(res).to.be.jsonSchema(registerLoginUserSchema);
                token = res.body.token;
            });

    });

    test('POST - unsuccessful login user', async ({ page }) => {
        request(baseurl)
            .post('/api/login')
            .send({ email: reqres.registerUser.email })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(400);
                expectChai(res).to.be.jsonSchema(badRegisterLoginUserSchema);
            });

    });

});

