#!/bin/bash
heroku login
git init
heroku git:remote -a my-fridge-backend
git add .
git commit -am "deployment from local"
git subtree push --prefix my_fridge_backend heroku master