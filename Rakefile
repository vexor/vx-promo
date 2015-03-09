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
  begin
    sh "git checkout master"
    sh "cp -r _site/ ."
    sh "git add --all ."
    sh "git commit -m 'Deploy #{Time.now}'"
    sh "git checkout develop"
    sh "git push origin master"
  end
end
