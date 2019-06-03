export default {
    audio: null,
    simplePlay (src) {
        try {
            this.audio = new Audio(src)
            const playPromise = this.audio.play()
            playPromise.then(() =>{
                console.log('playing...')
            }).catch(e => {
                console.log(e)
            })
        } catch (error) {
            console.warn(error)
        }
    },
    stop(){
        if (!this.audio) return
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}