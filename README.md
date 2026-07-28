# ✈️ Lumipad

> Deploy sites to Netlify in one command

**Lumipad** (Tagalog for "flying") — scaffold new sites or deploy existing ones to Netlify.

## Installation

```bash
npm install -g @jamieguerrero/lumipad
```

## Quick Start

```bash
# First time setup
lumipad init

# Deploy a new project (scaffolds from template)
lumipad sa my-new-site

# Deploy an existing project
lumipad sa my-existing-site --dir ./dist

# Deploy an SSR app (React Router, Next.js, etc.)
lumipad sa --ssr
```

## Commands

| Command | Alias | What it does |
|---------|-------|--------------|
| `lumipad sa <name>` | `deploy` | Deploy project (scaffolds if new, deploys if exists) |
| `lumipad sa --ssr` | `deploy --ssr` | Deploy SSR app (runs `netlify deploy --prod`) |
| `lumipad tanggalin <name>` | `remove` | Remove custom subdomain (site stays on `.netlify.app`) |
| `lumipad patay <name>` | `destroy` | Delete subdomain + Netlify site + GitHub repo |
| `lumipad config [key] [val]` | — | View/set configuration |
| `lumipad init` | — | Interactive setup wizard |

## Usage Examples

### New static site from template
```bash
lumipad sa my-cool-site
```
Creates `./my-cool-site`, scaffolds template, creates GitHub repo, deploys to Netlify.

### Deploy existing static directory
```bash
# Directory exists at ./my-app
lumipad sa my-app

# Or specify a different directory
lumipad sa my-app --dir ./dist

# Skip GitHub repo creation
lumipad sa my-app --dir ./build --no-github
```

### Deploy SSR app (React Router, Next.js, etc.)
```bash
cd ~/src/dragonboat-manager

# Production deploy
lumipad sa --ssr

# Preview deploy
lumipad sa --ssr --preview
```

### Remove/destroy
```bash
# Remove subdomain only (site stays alive on .netlify.app)
lumipad tanggalin my-app

# Nuke everything (subdomain + site + repo)
lumipad patay my-app
```

## Configuration

Config stored in `~/.lumipad/config.json`.

### Interactive Setup
```bash
lumipad init
```

### Manual Configuration
```bash
# Required: GitHub username
lumipad config github.username your-username

# Optional: Custom domain base (for subdomains)
lumipad config netlify.customDomain yourdomain.com

# Optional: Git email for commits
lumipad config git.email you@example.com

# View all config
lumipad config
```

### Config Options

| Key | Required | Description |
|-----|----------|-------------|
| `github.username` | ✅ Yes | GitHub account for new repos |
| `netlify.customDomain` | No | Base domain (e.g. `jamieguerrero.com`) |
| `git.email` | No | Fallback git email |
| `git.name` | No | Fallback git name |

## Auth Requirements

- **GitHub**: `gh auth login` or `GH_TOKEN` env var
- **Netlify**: `npx netlify login` or `NETLIFY_AUTH_TOKEN` env var

## Which command for what?

| Scenario | Command |
|----------|---------|
| Brand new static site | `lumipad sa my-site` |
| Existing HTML/CSS/JS | `lumipad sa my-site --dir .` |
| Built React/Vue SPA | `npm run build && lumipad sa my-app --dir ./dist` |
| SSR app (dragonboat-manager) | `lumipad sa --ssr` |
| Preview deploy (SSR) | `lumipad sa --ssr --preview` |

## License

MIT © Jamie Guerrero
