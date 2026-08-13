# Connecting the client's Supabase MCP to this project

These steps connect a second, separate Supabase MCP server — scoped only to
this `SystemWeavers` folder — for the client project (Supabase project ref
`bvylipqldlgiujxpetmi`). It won't affect or replace your personal Supabase
MCP connection used elsewhere.

## 1. Install the Claude Code CLI (one-time, if not already installed)

Open a terminal in this project folder (VS Code/Cursor: **Terminal → New
Terminal**, or `` Ctrl+` ``) and check for Node/npm:

```bash
node -v
npm -v
```

If those print version numbers, install the CLI:

```bash
npm install -g @anthropic-ai/claude-code
```

**Close the terminal and open a brand new one** (PowerShell needs to reload
its PATH after the install). Confirm it worked:

```bash
claude --version
```

## 2. Add the client's Supabase MCP server (scoped to this project only)

From a terminal open in `C:\Users\User\code\SystemWeavers`:

```bash
claude mcp add --scope local --transport http supabase-systemweavers "https://mcp.supabase.com/mcp?project_ref=bvylipqldlgiujxpetmi&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching"
```

`--scope local` keeps this tied to this folder on this machine — it's not
committed to git and not shared if the repo is cloned elsewhere.

## 3. Authenticate

```bash
claude /mcp
```

Use arrow keys to find `supabase-systemweavers` → select it → choose
**Authenticate** → your browser opens Supabase's login → log in and click
**Approve**.

## 4. Verify

```bash
claude mcp list
```

`supabase-systemweavers` should show as connected.

After this, start a **new** Claude Code session in this project folder — it
will have direct access to the client's Supabase project, alongside your
personal one, distinguishable by name.
