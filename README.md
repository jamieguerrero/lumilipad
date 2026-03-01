# ✈️ Lumipad

> Scaffold and deploy static sites to Netlify in one command

**Lumipad** (Tagalog for "fly") takes your static site from zero to deployed in seconds.

## Installation

```bash
npm install -g @jamieguerrero/lumipad
```

## Usage

```bash
lumipad --to my-awesome-project
```

This will:
1. ✨ Scaffold a new project with TokyoNight-themed starter template
2. 📦 Initialize git and create a GitHub repo under `@jamieguerrero`
3. 🚀 Deploy to Netlify and link to GitHub for continuous deployment
4. ✓ Give you a live URL

## Requirements

- Node.js >= 18
- GitHub CLI (`gh`) installed and authenticated
- Netlify CLI installed and authenticated
  - Set `NETLIFY_AUTH_TOKEN` environment variable
  - Or run `netlify login` first

## Authentication Setup

### GitHub
```bash
gh auth login
```

### Netlify
```bash
# Option 1: Interactive login
netlify login

# Option 2: Use personal access token
export NETLIFY_AUTH_TOKEN="your-token-here"
```

Get a Netlify token at: https://app.netlify.com/user/applications#personal-access-tokens

## What You Get

Each lumipad project includes:
- Clean HTML/CSS/JS starter with TokyoNight theme
- Responsive design out of the box
- Netlify configuration with security headers
- Git repo with initial commit
- GitHub repo under your username
- Live Netlify deployment with continuous deployment enabled

## Example

```bash
$ lumipad --to sunset-vibes

✈️  Lumipad launching: sunset-vibes

✓ Project scaffolded
✓ Git initialized
✓ GitHub repo created: jamieguerrero/sunset-vibes
✓ Netlify site created
✓ Deployed to https://sunset-vibes.netlify.app

✓ sunset-vibes is live! 🚀
```

Now just push to GitHub and Netlify auto-deploys. ✨

## License

MIT © Jamie Guerrero
