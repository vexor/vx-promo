def jekyll(opts="", path="")
  sh "rm -rf _site"
  sh path + "jekyll " + opts
end

desc "Build site using Jekyll"
task :build do
  jekyll "build"
end

desc "Serve on Localhost with port 4000"
task :default do
  jekyll "serve --watch"
end

def rsync(domain)
  sh "rsync -rtz --delete _site/ scottwkyle@appden.com:~/#{domain}/"
end

task :deploy => :build do
  sh "rsync -rtz --delete _site/ vexor.io:~/promo/"
end
