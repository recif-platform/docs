<div align="center">

# Récif Documentation

**https://recif-platform.github.io/docs/**

Documentation for the [Récif](https://github.com/recif-platform) agentic AI platform.

[![Live](https://img.shields.io/badge/docs-live-22d3ee)](https://recif-platform.github.io/docs/introduction)
[![Discord](https://img.shields.io/badge/Discord-Join-5865F2?logo=discord&logoColor=white)](https://discord.gg/P279TT4ZCp)

</div>

---

## Structure

```
content/
├── introduction.mdx        # What is Récif
├── quickstart.mdx           # 0 to running agent in 10 min
├── architecture.mdx         # How components fit together
├── guides/
│   ├── create-agent.mdx     # Create your first agent
│   ├── llm-providers.mdx    # Configure LLM providers
│   ├── evaluation.mdx       # Eval-driven lifecycle
│   ├── governance.mdx       # Scorecards & policies
│   ├── canary-deployments.mdx
│   └── knowledge-bases.mdx
├── concepts/
│   ├── agent-lifecycle.mdx
│   ├── eval-driven-releases.mdx
│   ├── multi-tenancy.mdx
│   └── gitops-artifacts.mdx
└── reference/
    ├── environment-variables.mdx
    ├── crd-spec.mdx
    ├── helm-values.mdx
    └── api-endpoints.mdx
```

## Dev

```bash
npm install
npm run dev        # http://localhost:3000/docs/introduction
```

## Deploy

Automatic on push to `main` via GitHub Actions → GitHub Pages.

## License

Apache-2.0
