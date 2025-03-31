function generate() {
  const input = document.getElementById('input').value;
  const lines = input.split('\n');
  const output = [];
  output.push("multipathd {\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('(') && line.includes(')')) {
      const wwidMatch = line.match(/\((.*?)\)/);
      const sizeMatch = line.match(/size=([0-9.]+[GT]?)\s/);
      const wwid = wwidMatch ? wwidMatch[1] : 'UNKNOWN';
      const size = sizeMatch ? sizeMatch[1] : 'UNKNOWN';

      // Look ahead for alias
      let alias = "unknown-alias";
      for (let j = i; j < i + 10; j++) {
        if (lines[j] && lines[j].includes('alias')) {
          const aliasMatch = lines[j].match(/alias\s+([^\s]+)/);
          if (aliasMatch) alias = aliasMatch[1];
          break;
        }
      }

      output.push(`# LUN ? and size=${size}`);
      output.push(`multipath {\n    alias   ${alias}\n    wwid    ${wwid}\n}\n`);
    }
  }

  output.push("}");

  document.getElementById('output').textContent = output.join('\n');
}
