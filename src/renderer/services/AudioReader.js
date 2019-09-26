export default {
    audio: null,
    audioTimeoutId: null,
    playlist: [],
    simplePlay (src) {
        try {
            if (!src) return
            if (this.audioTimeoutId) clearTimeout(this.audioTimeoutId)
            
            this.audio = new Audio(src)
            this.audio.play()            
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