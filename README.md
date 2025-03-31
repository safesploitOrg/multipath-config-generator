# multipath-conf-generator

** A web-based tool to generate formatted `multipath.conf` stanzas from `multipath -ll` output.**  
This project helps Linux system administrators working with SAN storage and multipath setups to easily extract and format WWID and alias information.

---

## 📦 Features

- Paste `multipath -ll` output
- Auto-extract WWID, alias, and size
- Format as valid `multipath.conf` entries
- Fully client-side — no data leaves your browser

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/safesploitOrg/multipath-config-generator.git
cd multipath-config-generator
chronme index.html
```

## Example `/etc/multipath/multipath.conf`

```text

```