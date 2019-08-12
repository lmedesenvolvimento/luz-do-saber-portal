export default {
    _cache: [
        require('@/assets/images/logo/face.png'),
        require('@/assets/images/logo/face-b.png'),
    ],
    loadCache(){
        this._cache.forEach(asset => {
            let img = new Image()

            img.onload = () => {
                console.log(`Log: loaded ${asset}`)
            }

            img.src = asset
        })
    }
}