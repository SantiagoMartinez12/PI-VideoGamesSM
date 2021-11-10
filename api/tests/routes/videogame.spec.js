/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

describe('GenreGame Route GET', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame?.sync({ force: true })
    .then(() => Videogame?.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/genregame').expect(200)
    );
  });
});
