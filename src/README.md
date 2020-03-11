# Hospital check-in system

## Getting Started

### Prerequisites

What you need to install

```
node.js
```

### Installing dependencies

```
$ npm i
```

To run the server

```
$ npm run start
```

### Testing

To run all tests

```
$ npm run test
```

## APIs

Server runs on http://localhost:3000/

### Patients APIs

### Get all patients

```
GET /
```

### Get one patient

query: (firstName: required, string), (lastName: required, string) 

```
GET /patient
```

### Add patient

body: (firstName: required, string), (lastName: required, string), 
(birthday: required, string, yyyy-mm-dd)

```
POST /
```

### Update patient

body: (firstName: optional, string), (lastName: optional, string) >>> at least one is has to exist
(id: required, string, uuid/v1)

```
PATCH /
```

### Delete patient

body: (id: required, string, uuid/v1)

```
DELETE /
```