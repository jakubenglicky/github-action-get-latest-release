Get Latest Release
==================

A simple Github action to get the latest release from another repository. No authentication required.

Configuration
=============

Example Repository - https://github.com/pozetroninc/github-action-get-latest-release

**Inputs**

Name | Description | Example
--- | --- | ---
owner | The Github user or organization that owns the repository |  pozetroninc
repo | The repository name | github-action-get-latest-release
token | Github Personal Token | ***

**Outputs**

Name | Description | Example
--- | --- | ---
release | The new release version tag | v20.08.04.2

Usage Example
=============
``` yaml
name: Build Docker Images
on: [push, repository_dispatch]

jobs:
  build:
    name: RedisTimeSeries
    runs-on: ubuntu-latest
    steps:
      - id: keydb
        uses: jakubenglicky/github-action-get-latest-release@master
        with:
            owner: JohnSully
            repo: KeyDB
            token: ${{ secrets.GITHUB_TOKEN }}
      - uses: actions/checkout@v2
        run: echo ${{ steps.keydb.outputs.release }}
```
