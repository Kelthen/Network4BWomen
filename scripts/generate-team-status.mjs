#!/usr/bin/env node
/**
 * generate-team-status.mjs
 * Agrège les journaux .claude/journal/<dev>.md de TOUTES les branches distantes
 * (main + feat/**) et régénère TEAM-STATUS.md à la racine.
 *
 * Lancé par .github/workflows/team-sync.yml à chaque push.
 * Aucune dépendance externe : parseur YAML front-matter minimal + git via child_process.
 */
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const DEVS = ["rhamon", "serge"];

function sh(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

// Liste les branches distantes pertinentes (main + feat/**), sans doublon HEAD.
function remoteBranches() {
  const raw = sh("git for-each-ref --format='%(refname:short)' refs/remotes/origin");
  return raw
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean)
    .filter((b) => b !== "origin/HEAD")
    .filter((b) => b === "origin/main" || b.startsWith("origin/feat/"));
}

// Parseur minimal du front-matter YAML entre les deux --- en tête de fichier.
function parseFrontMatter(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2].trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      val = val.replace(/^["']|["']$/g, "");
    }
    out[key] = val;
  }
  return out;
}

// Pour chaque dev, on garde l'entrée de journal la plus récemment mise à jour, toutes branches confondues.
function latestPerDev(branches) {
  const best = {};
  for (const dev of DEVS) {
    for (const branch of branches) {
      const content = sh(`git show ${branch}:.claude/journal/${dev}.md`);
      if (!content) continue;
      const fm = parseFrontMatter(content);
      if (!fm) continue;
      // dernier commit qui a touché ce fichier sur cette branche
      const lastCommit = sh(
        `git log -1 --format=%cI ${branch} -- .claude/journal/${dev}.md`
      );
      const stamp = fm.updated || lastCommit || "";
      const prev = best[dev];
      if (!prev || String(stamp) > String(prev.stamp)) {
        best[dev] = { fm, branch: branch.replace(/^origin\//, ""), lastCommit, stamp };
      }
    }
  }
  return best;
}

function fmtLocks(locked) {
  if (!locked) return "—";
  const arr = Array.isArray(locked) ? locked : [locked];
  if (arr.length === 0) return "—";
  return arr.map((f) => `\`${f}\``).join("<br>");
}

function render(best) {
  const now = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
  let out = "";
  out += "<!-- AUTO-GÉNÉRÉ PAR .github/workflows/team-sync.yml — NE PAS ÉDITER À LA MAIN -->\n";
  out += "# TEAM-STATUS — État de l'équipe en temps réel\n\n";
  out += `_Dernière régénération : **${now}**_\n\n`;
  out += "> Avant d'agir, lis ce tableau + le journal de l'autre (`.claude/journal/`).\n";
  out += "> Ne touche jamais un fichier listé dans `files_locked` de l'autre.\n\n";
  out += "| Dev | GitHub | Branche active | Tâche en cours | Fichiers verrouillés | Journal MAJ |\n";
  out += "|---|---|---|---|---|---|\n";
  for (const dev of DEVS) {
    const b = best[dev];
    if (!b) {
      out += `| **${dev}** | — | — | _(pas encore de journal)_ | — | — |\n`;
      continue;
    }
    const f = b.fm;
    out += `| **${dev}** | \`${f.github || "?"}\` | \`${f.branch || b.branch}\` | ${f.current_task || "—"} | ${fmtLocks(f.files_locked)} | ${f.updated || b.lastCommit || "—"} |\n`;
  }
  out += "\n---\n\n";
  out += "### Détails par branche\n\n";
  for (const dev of DEVS) {
    const b = best[dev];
    if (!b) continue;
    out += `- **${dev}** → dernière activité sur \`${b.branch}\` (${b.lastCommit || "?"})\n`;
  }
  out += "\n_Ce fichier est régénéré automatiquement à chaque push. Pour changer l'état, édite TON journal et pousse._\n";
  return out;
}

const branches = remoteBranches();
const best = latestPerDev(branches);
const md = render(best);
writeFileSync("TEAM-STATUS.md", md, "utf8");
console.log("TEAM-STATUS.md régénéré depuis", branches.length, "branche(s).");
