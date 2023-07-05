import mongoose from 'mongoose';
import Logger from '../core/Logger';
import { db } from '../config';

// Collections
function populateAPiKeys() {
    mongoose.connection.createCollection('api_keys');
    mongoose.connection.collection('api_keys').insertOne({
        metadata: 'To be used by the eatryte developer',
        key: db.apikey,
        permissions: ['GENERAL'],
        version: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

function poputaleCountries() {
    mongoose.connection.createCollection('countries');
    mongoose.connection.collection('countries').insertMany([
        {
          name: 'Uganda',
          code: 'UG',
          dialCode: '+256',
          currency: 'Ugandan Shilling',
          currencySymbol: 'USh',
          vatPercentageRate: 18,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kenya',
          code: 'KE',
          dialCode: '+254',
          currency: 'Kenyan Shilling',
          currencySymbol: 'KSh',
          vatPercentageRate: 16,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Rwanda',
          code: 'RW',
          dialCode: '+250',
          currency: 'Rwandan Franc',
          currencySymbol: 'RWF',
          vatPercentageRate: 18,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
}


function populateRoles() {
    mongoose.connection.createCollection('roles');
    mongoose.connection.collection('roles').insertMany([
        {
          code: 'user',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'admin',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'merchant',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'delivery',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'support',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'orderManager',
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ]);
}

function populateBusinessTypes() {
  mongoose.connection.createCollection('businessTypes');
  mongoose.connection.collection('businessTypes').insertMany([
    {
      name: 'sole proprietorship',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'partnership',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'corporation',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'cooperative',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'limited liability company',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'non-profit organization',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'others',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}


// Funtion to Initialize Collections in DB
export const initCollection = (collName: string) => {
  switch(collName) {
    case 'api_keys':
      populateAPiKeys();
      break;
    case 'roles':
      populateRoles();
      break;
    case 'businessTypes':
      populateBusinessTypes();
      break;
    case 'countries':
      poputaleCountries();
      break;
    default:
      Logger.error('Collection not found');
  }
}

