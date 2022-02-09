LUZ_DO_SABER=$(cd .. && pwd)
ORIGIN_FOLDER=${LUZ_DO_SABER}/dist/web
DIST_FOLDER=$(pwd)/public
# LINUX_BUILDS=${LUZ_DO_SABER}/build/luz-do-saber-packager-linux-*

echo "Clear public folder..."
rm -rf ${DIST_FOLDER}

#Build Web application
echo "Building webapp..."
cd .. && npm run build:web

pwd

echo "Copy webapp to Express folder"
cp -r ${ORIGIN_FOLDER} ${DIST_FOLDER}

# echo "Create Linux directories"
# mkdir ${DIST_FOLDER}/downloads
# mkdir ${DIST_FOLDER}/downloads/linux

# cd ${LUZ_DO_SABER}/dist/installers
# cp -r *.deb ${DIST_FOLDER}/downloads/linux
