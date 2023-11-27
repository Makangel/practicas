import { test, expect } from '@playwright/test';
const request = require('supertest');
const assert = require('assert');
const booking = require('../test-data/dogBooker/booking.json');
const updatedBooking = require('../test-data/dogBooker/updateBooking.json');
const credentials = require('../test-data/dogBooker/login.json');
const baseurl = 'https://restful-booker.herokuapp.com';
let bookingId;
let token;


//DOG EXAMPLES
test('standard', async ({ page }) => {

  request('https://dog.ceo')
    .get('/api/breeds/image/random')
    .expect(200)
    .expect('Content-Type', 'application/json')
    //.expect(/{"message":".*","status":"success"}/)
    .end(function (err, res) {
      if (err) throw err;
      console.log(res.body);
    });

  request('https://dog.ceo')
    .get('/api/breeds/image/random')
    .expect(200)
    .expect(function (res) {
      assert(res.body.hasOwnProperty('status'));
      assert(res.body.hasOwnProperty('message'));
    })
    .end(function (err, res) {
      if (err) throw err;
      console.log(res.body);
    });

});

test('get random image', async ({ page }) => {

  request('https://dog.ceo')
    .get('/api/breed/hound/images/random')
    .expect('Content-Type', 'application/json')
    .expect({ "status": "success", "message": ".*" })
    .end(function (err, res) {
      if (err) throw err;
      console.log(res.body);
    });

});


//RESTFUL BOOKER

test.beforeAll('get Auth', async () => {
  request(baseurl)
    .post('/auth')
    .send(credentials)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end(function (err, res) {
      expect(res.statusCode).toBe(200);
      !expect(res.body.token).toBeNull;
      token = res.body.token;
      if (err) {
        throw err;
      }
    })
});

test('POST - create a booking', async ({ page }) => {

  request(baseurl)
    .post('/booking')
    .send(booking)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end(function (err, res) {
      expect(res.statusCode).toBe(200);
      !expect(res.body.bookingid).toBeNull;
      expect(res.body.booking.firstname).toBe(booking.firstname);
      expect(res.body.booking.lastname).toBe(booking.lastname);
      expect(res.body.booking.totalprice).toBe(booking.totalprice);
      expect(res.body.booking.depositpaid).toBe(booking.depositpaid);
      expect(res.body.bookingdates.checkin).toBe(booking.bookingdates.checkin);
      expect(res.body.bookingdates.checkout).toBe(booking.bookingdates.checkout);
      expect(res.body.additionalneeds).toBe(booking.additionalneeds);
      bookingId = res.body.bookingId;
      if (err) {
        throw err;
      }
    })
});

test('should get the booking given the bookingId', async ({ page }) => {
  request(baseurl)
    .get('/booking/' + bookingId)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end(function (err, res) {
      expect(res.statusCode).toBe(200);
      expect(res.body.booking.firstname).toBe(booking.firstname);
      expect(res.body.booking.lastname).toBe(booking.lastname);
      expect(res.body.booking.totalprice).toBe(booking.totalprice);
      expect(res.body.booking.depositpaid).toBe(booking.depositpaid);
      expect(res.body.bookingdates.checkin).toBe(booking.bookingdates.checkin);
      expect(res.body.bookingdates.checkout).toBe(booking.bookingdates.checkout);
      expect(res.body.additionalneeds).toBe(booking.additionalneeds);
    })
});

test('update the booking given the bookingId', async ({ page }) => {
  request(baseurl)
    .put('/booking/' + bookingId)
    .send(updatedBooking)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Cookie', 'token=' + token)
    .end(function (err, res) {
      expect(res.statusCode).toBe(200);
      expect(res.body.booking.firstname).toBe(updatedBooking.firstname);
      expect(res.body.booking.lastname).toBe(updatedBooking.lastname);
      expect(res.body.booking.totalprice).toBe(updatedBooking.totalprice);
      expect(res.body.booking.depositpaid).toBe(updatedBooking.depositpaid);
      expect(res.body.bookingdates.checkin).toBe(updatedBooking.bookingdates.checkin);
      expect(res.body.bookingdates.checkout).toBe(updatedBooking.bookingdates.checkout);
      expect(res.body.additionalneeds).toBe(updatedBooking.additionalneeds);

      if (err) {
        throw err;
      }
    })
});

test('partially update the booking given the bookingId', async ({ page }) => {
  let firstname = 'Miguel';
  let lastname = 'Rodriguez';

  request(baseurl)
    .patch('/booking/' + bookingId)
    .send({ firstname: firstname, lastname: lastname })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Cookie', 'token=' + token)
    .end(function (err, res) {
      expect(res.statusCode).toBe(200);
      expect(res.body.booking.firstname).toBe(firstname);
      expect(res.body.booking.lastname).toBe(lastname);
      expect(res.body.booking.totalprice).toBe(updatedBooking.totalprice);
      expect(res.body.booking.depositpaid).toBe(updatedBooking.depositpaid);
      expect(res.body.bookingdates.checkin).toBe(updatedBooking.bookingdates.checkin);
      expect(res.body.bookingdates.checkout).toBe(updatedBooking.bookingdates.checkout);
      expect(res.body.additionalneeds).toBe(updatedBooking.additionalneeds);

      if (err) {
        throw err;
      }
    })
});

test('delete booking given the bookingId', async ({ page }) => {
  request(baseurl)
    .delete('/booking/' + bookingId)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Cookie', 'token=' + token)
    .end(function (err, res) {
      expect(res.statusCode).toBe(201);
      if (err) {
        throw err;
      }
    })
});

test('get booking given the bookingId', async ({ page }) => {
  request(baseurl)
    .get('/booking/' + bookingId)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end(function (err, res) {
      expect(res.statusCode).toBe(404);
      if (err) {
        throw err;
      }
    })
})