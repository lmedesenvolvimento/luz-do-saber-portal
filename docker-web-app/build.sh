LUZ_DO_SABER=${HOME}/luz-do-saber
ORIGIN_FOLDER=${LUZ_DO_SABER}/dist/web
DIST_FOLDER=${LUZ_DO_SABER}/docker-web-app/public

echo "Clear public folder..."
rm -rf ${DIST_FOLDER}

#Build Web application
echo "Building webapp..."
cd .. && npm run build:web

echo "Copy webapp to Express folder"
# Copy Web build to project
cp -r ${ORIGIN_FOLDER} ${DIST_FOLDER}
