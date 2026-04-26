# Just configuration file for running commands.
#
# For more information, visit https://just.systems.

set script-interpreter := ["nu"]
set shell := ["nu", "--commands"]
export PATH := if os() == "windows" {
  justfile_directory() / ".vendor/bin;" + justfile_directory() /
  ".vendor/lib/pnpm;" + env("PATH")
} else {
  justfile_directory() / ".vendor/bin:" + justfile_directory() /
  ".vendor/lib/pnpm:" + env("PATH")
}
export PNPM_HOME := justfile_directory() / ".vendor/lib/pnpm"

# Execute CI workflow commands.
ci: setup lint build test

# Build application.
[script]
build:
  pnpm exec vite build

# Launch application in developer mode.
dev host='127.0.0.1':
  pnpm exec vite dev --host {{host}}

# Fix code formatting.
format +paths=".":
  pnpm exec prettier --write {{paths}}

# Run code analyses.
lint +paths=".":
  pnpm exec prettier --check {{paths}}
  pnpm exec eslint --no-fix --ext ts,vue --max-warnings 0 {{paths}}
  pnpm exec vue-tsc --build {{paths}}

# List all commands available in justfile.
[default]
@list:
  just --list

# Wrapper to Nushell.
[no-exit-message]
@nu *args:
  nu --commands "{{args}}"

# Wrapper to Pnpm.
[no-exit-message]
@pnpm *args:
  pnpm {{args}}

# Install development dependencies.
[script]
setup: _setup
  let ext = if $nu.os-info.name == "windows" { ".exe" } else { "" }
  if not ($"($env.PNPM_HOME)/pnpm($ext)" | path exists) {
    print "Installing Pnpm."
    let version = http get https://formulae.brew.sh/api/formula/pnpm.json
    | get versions.stable
    let arch = match $nu.os-info.arch { aarch64 => "arm64", x86_64 => "x64" }
    let os = match $nu.os-info.name {
      "linux" => "linuxstatic"
      "windows" => "win"
      _ => $nu.os-info.name
    }
    mkdir $env.PNPM_HOME
    http get $"https://github.com/pnpm/pnpm/releases/download/v($version)/pnpm-($os)-($arch)($ext)"
    | save --force $"($env.PNPM_HOME)/pnpm($ext)"
    if $os != "win" {
      chmod 755 $"($env.PNPM_HOME)/pnpm"
    }
  }
  print $"Using Pnpm (pnpm --version)."
  pnpm env use --global lts
  print "Installing packages with Pnpm."
  if ($env.JUST_INIT? | is-empty) {
    pnpm install --frozen-lockfile
  } else {
    pnpm install
  }
  print "Installing browsers with Playwright."
  try {
    pnpm exec playwright install --with-deps chromium
  } catch {
    pnpm exec playwright install chromium
  }

[unix]
_setup:
  #!/usr/bin/env sh
  set -eu
  if [ ! -x "$(command -v nu)" ]; then
    echo 'Installing Nushell.'
    curl --fail --location --show-error \
      https://scruffaluff.github.io/picoware/install/nushell.sh | sh -s -- \
      --preserve-env --dest .vendor/bin
  fi
  echo "Using Nushell $(nu --version)."

[windows]
_setup:
  #!powershell.exe
  $ErrorActionPreference = 'Stop'
  $ProgressPreference = 'SilentlyContinue'
  $PSNativeCommandUseErrorActionPreference = $True
  if (-not (Get-Command -ErrorAction SilentlyContinue nu)) {
    Write-Output 'Installing Nushell.'
    $NushellScript = Invoke-WebRequest -UseBasicParsing -Uri `
      https://scruffaluff.github.io/picoware/install/nushell.ps1
    Invoke-Expression "& { $NushellScript } --preserve-env --dest .vendor/bin"
  }
  Write-Output "Using Nushell $(nu --version)."

# Run test suites.
test: test-unit test-e2e

# Run end to end test suite.
test-e2e *args:
  pnpm exec playwright test {{args}}

# Run unit test suite.
test-unit +args='run':
  pnpm exec vitest {{args}}
