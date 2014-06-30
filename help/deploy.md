---
layout: help
title: Deploy
---

As for now, ssh-driven deploy mechanism is supported. Each project must have an associated ssh key installed on the server where you plan to deploy.

    curl -s https://ci.vexor.io/api/projects/1/key.txt \
      >> ~/.ssh/authorized_keys

When the build is run, ssh-agent is being started adding a private key. The deploy tool you use should be configured to use agent forwarding.

Capistrano

    set :ssh_options, { forward_agent: true }

Mina

    set :forward_agent, true


you should add deploy command explicitly in the configuration:

    deploy:
      shell: "cap staging deploy"

Or select any branches you want to deploy.

    deploy:
      shell: "cap staging deploy"
      branch:
        - staging

Deploy performs only after all tasks successfully finished in matrix. E.g. if you have a configuration:

    rvm:
      - 2.0
      - 2.1

    deploy:
      shell: cap staging deploy

first builds will successfuly finish working for ruby 2.0 and 2.1,
after that deploy will start as a separate task
