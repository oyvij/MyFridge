#!/bin/bash
heroku git:remote -a my-fridge-backend
git add .
git commit -am "deployment from local"
git push heroku master