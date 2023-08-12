# /*******************************************************************************
#  *
#  * Copyright (c) {2022-2023} Francois J. Aouad.
#  * All rights reserved. This program and the accompanying materials
#  * are made available under the terms of the GNU General Public License v3.0
#  * which accompanies this distribution, and is available at
#  * https://www.gnu.org/licenses/gpl-3.0.en.html
#  *
#  *******************************************************************************/

# FROM node:alpine AS development

# WORKDIR /usr/src/app
# COPY package*.json ./usr/src/app
# RUN npm install
# COPY . /usr/src/app
# RUN npm run build

# FROM node:alpine as production
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /usr/src/app
# COPY package*.json /usr/src/app
# RUN npm install --omit=dev
# COPY . /usr/src/app
# COPY --from=development /usr/src/app/dist ./dist
# CMD ["node", "dist/main"]
FROM node:alpine
WORKDIR /app
#COPY PACKAGE JSON FILES
COPY package*.json /app
#install files
RUN npm i 
#copy source file
COPY . /app
EXPOSE 5021

CMD ["npm", "run", "start"]