export default {
    audio: null,
    simplePlay (src) {
        this.audio = new Audio(src)
        this.audio.play()
    },
    stop(){
        if (!this.audio) return
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}