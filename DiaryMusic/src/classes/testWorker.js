var vari = {
    arr:[]
}
self.onmessage(ev=>{
    arr.push(ev.data.msg)
    self.postMessage(vari)
})