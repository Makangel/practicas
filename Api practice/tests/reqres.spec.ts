import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
const request = require('supertest');
const reqres = require('../test-data/reqres/reqres.json');

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
                //schema
            })
    });

    test('GET - list a single user', async ({ page }) => {
        request(baseurl)
            .get('/api/users/2')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                //schema
            })
    });

    test('GET - user not found', async ({ page }) => {
        request(baseurl)
            .get('/api/users/23')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(404);
                //schema
            })
    });

    test('GET - list resources', async ({ page }) => {
        request(baseurl)
            .get('/api/unknown')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                //schema
            })
    });

    test('GET - list a single resource', async ({ page }) => {
        request(baseurl)
            .get('/api/unknown/2')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                //schema
            })
    });

    test('GET - resource not found', async ({ page }) => {
        request(baseurl)
            .get('/api/unknown/23')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(404);
                //schema
            })
    });

    test('GET - delayed response', async ({ page }) => {
        request(baseurl)
            .get('/api/users?delay=3')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(200);
                //schema
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
                //schema
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
                //schema
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
                //schema
            })
    });

    test('DELETE - delete user', async ({ page }) => {
        request(baseurl)
            .delete('/api/users/2')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(204);
                //schema
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
                //schema
                userId = res.body.id;
            });

    });

    test('POST - unsuccessful register user', async ({ page }) => {
        request(baseurl)
            .post('/api/users')
            .send({email: reqres.registerUser.email})
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(400);
                //schema
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
                //schema
                token = res.body.token;
            });

    });

    test('POST - unsuccessful login user', async ({ page }) => {
        request(baseurl)
            .post('/api/login')
            .send({email: reqres.registerUser.email})
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).toBe(400);
                //schema
            });

    });

});

