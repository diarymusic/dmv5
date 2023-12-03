self.onmessage = function handleMessageFromMain(msg) {
    console.log("message from main received in worker:", msg);

    const bufTransferredFromMain = msg.data;

    console.log(
        "buf.byteLength in worker BEFORE transfer back to main:",
        bufTransferredFromMain.byteLength,
    );

    // 将 buf 发送回 main 并转移底层 ArrayBuffer
    self.postMessage(bufTransferredFromMain, [bufTransferredFromMain]);

    console.log(
        "buf.byteLength in worker AFTER transfer back to main:",
        bufTransferredFromMain.byteLength,
    );
};