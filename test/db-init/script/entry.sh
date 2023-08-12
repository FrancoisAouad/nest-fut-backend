#!/bin/bash
# /*******************************************************************************
#  *
#  * Copyright (c) {2022-2023} Francois J. Aouad.
#  * All rights reserved. This program and the accompanying materials
#  * are made available under the terms of the GNU General Public License v3.0
#  * which accompanies this distribution, and is available at
#  * https://www.gnu.org/licenses/gpl-3.0.en.html
#  *
#  *******************************************************************************/

echo "##### Loading Collections to MongoDB #####"

# Array of collection files to import
file_location=(
  "/tmp/data/articles.json"
  "/tmp/data/fixtures.json"
)
collections=(
  "articles"
  "fixtures"
)

# MongoDB connection details
db_name="football-app"

# Loop through the collection files and import them
for ((i=0; i<${#collections[@]}; i++))
do
  collection_file="${file_location[$i]}"
  collection_name="${collections[$i]}"
  echo "Importing $collection_name from $collection_file"
  mongoimport --jsonArray --db $db_name --collection $collection_name --file $collection_file
done

echo "##### Import completed #####"


