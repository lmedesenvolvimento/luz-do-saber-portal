export default {
    audio: null,
    simplePlay (src) {
        try {
            this.audio = new Audio(src)
            this.audio.play()
        } catch (e) {
            console.warn(e)
        }
    },
    stop(){
        if (!this.audio) return
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}