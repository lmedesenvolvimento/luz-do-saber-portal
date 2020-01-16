export default {
    audio: null,
    audioTimeoutId: null,
    playlist: [],
    simplePlay (src, callback) {
        try {
            if (!src) return
            if (this.audioTimeoutId) clearTimeout(this.audioTimeoutId)
            
            this.audio = new Audio(src)
            this.audio.play()
            this.audio.addEventListener('ended', (e) => {
                if (callback) callback(e.type)
            })
        } catch (error) {
            console.warn(error)
        }
    },
    stop(){
        if (!this.audio) return
        this.audio.pause()
        this.audio.currentTime = 0
    }
}