function generate() {
  const rawInput = getInput();
  const parsed = parseMultipathOutput(rawInput);
  const formatted = formatMultipathConf(parsed);
  setOutput(formatted);
}

function getInput() {
  return document.getElementById('input').value;
}

function setOutput(text) {
  document.getElementById('output').value = text;
}

function copyOutput() {
  const output = document.getElementById('output');
  output.select();
  output.setSelectionRange(0, 99999); // Mobile
  navigator.clipboard.writeText(output.value);
}

function parseMultipathOutput(input) {
  const lines = input.split('\n');
  const entries = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match: mpathX (wwid)
    const wwidMatch = line.match(/^mpath\w+\s+\((.*?)\)/);
    if (wwidMatch) {
      const wwid = wwidMatch[1];
      let size = "UNKNOWN";
      let lun = "UNKNOWN";

      for (let j = i; j < i + 15 && j < lines.length; j++) {
        const lookahead = lines[j];

        if (lookahead.includes("size=")) {
          const sizeMatch = lookahead.match(/size=([\d\.]+[TG])/);
          if (sizeMatch) size = sizeMatch[1];
        }

        const lunMatch = lookahead.match(/\d+:\d+:\d+:(\d+)/);
        if (lunMatch) {
          lun = lunMatch[1];
          break;
        }
      }

      entries.push({ wwid, size, lun, alias: "unknown-alias" });
    }
  }

  return entries;
}

function formatMultipathConf(entries) {
  const output = [];
  output.push("multipathd {\n");

  for (const entry of entries) {
    output.push(`    # LUN ${entry.lun} and size=${entry.size}`);
    output.push(`    multipath {\n        alias   ${entry.alias}\n        wwid    ${entry.wwid}\n    }\n`);
  }

  output.push("}");
  return output.join('\n');
}

function setFooterYear() {
  const year = new Date().getFullYear();
  document.getElementById('year').textContent = year;
}

window.onload = () => {
  setFooterYear();
};
