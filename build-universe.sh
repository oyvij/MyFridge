#!/bin/bash

rm -rf ./my_fridge_backend/src/public

# Step 1: Build Flutter web app
(cd ./my_fridge_flutter && flutter build web)

# Step 2: Copy build folder to backend directory
cp -R ./my_fridge_flutter/build ./my_fridge_backend/src/public
