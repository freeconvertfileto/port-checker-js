# Port Checker

Check whether TCP ports are open or closed on any host, with a 18-port named-service lookup table and common port preset buttons, entirely from the browser.

**Live Demo:** https://file-converter-free.com/en/network-tools/port-checker-online

## How It Works

The host input is normalized by stripping protocol and path. The port list (comma-separated or single) is sent to `https://api.file-converter-free.com/api/port-check?host=...&ports=...` via `fetch`. The response `results` or `ports` array contains objects with `port` and either `open` or `status === 'open'` fields. Each port is rendered in a grid as a colored indicator dot (green for open, red for closed) alongside the port number and its well-known service name from the 18-entry `portNames` map (21=FTP, 22=SSH, 23=Telnet, 25=SMTP, 53=DNS, 80=HTTP, 110=POP3, 143=IMAP, 443=HTTPS, 465=SMTPS, 587=Submission, 993=IMAPS, 995=POP3S, 3306=MySQL, 3389=RDP, 5432=PostgreSQL, 8080=HTTP Alt, 8443=HTTPS Alt). Preset buttons use `data-ports` attributes to populate the port field in one click.

## Features

- Host normalization: strips protocol and path
- Comma-separated multi-port support
- 18-entry `portNames` map for well-known service labels
- Grid layout with green/red status dots per port
- Dual response schema normalization (`open` flag or `status === 'open'`)
- Preset buttons for common port groups via `data-ports` attribute
- Enter key shortcut on both inputs

## Browser APIs Used

- Fetch API

## Code Structure

| File | Description |
|------|-------------|
| `port-checker.js` | `portNames` 18-entry map, preset `data-ports` click handler, `fetch` to `/api/port-check`, dual-schema open detection, port grid with colored dot indicators |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#portHost` | Hostname/IP input |
| `#portNumber` | Port number(s) input (comma-separated) |
| `#portCheck` | Check button |
| `[data-ports]` | Preset port group buttons |
| `#portResults` | Results container |
| `#portLoading` | Loading indicator |
| `#portData` | Port status grid |

## License

MIT
