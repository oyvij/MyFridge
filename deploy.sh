#!/bin/bash
heroku buildpacks:clear
heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack
heroku buildpacks:add heroku/nodejs
heroku config:set PROJECT_PATH=my_fridge_backend
heroku git:remote -a my-fridge-backend
git add .
git commit -am "deployment from local"
git push heroku master --force