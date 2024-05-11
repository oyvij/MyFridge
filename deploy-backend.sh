#!/bin/bash
cd my_fridge_flutter && flutter build web --release
cd ../
cp -r build/web my_fridge_backend/build
heroku git:remote -a my-fridge-backend
git add .
git commit -am "deployment from local"
git subtree push --prefix my_fridge_backend heroku master