---
layout: default
title: Databases And Services
---

### Postgresql

Version 9.3 with Contrib package are preinstalled and run automatically. Login: `postgres`, without the password

    psql -U postgres -c "create database test;"


### Mysql

Version 5.5 is preinstalled and run automatically. Login: `root`, without the password

    mysql -u root -e "create database test"

### Redis

Version 2.8.5 is preinstalled and run automatically

### Rabbitmq

Version 3.2.3 is preinstalled; to run, issue:

    services:
      - rabbitmq

### Elasticsearch

Version 0.90.10 is preinstalled; to run, issue:

    services:
      - elasticsearch

### PhantomJS

Version 1.9.7 is preinstalled
