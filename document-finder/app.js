"use strict";
const $ = selector => document.querySelector(selector);
$("#connect").addEventListener("click", () => {
  const runtime = globalThis.chrome?.runtime;
  if (!runtime?.sendMessage) { $("#status").textContent = "확장을 먼저 설치하고 Chrome 또는 Edge에서 접속해 주세요."; return; }
  $("#status").textContent = "확장 연결을 확인합니다…";
  runtime.sendMessage(DF_PORTAL.extensionId, { type: "discover", protocol: 1 }, reply => {
    const error = runtime.lastError;
    if (error || !reply?.installed || reply.protocol !== 1) { $("#status").textContent = "확장을 찾지 못했습니다. 설치와 버전을 확인해 주세요."; return; }
    const expected = "chrome-extension://" + DF_PORTAL.extensionId + "/panel.html";
    if (reply.panel !== expected) { $("#status").textContent = "확장 버전이 일치하지 않습니다."; return; }
    $("#private-panel").src = expected; $("#private-region").hidden = false;
    $("#status").textContent = "확장을 확인했습니다. 아래 화면에서 이 컴퓨터 연결을 승인해 주세요.";
  });
});
