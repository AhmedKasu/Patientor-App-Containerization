#!/bin/bash

echo "Creating application user and db"

mongosh <<EOF
use the_database
db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
})
db.createCollection('patients')
db.patients.insert({
  id: 'd2773336-f723-11e9-8f0b-362b9e155667',
  name: 'John McClane',
  dateOfBirth: '1986-07-09',
  ssn: '090786-122X',
  gender: 'Male',
  occupation: 'New york city cop',
  entries: [],
})
db.patients.insert({
  id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
  name: 'Matti Luukkainen',
  dateOfBirth: '1971-04-09',
  ssn: '090471-8890',
  gender: 'Male',
  occupation: 'Digital evangelist',
  entries: [],
})
EOF
