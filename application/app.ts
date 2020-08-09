import * as http from "http";
import * as bodyParser from 'body-parser';
import *as dotenv from 'dotenv';
import expressJWT = require('express-jwt');
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import * as session from "express-session";
import controllers from './src/controllers';

import log4js = require('log4js');
import util = require('util');
import hfc = require('fabric-client');
import cors = require('cors');
import path = require('path');

const bearerToken = require('express-bearer-token');
const logger = log4js.getLogger('Fabric API');
const port = 3000;
dotenv.config({path: '.local.env'});
const jwtSecret = process.env.JWT_SECRET;
const baseURL = process.env.BASE_URL;

const app = express();
app.locals.baseURL = baseURL;
app.options('*', cors());
app.use(cors());
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
// app.set('secret', jwtSecret);
// app.use(expressJWT({
//     secret: jwtSecret,
// }).unless({
//     path: [
//         '/test',
//     ]
// }));
// app.use(bearerToken());
// app.use((req:any, res: any, next) => {
//     if(req.originalUrl.indexOf('/test') >= 0) {
//         return next();
//     }
// });
app.set('title', 'Hyperledger Fabric Intergration API');


// to serve static conrtent
app.use('*/css',express.static('public/css'));
app.use('*/fonts',express.static('public/fonts'));
app.use('*/js',express.static('public/js'));
app.use('*/images',express.static('public/images'));

// to serve view template
app.engine('ejs', require('express-ejs-extend')); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
// Import all function modules
// const addToWallet = require('./1_addToWallet');
// const createStudent = require('./2_createStudent');
// const issueCertificate = require('./4_issueCertificate');
// const verifyCertificate = require('./5_verifyCertificate');


// app.post('/addToWallet', (req, res) => {
// 	addToWallet.execute(req.body.certificatePath, req.body.privateKeyPath)
// 			.then(() => {
// 				console.log('User credentials added to wallet');
// 				const result = {
// 					status: 'success',
// 					message: 'User credentials added to wallet'
// 				};
// 				res.json(result);
// 			})
// 			.catch((e) => {
// 				const result = {
// 					status: 'error',
// 					message: 'Failed',
// 					error: e
// 				};
// 				res.status(500).send(result);
// 			});
// });

// app.post('/newStudent', (req, res) => {
// 	createStudent.execute(req.body.studentId, req.body.name, req.body.email)
// 			.then((student) => {
// 				console.log('New student account created');
// 				const result = {
// 					status: 'success',
// 					message: 'New student account created',
// 					student: student
// 				};
// 				res.json(result);
// 			})
// 			.catch((e) => {
// 				const result = {
// 					status: 'error',
// 					message: 'Failed',
// 					error: e
// 				};
// 				res.status(500).send(result);
// 			});
// });

// app.post('/issueCertificate', (req, res) => {
// 	issueCertificate.execute(req.body.studentId, req.body.courseId, req.body.grade, req.body.hash)
// 			.then((certificate) => {
// 				console.log('New certificate issued to student');
// 				const result = {
// 					status: 'success',
// 					message: 'New certificate issued to student',
// 					certificate: certificate
// 				};
// 				res.json(result);
// 			})
// 			.catch((e) => {
// 				const result = {
// 					status: 'error',
// 					message: 'Failed',
// 					error: e
// 				};
// 				res.status(500).send(result);
// 			});
// });

// app.post('/verifyCertificate', (req, res) => {
// 	verifyCertificate.execute(req.body.studentId, req.body.courseId, req.body.hash)
// 			.then((verifyResult) => {
// 				console.log('Verification result available');
// 				const result = {
// 					status: 'success',
// 					message: 'Verification result available',
// 					verifyResult: verifyResult
// 				};
// 				res.json(result);
// 			})
// 			.catch((e) => {
// 				const result = {
// 					status: 'error',
// 					message: 'Failed',
// 					error: e
// 				};
// 				res.status(500).send(result);
// 			});
// });

controllers(app);

const server = http.createServer(app);
server.listen(port, () => {
    logger.debug(`app is running on port ${port}`);
});
server.timeout = 24000;
