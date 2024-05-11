#!/bin/bash

# Step 1: Build Flutter web app
(cd ./my_fridge_flutter && flutter build web)

# Step 2: Copy build folder to backend directory
cp -R ./my_fridge_flutter/build/web ./my_fridge_backend/src/web

# Step 3: Start the express production server
(cd ./my_fridge_backend && npm start)
