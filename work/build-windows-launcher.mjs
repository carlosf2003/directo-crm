import fs from "node:fs";

const html = fs.readFileSync("outputs/crm-marketplaces.html");
const base64 = html.toString("base64");
const chunks = base64.match(/.{1,7600}/g) || [];
const config = `window.DIRECTO_CRM_SUPABASE = {
  url: "",
  anonKey: ""
};
`;
const configBase64 = Buffer.from(config).toString("base64");

const lines = [
  "@echo off",
  "setlocal",
  "set \"APPDIR=%APPDATA%\\DirectoCRM\"",
  "set \"TARGET=%APPDIR%\\crm-marketplaces.html\"",
  "set \"CONFIG=%APPDIR%\\supabase-config.js\"",
  "if not exist \"%APPDIR%\" mkdir \"%APPDIR%\"",
  ">\"%APPDIR%\\crm-marketplaces.b64\" (",
  ...chunks.map(chunk => `  echo ${chunk}`),
  ")",
  "powershell -NoProfile -ExecutionPolicy Bypass -Command \"$b64 = Get-Content -Raw '%APPDIR%\\crm-marketplaces.b64'; [IO.File]::WriteAllBytes('%TARGET%', [Convert]::FromBase64String($b64))\"",
  "del \"%APPDIR%\\crm-marketplaces.b64\" >nul 2>nul",
  `if not exist "%CONFIG%" powershell -NoProfile -ExecutionPolicy Bypass -Command "[IO.File]::WriteAllBytes('%CONFIG%', [Convert]::FromBase64String('${configBase64}'))"`,
  "start \"\" \"%TARGET%\"",
  "endlocal"
];

fs.writeFileSync("outputs/Directo CRM Windows.bat", lines.join("\n"));
console.log(`Created Directo CRM Windows.bat with ${chunks.length} payload chunks.`);
