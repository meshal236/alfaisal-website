/* Original diagrams drawn for this article in the site palette.
   copper #127a66 · ink #182234 · ink-dim #4d5a6e · line rgba(24,34,52,.14) */

export const POSTURE_SVG = `
<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hermes agent-first vs OpenClaw control-plane-first">
  <rect x="14" y="14" width="340" height="222" rx="12" fill="#ffffff" stroke="rgba(24,34,52,0.14)"/>
  <rect x="406" y="14" width="340" height="222" rx="12" fill="#ffffff" stroke="rgba(24,34,52,0.14)"/>
  <text x="184" y="52" text-anchor="middle" font-family="monospace" font-size="11" letter-spacing="3" fill="#127a66">AGENT-FIRST</text>
  <text x="184" y="82" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="700" fill="#182234">Hermes</text>
  <g font-family="sans-serif" font-size="13" fill="#4d5a6e">
    <rect x="46" y="104" width="276" height="34" rx="8" fill="#127a66" fill-opacity="0.07"/>
    <text x="184" y="126" text-anchor="middle">Learns its own methods</text>
    <rect x="46" y="146" width="276" height="34" rx="8" fill="#127a66" fill-opacity="0.07"/>
    <text x="184" y="168" text-anchor="middle">Writes and patches skills</text>
    <rect x="46" y="188" width="276" height="34" rx="8" fill="#127a66" fill-opacity="0.07"/>
    <text x="184" y="210" text-anchor="middle">Retains memory across sessions</text>
  </g>
  <text x="380" y="130" text-anchor="middle" font-family="monospace" font-size="12" fill="#8a94a6">VS</text>
  <text x="576" y="52" text-anchor="middle" font-family="monospace" font-size="11" letter-spacing="3" fill="#127a66">CONTROL-PLANE-FIRST</text>
  <text x="576" y="82" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="700" fill="#182234">OpenClaw</text>
  <g font-family="sans-serif" font-size="13" fill="#4d5a6e">
    <rect x="438" y="104" width="276" height="34" rx="8" fill="#182234" fill-opacity="0.05"/>
    <text x="576" y="126" text-anchor="middle">Routes channels and devices</text>
    <rect x="438" y="146" width="276" height="34" rx="8" fill="#182234" fill-opacity="0.05"/>
    <text x="576" y="168" text-anchor="middle">Isolates workspaces</text>
    <rect x="438" y="188" width="276" height="34" rx="8" fill="#182234" fill-opacity="0.05"/>
    <text x="576" y="210" text-anchor="middle">Runs multiple agents</text>
  </g>
</svg>`;

export const ARCH_SVG = `
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hermes learning loop versus OpenClaw gateway hub">
  <rect x="14" y="14" width="340" height="272" rx="12" fill="#ffffff" stroke="rgba(24,34,52,0.14)"/>
  <rect x="406" y="14" width="340" height="272" rx="12" fill="#ffffff" stroke="rgba(24,34,52,0.14)"/>
  <text x="184" y="44" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#182234">Hermes · loop</text>
  <circle cx="184" cy="168" r="76" fill="none" stroke="#127a66" stroke-opacity="0.35" stroke-width="1.5" stroke-dasharray="4 5"/>
  <g font-family="sans-serif" font-size="12" fill="#4d5a6e" text-anchor="middle">
    <circle cx="184" cy="92" r="21" fill="#127a66" fill-opacity="0.1" stroke="#127a66" stroke-opacity="0.5"/>
    <text x="184" y="96">Memory</text>
    <circle cx="260" cy="168" r="21" fill="#127a66" fill-opacity="0.1" stroke="#127a66" stroke-opacity="0.5"/>
    <text x="260" y="172">Skills</text>
    <circle cx="184" cy="244" r="21" fill="#127a66" fill-opacity="0.1" stroke="#127a66" stroke-opacity="0.5"/>
    <text x="184" y="248">Tools</text>
    <circle cx="108" cy="168" r="21" fill="#127a66" fill-opacity="0.1" stroke="#127a66" stroke-opacity="0.5"/>
    <text x="108" y="172">User</text>
  </g>
  <text x="576" y="44" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#182234">OpenClaw · hub</text>
  <g stroke="#127a66" stroke-opacity="0.4" stroke-width="1.5">
    <line x1="576" y1="168" x2="576" y2="100"/>
    <line x1="576" y1="168" x2="484" y2="130"/>
    <line x1="576" y1="168" x2="668" y2="130"/>
    <line x1="576" y1="168" x2="484" y2="220"/>
    <line x1="576" y1="168" x2="668" y2="220"/>
    <line x1="576" y1="168" x2="576" y2="252"/>
  </g>
  <rect x="536" y="150" width="80" height="36" rx="8" fill="#127a66"/>
  <text x="576" y="173" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="600" fill="#ffffff">Gateway</text>
  <g font-family="sans-serif" font-size="11" fill="#4d5a6e" text-anchor="middle">
    <text x="576" y="94">Channels</text>
    <text x="470" y="126">Nodes</text>
    <text x="678" y="126">Workspaces</text>
    <text x="468" y="230">Plugins</text>
    <text x="676" y="230">Sessions</text>
    <text x="576" y="264">Clients</text>
  </g>
</svg>`;

export const SKILL_LOOP_SVG = `
<svg viewBox="0 0 760 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Task to correction to skill update to reusable skill loop">
  <rect x="14" y="14" width="732" height="162" rx="12" fill="#ffffff" stroke="rgba(24,34,52,0.14)"/>
  <g font-family="sans-serif" font-size="12" fill="#182234" text-anchor="middle">
    <rect x="52" y="56" width="130" height="46" rx="9" fill="#127a66" fill-opacity="0.09" stroke="#127a66" stroke-opacity="0.35"/>
    <text x="117" y="84">Task</text>
    <rect x="222" y="56" width="130" height="46" rx="9" fill="#127a66" fill-opacity="0.09" stroke="#127a66" stroke-opacity="0.35"/>
    <text x="287" y="84">Correction</text>
    <rect x="392" y="56" width="130" height="46" rx="9" fill="#127a66" fill-opacity="0.09" stroke="#127a66" stroke-opacity="0.35"/>
    <text x="457" y="84">Skill update</text>
    <rect x="562" y="56" width="140" height="46" rx="9" fill="#127a66" stroke="#127a66"/>
    <text x="632" y="84" fill="#ffffff" font-weight="600">Reusable skill</text>
  </g>
  <g stroke="#4d5a6e" stroke-opacity="0.6" stroke-width="1.4" fill="none">
    <path d="M186 79 h30" marker-end="url(#ah)"/>
    <path d="M356 79 h30" marker-end="url(#ah)"/>
    <path d="M526 79 h30" marker-end="url(#ah)"/>
    <path d="M632 106 v26 H117 v-26" stroke="#127a66" stroke-opacity="0.5" marker-end="url(#ahc)"/>
  </g>
  <defs>
    <marker id="ah" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 z" fill="#4d5a6e" fill-opacity="0.6"/>
    </marker>
    <marker id="ahc" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 z" fill="#127a66" fill-opacity="0.6"/>
    </marker>
  </defs>
  <text x="380" y="152" text-anchor="middle" font-family="monospace" font-size="10" letter-spacing="2" fill="#8a94a6">EXPERIENCE BECOMES PROCEDURAL MEMORY</text>
</svg>`;

export const DECISION_SVG = `
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decision map: pick Hermes or OpenClaw by priority">
  <rect x="14" y="14" width="732" height="272" rx="12" fill="#ffffff" stroke="rgba(24,34,52,0.14)"/>
  <rect x="320" y="34" width="120" height="38" rx="8" fill="#182234" fill-opacity="0.06" stroke="rgba(24,34,52,0.18)"/>
  <text x="380" y="58" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="600" fill="#182234">Your priority</text>
  <g stroke="#127a66" stroke-opacity="0.45" stroke-width="1.6" fill="none">
    <path d="M340 72 L200 108"/>
    <path d="M420 72 L560 108"/>
  </g>
  <g font-family="sans-serif" font-size="12.5" fill="#4d5a6e" text-anchor="middle">
    <rect x="70" y="112" width="260" height="34" rx="8" fill="#127a66" fill-opacity="0.07"/>
    <text x="200" y="134">Compound know-how over time</text>
    <rect x="70" y="152" width="260" height="34" rx="8" fill="#127a66" fill-opacity="0.07"/>
    <text x="200" y="174">Solo or small team</text>
    <rect x="70" y="192" width="260" height="34" rx="8" fill="#127a66" fill-opacity="0.07"/>
    <text x="200" y="214">Shape agent behavior</text>
    <rect x="430" y="112" width="260" height="34" rx="8" fill="#182234" fill-opacity="0.05"/>
    <text x="560" y="134">Operate a local system</text>
    <rect x="430" y="152" width="260" height="34" rx="8" fill="#182234" fill-opacity="0.05"/>
    <text x="560" y="174">Multi-agent, multi-channel</text>
    <rect x="430" y="192" width="260" height="34" rx="8" fill="#182234" fill-opacity="0.05"/>
    <text x="560" y="214">Routing, auth, services</text>
  </g>
  <rect x="130" y="240" width="140" height="38" rx="9" fill="#127a66"/>
  <text x="200" y="264" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">Hermes</text>
  <rect x="490" y="240" width="140" height="38" rx="9" fill="#182234"/>
  <text x="560" y="264" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">OpenClaw</text>
</svg>`;
