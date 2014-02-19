---
layout: post
title: How To Deploy Rails Applications Using Ansible And Mina
---

A lot of people face problems when they install a rails application server
from scratch. Despite the fact that solutions such as
[Heroku][heroku] or [Engine Yard][engine yard] are available, unfortunately,
for various reasons, it’s not always possible to use them.

If we reject «Do It Yourself» options, the  obvious solution will be:

* You  prepare the server using Puppet, Chef etc. Install the required
  packages, install and configure services required by the application, create
  users and so on.
* Describe tasks using Capistrano or Mina tools and initialize deployment.

Unfortunately meant solution has serious disadvantages:

* You essentially have same configuration in 2 different places, which makes it difficult to
  support and test. Provisioning and deployment tools need to know
  a lot of information about each other: under which user will run deploy, what
  passwords and certificates are used, what addresses and ports hanging
  services.
* There are many ways how to combine deploy and provision tasks such like:
  provision and deploy only using Puppet/Chef; integration Chef/Puppet into
  deploy tool and many more.

There is the best solution which, in my opinion, has a great advantage -
simplicity.

To solve the problem we will need 2 tools: [Ansible][ansible] and [Mina][mina].
Let’s examine them in more detail.

__Mina.__

This is deploy tool which uses a slightly different approach than Capistrano:
Mina immediately generates from config/deploy.rb one big bash script, which can
be placed to the server and executed as single command. In addition it can
simply generate script without execution. This is what you need exactly to
combine with Ansible.

__Ansible.__

This is provision tool. Actually, for the current moment, we use Puppet for our
company projects.  In general, I have took part in Puppet implementation in our
company and I can say that me and my colleagues are satisfied with results. But
when i found Ansible it has very interested me.

* It doesn’t need a central server. Task running goes from local machine.
  Perhaps, central server is useful thing, but in our current configuration, as
  we have several dozen servers, it’s overkill.
* You don’t need any special software on your server, you need just python
  which is included for almost all OS distributions.
* Ansible is very simple, nevertheless it has enough functionality. You can
  start working with it right after _brew install ansible_ and quick view
  [examples][ansible examples]. Generally Ansible its ideology reminds VIM:
  within  a could of simple solutions that allow you to do complex things.
* All configuration is described in YAML files, it is declarative and
  immediately integrated with the documentation.
* It allows you to perform ad hoc tasks on servers. If you need to do it with
  Puppet, you will need special service Mcollective.

We have highly positive impression after couple of test implementations of
ansible. I guess in our company, together with the planned update of Ubuntu
servers 12.04->14.04, will be simultaneous migration from Puppet to Ansible.

__Provision & Deploy.__

You can deploy with Ansible the right ambience and generate deployment config
template for Mina, then run it. Detailed steps look like this:

* Prepare application server, install and configure required packages.
* Install Mina
* Generate deploy.rb from template
* Pass deploy.rb to Mina and it will create _up_ file with deploy commands
* Run _up_ file, which deploys the application

As a result we have all settings in only one place - in Ansible. Ansible
executes all necessary moves. Mina just creates one deploy script. It’s very
simple and understandable to describe configuration in Ansible.

You can download and run the demo application to see how it works live:

    $ git clone https://github.com/dima-exe/demo-deploy-using-ansible-and-mina.git
    $ brew install ansible
    $ vagrant up

In this sample we’ll install postgres, nginx and will deploy rails application.
Application will be available at [http://localhost:8080](http://localhost:8080)

Files are used:

* [ansible/site.yml][site.yml] - variables
* [ansible/provision.yml][provision.yml] - provision configuration
* [ansible/deploy.yml][deploy.yml] - deploy configuration
* [ansible/templates][templates] - file templates


[ansible]: http://www.ansible.com/home
[mina]: http://nadarei.co/mina/
[heroku]: https://www.heroku.com/
[engine yard]: https://www.engineyard.com/
[ansible examples]: https://github.com/ansible/ansible-examples
[mcollective]: http://puppetlabs.com/mcollective
[demo]: https://github.com/dima-exe/demo-deploy-using-ansible-and-mina
[ci installer]: https://github.com/vexor/vx-install
[site.yml]: https://github.com/dima-exe/demo-deploy-using-ansible-and-mina/blob/master/ansible/site.yml
[provision.yml]: https://github.com/dima-exe/demo-deploy-using-ansible-and-mina/blob/master/ansible/provision.yml
[deploy.yml]: https://github.com/dima-exe/demo-deploy-using-ansible-and-mina/blob/master/ansible/deploy.yml
[templates]: https://github.com/dima-exe/demo-deploy-using-ansible-and-mina/tree/master/ansible/templates
