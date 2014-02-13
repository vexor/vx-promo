---
layout: default
title: How to install
---

### Prerequisites

You will need 2 (better 3) Ubuntu 12.04 or 13.10 servers to host, respectively:

* Web application
* Worker
* Rabbitmq

Web and Rabbitmq may be hosted on the same machine.

Worker machine must have Linux kernel of at least v3.8, the higher the better. To check it run
_uname -r_ and upgrade with _sudo apt-get install linux-generic-lts-saucy_ if needed.

All installation goes automatically, so you'll need _sudo_ without a password (check with _sudo -u root id_).
If it asks for a password add _ALL=(ALL:ALL) NOPASSWD:ALL_ to /etc/sudoers for a an appointed user or a group.

### Before installation

Create [app][app] if you use Github:

* __Application name__ --- any
* __Homepage URL__ --- your server address
* __Authorization callback URL__ http[s]://your.server.address/auth/github/callback

If your app sits in the Gitlab just specify its address.

### Installation

Installation runs [ansible][ansible], so you have to have it on the machine from which you run the installation.

OSX

    brew install ansible

Ubuntu

    apt-add-repository ppa:rquillo/ansible
    sudo apt-get update
    sudo apt-get install ansible

Or, read [the official ansible guide][ansible-install].

Now clone the installer repo:

    git clone https://github.com/vexor/vx-install.git
    cd vx-install
    git checkout stable-0.9
    cp inventory/production.example inventory/production

Edit the configuration in _inventory/production_:

    [vexor-mq]
    # rabbitmq server address
    mq0.example.com

    [vexor-web]
    # web application address
    ci.example.com

    [vexor-worker]
    # server running the worker
    worker0.example.com

    [vexor:children]
    # don't touch this
    vexor-mq
    vexor-web
    vexor-worker

    [vexor:vars]

    # Here goes the config

    # SSH username
    ansible_ssh_user=ubuntu

    # Github credentials; remove these lines if you don't use Github
    github_key=<YOUR GITHUB KEY>
    github_secret=<YOUR GITHUB SECRET>

    # Allows only users of a certain Organization
    github_restriction=<YOUR ORGANIZATION NAME>

    # Gitlab servers, if any, divided by commas
    gitlab_url=http://demo.gitlab.com,gitlab.example.com

    # Web application server (used in web hooks)
    # vx_web_hostname=ci.example.com

    # Web application processes number,
    # defaults to the current number of CPUs
    # vx_web_num_workers=8

    # Worker threads number,
    # defaults to CPU number
    # vx_worker_num_workers=3

    # Here you can specify your own default docker image:
    # vx_worker_docker_image: "dmexe/vexor-precise-full"

Then, start:

    ./play production

Then, login to the workers server and manually install a docker image used for all work; it's 2G big
so the download may consume some time.

    docker pull dmexe/vexor-precise-full

Here, you've completed the quest!


### Email setup

Web application uses system sendmail so you have to have it configured. Or, use [ssmtp][ssmtp].

### What you will have on your servers

Web application

* Ruby in /opt/vexor/ruby
* App in /opt/vexor/web/current
* postgresql 9.1
* memcached

Worker

* Ruby in /opt/vexor/ruby
* App in /opt/vexor/worker/current
* docker

Rabbitmq

* rabbitmq & erlang


[app]: https://github.com/settings/applications
[ansible]: http://www.ansible.com/home
[ansible-install]: http://docs.ansible.com/intro_installation.html
[ssmtp]: http://mikebeach.org/2013/04/24/simple-outbound-email-configuration-for-ubuntu-server-12-04-using-ssmtp/
