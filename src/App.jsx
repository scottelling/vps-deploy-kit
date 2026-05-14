import { useState, useEffect, useCallback, useRef, Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: "#F48FB1", background: "#121212", fontFamily: "monospace" }}>
          <p>Something broke: {this.state.error && this.state.error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

var PURPLE = "#BB86FC";
var TEAL = "#03DAC6";
var PINK = "#F48FB1";
var GREEN = "#69F0AE";
var BG = "#121212";
var NAVY = "#1E1E2E";
var SURFACE = "rgba(255,255,255,0.05)";
var BORDER = "rgba(255,255,255,0.1)";
var TEXT = "#E0E0E0";
var DIM = "rgba(255,255,255,0.5)";

function CopyButton(props) {
  var text = props.text;
  var label = props.label;
  var copied = useState(false);
  var isCopied = copied[0];
  var setCopied = copied[1];
  var handleCopy = useCallback(function () {
    navigator.clipboard.writeText(text).then(function () {
      setCopied(true);
      setTimeout(function () { setCopied(false); }, 2000);
    });
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      style={{
        minHeight: 44,
        padding: "10px 18px",
        background: isCopied ? "rgba(105,240,174,0.15)" : "rgba(187,134,252,0.12)",
        border: "1px solid " + (isCopied ? GREEN : "rgba(187,134,252,0.3)"),
        borderRadius: 8,
        color: isCopied ? GREEN : PURPLE,
        fontSize: 14,
        fontFamily: "Source Code Pro, monospace",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        textAlign: "left",
        wordBreak: "break-all",
      }}
    >
      <span style={{ flexShrink: 0, fontSize: 16 }}>{isCopied ? "\u2713" : "\u29C9"}</span>
      <span style={{ flex: 1 }}>{label || text}</span>
    </button>
  );
}

function CodeBlock(props) {
  var code = props.code;
  var label = props.label;
  var copied = useState(false);
  var isCopied = copied[0];
  var setCopied = copied[1];
  var handleCopy = useCallback(function () {
    navigator.clipboard.writeText(code).then(function () {
      setCopied(true);
      setTimeout(function () { setCopied(false); }, 2000);
    });
  }, [code]);
  return (
    <div style={{ position: "relative", marginBottom: 12 }}>
      {label && (
        <div style={{ fontSize: 12, color: DIM, marginBottom: 4, fontFamily: "Source Code Pro, monospace" }}>
          {label}
        </div>
      )}
      <div
        style={{
          background: "rgba(0,0,0,0.4)",
          border: "1px solid " + BORDER,
          borderRadius: 8,
          padding: "14px 16px",
          paddingRight: 56,
          fontFamily: "Source Code Pro, monospace",
          fontSize: 13,
          lineHeight: 1.6,
          color: TEAL,
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          overflowX: "auto",
        }}
      >
        {code}
      </div>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: label ? 28 : 8,
          right: 8,
          minHeight: 36,
          minWidth: 36,
          background: isCopied ? "rgba(105,240,174,0.15)" : "rgba(187,134,252,0.1)",
          border: "1px solid " + (isCopied ? GREEN : "rgba(187,134,252,0.2)"),
          borderRadius: 6,
          color: isCopied ? GREEN : PURPLE,
          fontSize: 14,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isCopied ? "\u2713" : "\u29C9"}
      </button>
    </div>
  );
}

function CheckItem(props) {
  var checked = props.checked;
  var onChange = props.onChange;
  var children = props.children;
  return (
    <button
      onClick={function () { onChange(!checked); }}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 0",
        background: "none",
        border: "none",
        color: TEXT,
        fontSize: 16,
        textAlign: "left",
        cursor: "pointer",
        width: "100%",
        lineHeight: 1.5,
        opacity: checked ? 0.5 : 1,
        textDecoration: checked ? "line-through" : "none",
      }}
    >
      <span
        style={{
          width: 24,
          height: 24,
          minWidth: 24,
          borderRadius: 6,
          border: "2px solid " + (checked ? GREEN : "rgba(255,255,255,0.25)"),
          background: checked ? "rgba(105,240,174,0.15)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          color: GREEN,
          marginTop: 1,
          transition: "all 0.2s",
        }}
      >
        {checked ? "\u2713" : ""}
      </span>
      <span>{children}</span>
    </button>
  );
}

function InputField(props) {
  var label = props.label;
  var value = props.value;
  var onChange = props.onChange;
  var placeholder = props.placeholder;
  var mono = props.mono;
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 13, color: DIM, marginBottom: 6, fontFamily: "Source Code Pro, monospace" }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={function (e) { onChange(e.target.value); }}
        placeholder={placeholder}
        style={{
          width: "100%",
          minHeight: 44,
          padding: "10px 14px",
          background: "rgba(0,0,0,0.3)",
          border: "1px solid " + BORDER,
          borderRadius: 8,
          color: TEXT,
          fontSize: 16,
          fontFamily: mono ? "Source Code Pro, monospace" : "inherit",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function Card(props) {
  var children = props.children;
  var accent = props.accent;
  var s = {
    background: NAVY,
    border: "1px solid " + BORDER,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  };
  if (accent) {
    s.borderLeft = "3px solid " + accent;
  }
  return (
    <div style={s}>
      {children}
    </div>
  );
}

function StepHeader(props) {
  var number = props.number;
  var title = props.title;
  var subtitle = props.subtitle;
  var done = props.done;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: done ? "rgba(105,240,174,0.15)" : "rgba(187,134,252,0.15)",
            border: "1px solid " + (done ? GREEN : PURPLE),
            color: done ? GREEN : PURPLE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "Source Code Pro, monospace",
          }}
        >
          {done ? "\u2713" : number}
        </span>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: TEXT, fontFamily: "Space Mono, monospace", letterSpacing: "-0.5px" }}>{title}</h2>
      </div>
      {subtitle && <p style={{ margin: 0, marginLeft: 44, fontSize: 15, color: DIM, lineHeight: 1.5 }}>{subtitle}</p>}
    </div>
  );
}

var STEPS = [
  { id: "provider", title: "Get a VPS", subtitle: "Sign up for a cloud server" },
  { id: "connect", title: "Connect to Your Server", subtitle: "SSH in from your Mac or Termius" },
  { id: "install", title: "Install Everything", subtitle: "Node.js, Claude Code, nginx, tmux, mosh" },
  { id: "github", title: "Set Up GitHub on VPS", subtitle: "So you can push code from the server" },
  { id: "projects", title: "Clone Your Projects", subtitle: "Pull your repos onto the server" },
  { id: "nginx", title: "Configure nginx", subtitle: "Serve your apps from the VPS" },
  { id: "https", title: "Enable HTTPS", subtitle: "Free SSL certificates with certbot" },
  { id: "dns", title: "Update DNS", subtitle: "Point scottelling.com to your VPS" },
  { id: "workflow", title: "Your New Workflow", subtitle: "How to use it day-to-day" },
];

var CMD_SSH_KEYGEN = "ssh-keygen -t ed25519 -C \"scott@scottelling.com\"";
var CMD_CAT_KEY = "cat ~/.ssh/id_ed25519.pub";
var CMD_INSTALL_ALL = "# Update system\napt update && apt upgrade -y\n\n# Install Node.js 20\ncurl -fsSL https://deb.nodesource.com/setup_20.x | bash -\napt-get install -y nodejs\n\n# Install tools\napt install -y git tmux mosh nginx certbot python3-certbot-nginx\n\n# Install Claude Code\nnpm install -g @anthropic-ai/claude-code\n\n# Verify everything\necho \"---\"\necho \"Node: $(node -v)\"\necho \"npm: $(npm -v)\"\necho \"git: $(git --version)\"\necho \"nginx: $(nginx -v 2>&1)\"\necho \"claude: $(claude --version 2>&1)\"\necho \"tmux: $(tmux -V)\"\necho \"---\"";
var CMD_API_KEY = "echo 'export ANTHROPIC_API_KEY=\"sk-ant-your-key-here\"' >> ~/.bashrc\nsource ~/.bashrc";
var CMD_TEST_CLAUDE = "mkdir -p /var/www/test && cd /var/www/test && claude";
var CMD_VPS_SSH_KEYGEN = "ssh-keygen -t ed25519 -C \"scott-vps@scottelling.com\"\ncat ~/.ssh/id_ed25519.pub";
var CMD_GIT_CONFIG = "git config --global user.name \"Scott Elling\"\ngit config --global user.email \"scott@scottelling.com\"";
var CMD_GIT_TEST = "ssh -T git@github.com";
var CMD_WILDCARD_CERT = "certbot --nginx -d \"*.scottelling.com\" -d scottelling.com --server https://acme-v02.api.letsencrypt.org/directory";
var CMD_DIG = "dig scottelling.com +short";
var CMD_AUTO_COMMIT_SCRIPT = "cat > /var/www/auto-commit.sh << 'ENDSCRIPT'\n#!/bin/bash\nAPP=$1\ncd /var/www/$APP\nwhile true; do\n    if [[ $(git status --porcelain) ]]; then\n        git add -A\n        git commit -m \"auto: $(date '+%Y-%m-%d %H:%M:%S')\"\n        git push origin main\n    fi\n    sleep 60\ndone\nENDSCRIPT\nchmod +x /var/www/auto-commit.sh";
var CMD_NEW_APP = "cd /var/www\nmkdir new-app && cd new-app\nnpm init -y\nclaude\n\n# When ready to serve it:\n# 1. Create nginx config (go back to Step 6)\n# 2. Run certbot for HTTPS\n# 3. It is live";
var CMD_QUICK_REF = "# Connect\nssh root@YOUR_IP\n# or: mosh root@YOUR_IP\n\n# Resume session\ntmux attach -t sessionname\n\n# List all sessions\ntmux ls\n\n# New tmux session\ntmux new -s sessionname\n\n# Detach from tmux\n# Ctrl+B, then D\n\n# Resume Claude Code\nclaude --resume\n# or inside Claude Code: /resume\n\n# Restart nginx after config changes\nnginx -t && systemctl reload nginx\n\n# Check disk space\ndf -h\n\n# Check memory\nfree -h\n\n# Check running processes\nhtop";

function Step1Provider(props) {
  var checks = props.checks;
  var setCheck = props.setCheck;
  return (
    <div>
      <StepHeader number={1} title="Get a VPS" subtitle="A VPS is just a Linux computer in a data center. You are renting a machine that stays on 24/7." done={checks["1-done"]} />
      <Card accent={PURPLE}>
        <p style={{ margin: "0 0 16px", fontSize: 16, color: TEXT, lineHeight: 1.6 }}>
          Go to one of these providers and create an account. They all do the same thing.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <CopyButton text="https://www.hetzner.com/cloud" label="Hetzner — approx $5/month (cheapest)" />
          <CopyButton text="https://www.digitalocean.com" label="DigitalOcean — $6/month (most popular)" />
          <CopyButton text="https://www.vultr.com" label="Vultr — $6/month (good alternative)" />
        </div>
      </Card>
      <Card>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: TEAL }}>When creating a server, pick these settings:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <CheckItem checked={checks["1-os"]} onChange={function (v) { setCheck("1-os", v); }}>Operating System: Ubuntu 24.04</CheckItem>
          <CheckItem checked={checks["1-plan"]} onChange={function (v) { setCheck("1-plan", v); }}>Plan: 2 CPU / 4GB RAM / 40-80GB disk (smallest tier is fine)</CheckItem>
          <CheckItem checked={checks["1-region"]} onChange={function (v) { setCheck("1-region", v); }}>Region: US East or US West (closest to LA)</CheckItem>
          <CheckItem checked={checks["1-ssh"]} onChange={function (v) { setCheck("1-ssh", v); }}>Add your SSH key (next step shows how)</CheckItem>
        </div>
      </Card>
      <Card accent={PINK}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: PINK }}>Generate your SSH key (if you do not have one)</p>
        <p style={{ margin: "0 0 12px", fontSize: 15, color: DIM, lineHeight: 1.5 }}>Run this on your MacBook. It creates a password-free login to your server.</p>
        <CodeBlock code={CMD_SSH_KEYGEN} label="Run in your Mac terminal. Hit Enter through all prompts." />
        <CodeBlock code={CMD_CAT_KEY} label="This shows your public key. Copy the entire output and paste it into your VPS provider SSH key field." />
      </Card>
      <Card>
        <CheckItem checked={checks["1-done"]} onChange={function (v) { setCheck("1-done", v); }}>
          I have a server running and I have its IP address
        </CheckItem>
      </Card>
    </div>
  );
}

function Step2Connect(props) {
  var checks = props.checks;
  var setCheck = props.setCheck;
  var serverIp = props.serverIp;
  var setServerIp = props.setServerIp;
  return (
    <div>
      <StepHeader number={2} title="Connect to Your Server" subtitle="SSH is how you open a terminal on your server from your Mac or phone." done={checks["2-done"]} />
      <Card accent={PURPLE}>
        <InputField label="YOUR SERVER IP ADDRESS" value={serverIp} onChange={setServerIp} placeholder="168.119.xxx.xxx" mono={true} />
        <p style={{ margin: "0 0 4px", fontSize: 13, color: DIM }}>Find this in your VPS provider dashboard after creating the server.</p>
      </Card>
      {serverIp && (
        <div>
          <Card>
            <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: TEAL }}>From your Mac terminal:</p>
            <CodeBlock code={"ssh root@" + serverIp} label="This opens a terminal on your server" />
            <p style={{ margin: "0 0 8px", fontSize: 15, color: DIM, lineHeight: 1.5 }}>If it asks about fingerprints, type yes and hit Enter.</p>
          </Card>
          <Card accent={PINK}>
            <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: PINK }}>Set up Termius (for phone and Mac)</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <CheckItem checked={checks["2-termius"]} onChange={function (v) { setCheck("2-termius", v); }}>Download Termius from App Store (iPhone and Mac)</CheckItem>
              <CheckItem checked={checks["2-host"]} onChange={function (v) { setCheck("2-host", v); }}>Tap + New Host</CheckItem>
              <CheckItem checked={checks["2-config"]} onChange={function (v) { setCheck("2-config", v); }}>{"Label: VPS -- Hostname: " + serverIp + " -- Username: root"}</CheckItem>
              <CheckItem checked={checks["2-key"]} onChange={function (v) { setCheck("2-key", v); }}>Import your SSH key (Settings, Keys, Import from file, select ~/.ssh/id_ed25519)</CheckItem>
              <CheckItem checked={checks["2-test"]} onChange={function (v) { setCheck("2-test", v); }}>Tap Connect. You should see the server terminal.</CheckItem>
            </div>
          </Card>
        </div>
      )}
      <Card>
        <CheckItem checked={checks["2-done"]} onChange={function (v) { setCheck("2-done", v); }}>
          I can connect to my server from my Mac and/or Termius
        </CheckItem>
      </Card>
    </div>
  );
}

function Step3Install(props) {
  var checks = props.checks;
  var setCheck = props.setCheck;
  return (
    <div>
      <StepHeader number={3} title="Install Everything" subtitle="One big script that installs all your tools. Run this while connected to your server." done={checks["3-done"]} />
      <Card accent={TEAL}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: TEAL }}>Copy this entire block and paste it into your server terminal:</p>
        <CodeBlock code={CMD_INSTALL_ALL} />
        <p style={{ margin: "0 0 8px", fontSize: 15, color: DIM, lineHeight: 1.5 }}>This takes 2-3 minutes. At the end you will see version numbers for everything confirming it worked.</p>
      </Card>
      <Card accent={PURPLE}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: PURPLE }}>Set your Anthropic API key</p>
        <p style={{ margin: "0 0 12px", fontSize: 15, color: DIM, lineHeight: 1.5 }}>Get your key from console.anthropic.com, then API Keys. Then run:</p>
        <CodeBlock code={CMD_API_KEY} label="Replace sk-ant-your-key-here with your actual key" />
      </Card>
      <Card accent={GREEN}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: GREEN }}>Test Claude Code</p>
        <CodeBlock code={CMD_TEST_CLAUDE} label="This should open Claude Code on your server" />
        <p style={{ margin: 0, fontSize: 15, color: DIM, lineHeight: 1.5 }}>If you see the Claude Code prompt, it works. Type /exit to close it.</p>
      </Card>
      <Card>
        <CheckItem checked={checks["3-done"]} onChange={function (v) { setCheck("3-done", v); }}>
          Everything installed and Claude Code runs on my server
        </CheckItem>
      </Card>
    </div>
  );
}

function Step4GitHub(props) {
  var checks = props.checks;
  var setCheck = props.setCheck;
  return (
    <div>
      <StepHeader number={4} title="Set Up GitHub on VPS" subtitle="So your server can push and pull code from your GitHub repos." done={checks["4-done"]} />
      <Card accent={PURPLE}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: PURPLE }}>Generate a server SSH key for GitHub</p>
        <p style={{ margin: "0 0 12px", fontSize: 15, color: DIM, lineHeight: 1.5 }}>Your server needs its own SSH key (separate from your Mac) to talk to GitHub.</p>
        <CodeBlock code={CMD_VPS_SSH_KEYGEN} label="Run on your server. Hit Enter through all prompts, then copy the output." />
      </Card>
      <Card accent={TEAL}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: TEAL }}>Add the key to GitHub</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <CheckItem checked={checks["4-ghsite"]} onChange={function (v) { setCheck("4-ghsite", v); }}>Go to github.com, Settings, SSH and GPG keys, New SSH key</CheckItem>
          <CheckItem checked={checks["4-paste"]} onChange={function (v) { setCheck("4-paste", v); }}>Title: Hetzner VPS -- paste the key output -- click Add</CheckItem>
        </div>
      </Card>
      <Card>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: TEXT }}>Configure git identity on the server:</p>
        <CodeBlock code={CMD_GIT_CONFIG} />
      </Card>
      <Card>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: TEXT }}>Test the connection:</p>
        <CodeBlock code={CMD_GIT_TEST} label="You should see: Hi scottelling! You have successfully authenticated" />
      </Card>
      <Card>
        <CheckItem checked={checks["4-done"]} onChange={function (v) { setCheck("4-done", v); }}>
          My server can connect to GitHub
        </CheckItem>
      </Card>
    </div>
  );
}

function Step5Projects(props) {
  var checks = props.checks;
  var setCheck = props.setCheck;
  var appName = props.appName;
  var setAppName = props.setAppName;
  var cloneCmd = "cd /var/www\ngit clone git@github.com:scottelling/" + (appName || "your-app") + ".git\ncd " + (appName || "your-app") + "\nnpm install";
  var tmuxCmd = "# Start a persistent tmux session\ntmux new -s " + (appName || "myapp") + "\n\n# Inside tmux, open Claude Code\ncd /var/www/" + (appName || "your-app") + "\nclaude\n\n# To DETACH (leave it running): press Ctrl+B, then D\n# To REATTACH later from any device:\ntmux attach -t " + (appName || "myapp");
  return (
    <div>
      <StepHeader number={5} title="Clone Your Projects" subtitle="Pull your existing repos from GitHub onto the server." done={checks["5-done"]} />
      <Card accent={PURPLE}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: PURPLE }}>Create the projects directory and clone a repo</p>
        <CodeBlock code="mkdir -p /var/www" label="This is where all your apps will live on the server" />
        <InputField label="APP NAME (your GitHub repo name)" value={appName} onChange={setAppName} placeholder="second-brain" mono={true} />
        {appName && (
          <CodeBlock code={cloneCmd} label={"Clone " + appName + " and install dependencies"} />
        )}
      </Card>
      <Card accent={TEAL}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: TEAL }}>Start Claude Code inside the project with tmux</p>
        <p style={{ margin: "0 0 12px", fontSize: 15, color: DIM, lineHeight: 1.5 }}>tmux keeps your session alive even if you disconnect. This is the key trick.</p>
        <CodeBlock code={tmuxCmd} />
      </Card>
      <Card>
        <CheckItem checked={checks["5-done"]} onChange={function (v) { setCheck("5-done", v); }}>
          I have cloned at least one project and can run Claude Code on it in tmux
        </CheckItem>
      </Card>
    </div>
  );
}

function Step6Nginx(props) {
  var checks = props.checks;
  var setCheck = props.setCheck;
  var serverIp = props.serverIp;
  var appName = props.appName;
  var setAppName = props.setAppName;
  var appPort = props.appPort;
  var setAppPort = props.setAppPort;
  var isStatic = props.isStatic;
  var setIsStatic = props.setIsStatic;
  var domain = (appName || "myapp") + ".scottelling.com";
  var staticConfig = "server {\n    listen 80;\n    server_name " + domain + ";\n\n    root /var/www/" + (appName || "myapp") + "/dist;\n    index index.html;\n\n    location / {\n        try_files $uri $uri/ /index.html;\n    }\n}";
  var proxyConfig = "server {\n    listen 80;\n    server_name " + domain + ";\n\n    location / {\n        proxy_pass http://localhost:" + (appPort || "3000") + ";\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection 'upgrade';\n        proxy_set_header Host $host;\n        proxy_cache_bypass $http_upgrade;\n    }\n}";
  var config = isStatic ? staticConfig : proxyConfig;
  var createCmd = "cat > /etc/nginx/sites-available/" + domain + " << 'EOF'\n" + config + "\nEOF";
  var enableCmd = "ln -s /etc/nginx/sites-available/" + domain + " /etc/nginx/sites-enabled/\nnginx -t\nsystemctl reload nginx";
  var buildCmd = "cd /var/www/" + (appName || "myapp") + "\nnpm run build";
  return (
    <div>
      <StepHeader number={6} title="Configure nginx" subtitle="nginx is what serves your app to visitors. Each app gets its own config file." done={checks["6-done"]} />
      <Card accent={PURPLE}>
        <p style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 600, color: PURPLE }}>Generate an nginx config for your app</p>
        <InputField label="APP NAME" value={appName} onChange={setAppName} placeholder="second-brain" mono={true} />
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button
            onClick={function () { setIsStatic(true); }}
            style={{
              flex: 1,
              minHeight: 44,
              background: isStatic ? "rgba(187,134,252,0.2)" : SURFACE,
              border: "1px solid " + (isStatic ? PURPLE : BORDER),
              borderRadius: 8,
              color: isStatic ? PURPLE : DIM,
              fontSize: 14,
              cursor: "pointer",
              fontWeight: isStatic ? 600 : 400,
            }}
          >
            Static site (React/Vite build)
          </button>
          <button
            onClick={function () { setIsStatic(false); }}
            style={{
              flex: 1,
              minHeight: 44,
              background: !isStatic ? "rgba(3,218,198,0.15)" : SURFACE,
              border: "1px solid " + (!isStatic ? TEAL : BORDER),
              borderRadius: 8,
              color: !isStatic ? TEAL : DIM,
              fontSize: 14,
              cursor: "pointer",
              fontWeight: !isStatic ? 600 : 400,
            }}
          >
            Running server (Next.js/Express)
          </button>
        </div>
        {!isStatic && (
          <InputField label="PORT YOUR APP RUNS ON" value={appPort} onChange={setAppPort} placeholder="3000" mono={true} />
        )}
      </Card>
      {appName && (
        <Card accent={TEAL}>
          <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: TEAL }}>1. Create the config file. Paste this whole block:</p>
          <CodeBlock code={createCmd} />
          <p style={{ margin: "16px 0 8px", fontSize: 14, fontWeight: 600, color: TEAL }}>2. Enable the site, test, and reload:</p>
          <CodeBlock code={enableCmd} />
          {isStatic && (
            <div>
              <p style={{ margin: "16px 0 8px", fontSize: 14, fontWeight: 600, color: TEAL }}>3. Build your app so the /dist folder exists:</p>
              <CodeBlock code={buildCmd} />
            </div>
          )}
          <p style={{ margin: "16px 0 0", fontSize: 14, color: DIM }}>
            {"Test it: visit http://" + (serverIp || "YOUR_SERVER_IP")}
          </p>
        </Card>
      )}
      <Card>
        <CheckItem checked={checks["6-done"]} onChange={function (v) { setCheck("6-done", v); }}>
          nginx is serving at least one app
        </CheckItem>
      </Card>
    </div>
  );
}

function Step7HTTPS(props) {
  var checks = props.checks;
  var setCheck = props.setCheck;
  var appName = props.appName;
  var domain = (appName || "myapp") + ".scottelling.com";
  var certCmd = "certbot --nginx -d " + domain;
  return (
    <div>
      <StepHeader number={7} title="Enable HTTPS" subtitle="Free SSL certificates from Let us Encrypt. Certbot does everything automatically." done={checks["7-done"]} />
      <Card accent={GREEN}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: GREEN }}>One command per app</p>
        <p style={{ margin: "0 0 12px", fontSize: 15, color: DIM, lineHeight: 1.5 }}>
          This gets a free SSL cert, configures nginx to use it, and sets up auto-renewal. Your DNS must already be pointing to this server for it to work.
        </p>
        <CodeBlock code={certCmd} label={"Get HTTPS for " + domain} />
        <p style={{ margin: "12px 0 0", fontSize: 15, color: DIM, lineHeight: 1.5 }}>
          It will ask for your email and to agree to terms. After that, your site is HTTPS. Certs auto-renew.
        </p>
      </Card>
      <Card>
        <p style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: TEXT }}>To do all your subdomains at once:</p>
        <CodeBlock code={CMD_WILDCARD_CERT} label="Wildcard cert -- covers ALL subdomains in one shot" />
        <p style={{ margin: "12px 0 0", fontSize: 14, color: DIM, lineHeight: 1.5 }}>
          Wildcard certs require DNS validation. Certbot will walk you through adding a TXT record to your DNS in Replit. One-time setup, then all subdomains are covered.
        </p>
      </Card>
      <Card>
        <CheckItem checked={checks["7-done"]} onChange={function (v) { setCheck("7-done", v); }}>
          HTTPS is working on my sites
        </CheckItem>
      </Card>
    </div>
  );
}

function Step8DNS(props) {
  var checks = props.checks;
  var setCheck = props.setCheck;
  var serverIp = props.serverIp;
  var ip = serverIp || "YOUR_VPS_IP";
  return (
    <div>
      <StepHeader number={8} title="Update DNS" subtitle="Point scottelling.com away from Vercel and to your VPS instead." done={checks["8-done"]} />
      <Card accent={PINK}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: PINK }}>This is the big switch</p>
        <p style={{ margin: "0 0 16px", fontSize: 15, color: DIM, lineHeight: 1.5 }}>
          Right now your DNS sends all traffic to Vercel. You are changing it to send traffic to your VPS. After this, Vercel is out of the picture.
        </p>
        <p style={{ margin: "0 0 16px", fontSize: 15, color: TEXT, lineHeight: 1.5 }}>
          Go to Replit, then your domain, then DNS settings. Make these changes:
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, fontFamily: "Source Code Pro, monospace" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid " + BORDER }}>
                <th style={{ textAlign: "left", padding: "8px 12px", color: DIM, fontWeight: 500 }}>Type</th>
                <th style={{ textAlign: "left", padding: "8px 12px", color: DIM, fontWeight: 500 }}>Host</th>
                <th style={{ textAlign: "left", padding: "8px 12px", color: PINK, fontWeight: 500 }}>Old Value</th>
                <th style={{ textAlign: "left", padding: "8px 12px", color: GREEN, fontWeight: 500 }}>New Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid " + BORDER }}>
                <td style={{ padding: "10px 12px", color: TEXT }}>A</td>
                <td style={{ padding: "10px 12px", color: TEXT }}>@</td>
                <td style={{ padding: "10px 12px", color: PINK }}>216.150.1.1</td>
                <td style={{ padding: "10px 12px", color: GREEN }}>{ip}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid " + BORDER }}>
                <td style={{ padding: "10px 12px", color: TEXT }}>A</td>
                <td style={{ padding: "10px 12px", color: TEXT }}>*</td>
                <td style={{ padding: "10px 12px", color: PINK }}>CNAME to vercel</td>
                <td style={{ padding: "10px 12px", color: GREEN }}>{ip}</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", color: TEXT }}>A</td>
                <td style={{ padding: "10px 12px", color: TEXT }}>www</td>
                <td style={{ padding: "10px 12px", color: PINK }}>CNAME to vercel</td>
                <td style={{ padding: "10px 12px", color: GREEN }}>{ip}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ margin: "16px 0 0", fontSize: 14, color: DIM, lineHeight: 1.5 }}>
          Delete the old CNAME records for * and www. Replace them with A records pointing to your VPS IP. DNS changes take 5-30 minutes.
        </p>
      </Card>
      <Card>
        <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, color: TEXT }}>Verify DNS is pointing correctly:</p>
        <CodeBlock code={CMD_DIG} label={"Should return: " + ip} />
      </Card>
      <Card>
        <CheckItem checked={checks["8-done"]} onChange={function (v) { setCheck("8-done", v); }}>
          DNS is pointing to my VPS and sites are loading
        </CheckItem>
      </Card>
    </div>
  );
}

function Step9Workflow(props) {
  var checks = props.checks;
  var setCheck = props.setCheck;
  var appName = props.appName;
  var resumeCmd = "tmux attach -t " + (appName || "myapp");
  var autoCommitRunCmd = "# Run it in a tmux window for any app:\ntmux new -s autocommit\nbash /var/www/auto-commit.sh " + (appName || "myapp");
  return (
    <div>
      <StepHeader number={9} title="Your New Workflow" subtitle="How you use this day-to-day." done={checks["9-done"]} />
      <Card accent={TEAL}>
        <p style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700, color: TEAL }}>Daily Workflow</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <p style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: PURPLE }}>1. Open Termius (Mac or iPhone)</p>
            <p style={{ margin: 0, fontSize: 15, color: DIM, lineHeight: 1.5 }}>Tap your VPS host to connect.</p>
          </div>
          <div>
            <p style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: PURPLE }}>2. Resume your session</p>
            <CodeBlock code={resumeCmd} />
          </div>
          <div>
            <p style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: PURPLE }}>3. You are in Claude Code exactly where you left off</p>
            <p style={{ margin: 0, fontSize: 15, color: DIM, lineHeight: 1.5 }}>Type your bug or feature. Claude Code fixes it. The file is on the server -- it is already live.</p>
          </div>
          <div>
            <p style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: PURPLE }}>4. Close your laptop whenever you want</p>
            <p style={{ margin: 0, fontSize: 15, color: DIM, lineHeight: 1.5 }}>tmux keeps running. Pick up from any device.</p>
          </div>
        </div>
      </Card>
      <Card accent={GREEN}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: GREEN }}>Backup to GitHub (auto-commit script)</p>
        <p style={{ margin: "0 0 12px", fontSize: 15, color: DIM, lineHeight: 1.5 }}>Your changes are live on the server, but you still want them backed up to GitHub. This script auto-commits every 60 seconds:</p>
        <CodeBlock code={CMD_AUTO_COMMIT_SCRIPT} label="Create the script (one time)" />
        <CodeBlock code={autoCommitRunCmd} label="Start auto-committing" />
      </Card>
      <Card accent={PURPLE}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: PURPLE }}>Adding a new app</p>
        <CodeBlock code={CMD_NEW_APP} />
      </Card>
      <Card accent={PINK}>
        <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: PINK }}>Quick Reference</p>
        <CodeBlock code={CMD_QUICK_REF} />
      </Card>
      <Card>
        <CheckItem checked={checks["9-done"]} onChange={function (v) { setCheck("9-done", v); }}>
          I understand my new workflow and I am ready to use it
        </CheckItem>
      </Card>
    </div>
  );
}

function App() {
  var stepState = useState(0);
  var currentStep = stepState[0];
  var setCurrentStep = stepState[1];
  var checksState = useState({});
  var checks = checksState[0];
  var setChecks = checksState[1];
  var ipState = useState("");
  var serverIp = ipState[0];
  var setServerIp = ipState[1];
  var nameState = useState("");
  var appName = nameState[0];
  var setAppName = nameState[1];
  var portState = useState("3000");
  var appPort = portState[0];
  var setAppPort = portState[1];
  var staticState = useState(true);
  var isStatic = staticState[0];
  var setIsStatic = staticState[1];
  var loadState = useState(false);
  var loaded = loadState[0];
  var setLoaded = loadState[1];
  var scrollRef = useRef(null);

  useEffect(function () {
    try {
      var saved = localStorage.getItem("vps-wizard-state");
      if (saved) {
        var d = JSON.parse(saved);
        if (d.checks) setChecks(d.checks);
        if (d.serverIp) setServerIp(d.serverIp);
        if (d.appName) setAppName(d.appName);
        if (d.currentStep !== undefined) setCurrentStep(d.currentStep);
      }
    } catch (e) {
      // no saved state
    }
    setLoaded(true);
  }, []);

  useEffect(function () {
    if (!loaded) return;
    try {
      localStorage.setItem("vps-wizard-state", JSON.stringify({ checks: checks, serverIp: serverIp, appName: appName, currentStep: currentStep }));
    } catch (e) {
      // storage error
    }
  }, [checks, serverIp, appName, currentStep, loaded]);

  var setCheck = useCallback(function (key, val) {
    setChecks(function (prev) {
      var next = {};
      Object.keys(prev).forEach(function (k) { next[k] = prev[k]; });
      next[key] = val;
      return next;
    });
  }, []);

  var completedSteps = STEPS.filter(function (_, i) { return checks[(i + 1) + "-done"]; }).length;

  var handleStepChange = useCallback(function (idx) {
    setCurrentStep(idx);
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, []);

  if (!loaded) return null;

  var sharedProps = { checks: checks, setCheck: setCheck, serverIp: serverIp, setServerIp: setServerIp, appName: appName, setAppName: setAppName, appPort: appPort, setAppPort: setAppPort, isStatic: isStatic, setIsStatic: setIsStatic };

  var stepContent = null;
  if (currentStep === 0) stepContent = <Step1Provider checks={checks} setCheck={setCheck} />;
  if (currentStep === 1) stepContent = <Step2Connect checks={checks} setCheck={setCheck} serverIp={serverIp} setServerIp={setServerIp} />;
  if (currentStep === 2) stepContent = <Step3Install checks={checks} setCheck={setCheck} />;
  if (currentStep === 3) stepContent = <Step4GitHub checks={checks} setCheck={setCheck} />;
  if (currentStep === 4) stepContent = <Step5Projects checks={checks} setCheck={setCheck} appName={appName} setAppName={setAppName} />;
  if (currentStep === 5) stepContent = <Step6Nginx checks={checks} setCheck={setCheck} serverIp={serverIp} appName={appName} setAppName={setAppName} appPort={appPort} setAppPort={setAppPort} isStatic={isStatic} setIsStatic={setIsStatic} />;
  if (currentStep === 6) stepContent = <Step7HTTPS checks={checks} setCheck={setCheck} appName={appName} />;
  if (currentStep === 7) stepContent = <Step8DNS checks={checks} setCheck={setCheck} serverIp={serverIp} />;
  if (currentStep === 8) stepContent = <Step9Workflow checks={checks} setCheck={setCheck} appName={appName} />;

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT, fontFamily: "Outfit, sans-serif" }}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Source+Code+Pro:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap'); * { box-sizing: border-box; } body { margin: 0; background: #121212; } ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; } input::placeholder { color: rgba(255,255,255,0.25); }"}</style>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{"\u25B2"}</span>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: TEXT, fontFamily: "Space Mono, monospace", letterSpacing: "-0.5px" }}>
              VPS Deploy Kit
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 15, color: DIM }}>
            {completedSteps + " of " + STEPS.length + " steps complete"}
          </p>
          <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginTop: 12 }}>
            <div
              style={{
                height: "100%",
                width: (completedSteps / STEPS.length * 100) + "%",
                background: "linear-gradient(90deg, " + PURPLE + ", " + TEAL + ")",
                borderRadius: 2,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
          {STEPS.map(function (step, i) {
            var done = checks[(i + 1) + "-done"];
            var active = i === currentStep;
            return (
              <button
                key={step.id}
                onClick={function () { handleStepChange(i); }}
                style={{
                  minHeight: 44,
                  minWidth: 44,
                  padding: "8px 14px",
                  background: active ? "rgba(187,134,252,0.15)" : done ? "rgba(105,240,174,0.08)" : SURFACE,
                  border: "1px solid " + (active ? PURPLE : done ? "rgba(105,240,174,0.2)" : BORDER),
                  borderRadius: 8,
                  color: active ? PURPLE : done ? GREEN : DIM,
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "Source Code Pro, monospace",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
              >
                {(done ? "\u2713 " : "") + (i + 1)}
              </button>
            );
          })}
        </div>

        <div ref={scrollRef}>
          {stepContent}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 24, paddingBottom: 40 }}>
          {currentStep > 0 && (
            <button
              onClick={function () { handleStepChange(currentStep - 1); }}
              style={{
                flex: 1,
                minHeight: 48,
                background: SURFACE,
                border: "1px solid " + BORDER,
                borderRadius: 12,
                color: DIM,
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Back
            </button>
          )}
          {currentStep < STEPS.length - 1 && (
            <button
              onClick={function () { handleStepChange(currentStep + 1); }}
              style={{
                flex: 2,
                minHeight: 48,
                background: "rgba(187,134,252,0.15)",
                border: "1px solid " + PURPLE,
                borderRadius: 12,
                color: PURPLE,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {"Next: " + STEPS[currentStep + 1].title}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
