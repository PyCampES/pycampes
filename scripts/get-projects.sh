#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

gh repo list PyCampES --json name,url,description | jq 'sort_by(.description | length) | sort_by(.description) | reverse' >../public/projects.json
