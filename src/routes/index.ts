import express from 'express';
import apikey from '../middleware/apikey';
import permission from '../helpers/permission';
import { Permission } from '../models/ApiKey';
import signup from './access/signup';
import login from './access/login';
import logout from './access/logout';
import token from './access/token';
import credential from './access/credential';
import profile from './profile';
import merchant from './merchant';
import country from './country';
import businesstype from './businesstype';

const router = express.Router();

/*---------------------------------------------------------*/
router.use(apikey);
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
router.use(permission(Permission.GENERAL));
/*---------------------------------------------------------*/
router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
router.use('/token', token);
router.use('/credential', credential);
router.use('/profile', profile);
router.use('/merchant', merchant);
router.use('/countries', country);
router.use('/business-types', businesstype);

export default router;
