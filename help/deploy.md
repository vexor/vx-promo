---
layout: help
title: Deploy
---

You can deploy your apps directly from CI.

The deploy is a separate task which runs after all other tasks
and only if other tasks completed successfully.
That means  you can easily use it with matrices.

The deploy via __ssh__ is fully supported.

* Each vexor.io project has a pair of ssh keys.
* Before runnning your tests, ssh-agent is started and the ssh key from current project is added to it.

In order to have access to the deploy servers from the box where the tests are run,
you need to copy the public ssh key from the project. Public ssh key can be found
in the project settings and you need to add it to `~/.ssh/authorized_keys` file,
for example using this shell command:

```
    curl -s https://ci.vexor.io/api/projects/<PROJECT_ID>/key.txt >> \
      ~/.ssh/authorized_keys
```

SSH comes preconfigured to use the ssh-agent and to not perform the key checking.

To describe the commands that should be used during the deploy, a `deploy`
configuration section is used. The example configuration which deploys
with capistrano:

    deploy:
      shell: cap staging deploy

You can also specify to run the deploy only for specific branches or have different,
per-branch deployment commands:


    deploy:
    - shell: cap staging deploy
      branch: master
    - shell: cap qa deploy
      branch:
      - feature/1
      - feature/2
