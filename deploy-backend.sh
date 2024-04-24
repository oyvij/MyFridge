#!/bin/bash
heroku git:remote -a my-fridge-backend
git add .
git commit -am "deployment from local"
git fetch && git rebase
git push
git subtree push --prefix my_fridge_backend heroku master