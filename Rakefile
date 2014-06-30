def jekyll(opts="", path="")
  sh "rm -rf _site"
  sh "bundle exec " + path + "jekyll " + opts
end

desc "Build site using Jekyll"
task :build do
  jekyll "build"
end

desc "Serve on Localhost with port 4000"
task :default do
  jekyll "serve --watch"
end

task :deploy => :build do
  sh "rsync -rtz --delete _site/ vexor.io:~/promo2/"
end
