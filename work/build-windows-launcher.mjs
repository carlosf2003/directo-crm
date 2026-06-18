import fs from "node:fs";

const html = fs.readFileSync("outputs/crm-marketplaces.html");
const base64 = html.toString("base64");
const chunks = base64.match(/.{1,7600}/g) || [];

const lines = [
  "@echo off",
  "setlocal",
  "set \"APPDIR=%APPDATA%\\DirectoCRM\"",
  "set \"TARGET=%APPDIR%\\crm-marketplaces.html\"",
  "if not exist \"%APPDIR%\" mkdir \"%APPDIR%\"",
  ">\"%APPDIR%\\crm-marketplaces.b64\" (",
  ...chunks.map(chunk => `  echo ${chunk}`),
  ")",
  "powershell -NoProfile -ExecutionPolicy Bypass -Command \"$b64 = Get-Content -Raw '%APPDIR%\\crm-marketplaces.b64'; [IO.File]::WriteAllBytes('%TARGET%', [Convert]::FromBase64String($b64))\"",
  "del \"%APPDIR%\\crm-marketplaces.b64\" >nul 2>nul",
  "start \"\" \"%TARGET%\"",
  "endlocal"
];

fs.writeFileSync("outputs/Directo CRM Windows.bat", lines.join("\r\n"));
console.log(`Created Directo CRM Windows.bat with ${chunks.length} payload chunks.`);
