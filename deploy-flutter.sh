
heroku git:remote -a my-fridge-flutter
git add .
git commit -am "deployment from local"
git subtree push --prefix my_fridge_flutter heroku main