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

## Example `/etc/multipath.conf`

### Multipaths

```text
multipaths {

    multipath {
        alias   mpatha
        wwid    360060160e7d0490097a8ea67adc99518
    }
}
```

---

| Option   | Purpose                                          |
|----------|--------------------------------------------------|
| `alias`  | Human-readable name assigned to the multipath map |
| `wwid`   | Worldwide identifier of the LUN/device            |
| `mode`   | Optional; can control access mode (e.g., 0600)    |
| `uid`    | Optional; sets user ID for the device             |
| `gid`    | Optional; sets group ID for the device            |
| `path_grouping_policy` | Can override global/default setting |
| `path_selector`        | Can override global/default setting |
| `path_checker`         | Can override global/default setting |
| `prio`                | Can override global/default setting |
| `no_path_retry`       | Can override global/default setting |

---

### Devices

```text
devices {
    device {
        vendor "DGC"
        product "VRAID"
        path_grouping_policy "group_by_prio"
        getuid_callout "/lib/udev/scsi_id --whitelisted --device=/dev/%n"
        path_selector "service-time 0"
        path_checker "tur"
        hardware_handler "1 alua"
        prio "alua"
        failback "immediate"
        rr_weight "uniform"
        no_path_retry 60
    }
}
```

---

| Option               | Purpose                                             |
|----------------------|-----------------------------------------------------|
| `vendor`, `product`  | Matches your SAN device                             |
| `path_grouping_policy` | Groups paths by ALUA priority                     |
| `getuid_callout`     | Gets unique WWID per LUN                            |
| `path_selector`      | Uses service-time for I/O scheduling                |
| `path_checker`       | Uses `tur` (Test Unit Ready) to check path health   |
| `hardware_handler`   | Enables ALUA for failover control                   |
| `prio`               | Uses ALUA priority to rank paths                    |
| `failback`           | Immediately fail back to preferred path             |
| `rr_weight`          | Round robin weight for path usage                   |
| `no_path_retry`      | Retry for 60 seconds if paths are lost              |

---

### Defaults

```text
defaults {
    user_friendly_names no
    find_multipaths yes
    polling_interval 10
    selector "service-time 0"
    path_checker tur
    rr_min_io 100
    failback immediate
    no_path_retry 60
    max_fds 8192
    mode 0644
    uid 0
    gid 0
}
```

---

| Option               | Purpose                                                                 |
|----------------------|-------------------------------------------------------------------------|
| `user_friendly_names` | Use alias or `mpathX` naming. Set to `no` to prefer WWIDs or aliases.  |
| `find_multipaths`     | If `yes`, only create device if multiple paths are detected.           |
| `polling_interval`    | Time in seconds between path checks.                                   |
| `selector`            | Path selection algorithm. `service-time` is commonly used.             |
| `path_checker`        | Path health checker. `tur` (Test Unit Ready) is suitable for ALUA.     |
| `rr_min_io`           | Number of I/O requests before switching paths in round-robin mode.     |
| `failback`            | When a better path returns, fail back to it (`immediate`, `manual`).   |
| `no_path_retry`       | Retry count or mode (`fail`, `queue`, `N` times) on path failure.      |
| `max_fds`             | Max number of file descriptors multipathd can open.                    |
| `mode`                | Permissions on multipath devices (e.g., `0644`).                       |
| `uid`                 | Owner user ID for device files. Usually `0` (root).                    |
| `gid`                 | Owner group ID for device files. Usually `0` (root).                   |
