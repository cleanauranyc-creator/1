# Claude MCP Server Configuration

This directory contains the Model Context Protocol (MCP) server configuration for this project.

## Context7 MCP Server

The project is configured to use the Context7 MCP server for enhanced AI capabilities.

### Configuration Details

- **MCP Endpoint**: https://mcp.context7.com/mcp
- **API Endpoint**: https://context7.com/api/v1
- **Session ID**: ctx7sk-b446be1c-2ed9-495d-b4db-f53a8ec538ee

### Setup

To use the Context7 MCP server, you need to set the `CONTEXT7_API_KEY` environment variable with your API key.

```bash
export CONTEXT7_API_KEY=your_api_key_here
```

### Usage

Once configured, Claude Code will automatically use the Context7 MCP server when running in this project directory.

## Files

- `mcp.json`: MCP server configuration file
