const app = require('./index');
const { User, seed } = require('./db');
const request = require('supertest');

describe('Endpoints', () => {
    const testUserData = { username: 'bobbysmiles', password: 'youllneverguess' };
    let registerResponse;
    let loginResponse;
    
    beforeAll(async () => {
        await seed();
        registerResponse = await request(app)
            .post('/register')
            .send(testUserData)
            .catch(err => console.error(err));
        loginResponse = await request(app)
            .post('/login')
            .send(testUserData)
            .catch(err => console.error(err));
    });

    describe('GET /', () => {
        it('should return html', async () => {
            const registerResponse = await request(app).get('/');
            expect(registerResponse.status).toBe(200);
            expect(registerResponse.text).toBe('<h1>Welcome to Loginopolis!</h1><p>Log in via POST /login or register via POST /register</p>');
        });
    });

    describe('GET /users', () => {
        it('should return a list of all registered users', async () => {
            const getAllUsersResponse = await request(app).get('/users');
            expect(getAllUsersResponse.status).toBe(200);
            expect(getAllUsersResponse._body.length).toBe(5);
            expect(getAllUsersResponse._body.sort()).toEqual(['brett', 'antonette', 'karianne', 'buster', 'bobbysmiles'].sort());
        })
    })

    describe('POST /register', () => {
        it('should send back success with username', async () => {
            expect(registerResponse.status).toBe(200);
            expect(registerResponse.text).toBe('successfully created user bobbysmiles');
        });
        it('should create user with username', async () => {
            const foundUser = await User.findOne({ where: { username: 'bobbysmiles' } });
            expect(foundUser).toBeTruthy();
            expect(foundUser.username).toBe('bobbysmiles');
        });
        it('should hash password', async () => {
            const foundUser = await User.findOne({ where: { username: 'bobbysmiles' } });
            expect(foundUser).toBeTruthy();
            expect(foundUser.password).not.toBe(testUserData.password);
            expect(foundUser.password).toEqual(expect.stringMatching(/^\$2[ayb]\$.{56}$/));
        });
    });

    describe('POST /login', () => {
        it('should send back success with username', async () => {
            expect(loginResponse.status).toBe(200);
            expect(loginResponse.text).toBe('successfully logged in user bobbysmiles');
        });
        it('if password incorrect, should send back 401 unauthorized, with message', async () => {
            const incorrectLoginResponse = await request(app)
                .post('/login')
                .send({
                    username: 'bobbysmiles',
                    password: 'notright'
                })
                .catch(err => console.error(err));
            expect(incorrectLoginResponse.status).toBe(401);
            expect(incorrectLoginResponse.text).toBe('incorrect username or password');
        });
    });
});
