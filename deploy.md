---
layout: default
title: Deploy
---

As for now, ssh-driven deploy mechanism is supported. Each project must have an associated ssh key installed on the server where you plan to deploy.

    curl -s https://ci.example.com/api/projects/1/key \
      >> ~/.ssh/authorized_keys

When the build is run, ssh-agent is being started adding a private key. The deploy tool you use should be configured to use agent forwarding.

Capistrano

    set :ssh_options, { forward_agent: true }

Mina

    set :forward_agent, true

you should add deploy command explicitly in the configuration:

    after_success:
      - if [ $CI_BRANCH = 'production' ] ; then bundle exec cap production deploy ; fi
