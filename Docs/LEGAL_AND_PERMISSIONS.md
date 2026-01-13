# Legal Architecture, Permissions & Investor Phrasing

## 1. Legal Stance & Compliance

**WANTED.git** operates on a legally sound "Two-Layer" model that distinguishes between public data analysis and active repository management.

### ✅ What We Do (safe)
- **Fetch Public Data**: We invoke the official GitHub REST/GraphQL APIs to read issues from *public* repositories. This is fully compliant with GitHub's Terms of Service for data aggregation and analysis.
- **Analyze & Rank**: We use AI to classify, rank, and estimate the difficulty of these public issues.
- **Read-Only by Default**: Unless a maintainer installs our app, we never attempt to write data (maintain issues, comment, label) to their repository.

### ❌ What We Do NOT Do
- **No Scraping**: We do not scrape HTML. We strictly use authenticated API calls.
- **No Private Access**: We do not access private repositories or private user data without explicit OAuth/App consent.
- **No Unsolicited Actions**: We do not spam repos with comments or labels without the maintainer's opt-in.

---

## 2. GitHub App Permission Scopes

To maintain trust and security, the **WANTED.git GitHub App** requests the minimum necessary permissions across two tiers.

### Tier 1: Public Data (No Install Required)
* **Status**: Default for all public repos.
* **Access**: Read-only via public API.
* **Permissions**: None requested from user.

### Tier 2: Maintainer Opt-In (App Installation)
* **Status**: Required for payouts, issue assignment, and badging.
* **Permissions**:
    * `Read/Write` on **Issues** (to assign users, post bounty comments).
    * `Read` on **Pull Requests** (to verify merges).
    * `Read` on **Metadata** (standard requirement).
    * **No Code Access**: We generally do NOT ask for "Contents: Read/Write" unless strictly necessary for a specific future automation features (e.g. automated fix PRs), which would be a separate higher-risk opt-in.

---

## 3. Pitch Deck / Investor Phrasing

Use these validated points when explaining the legal risk to investors.

**"Is this legal? Will GitHub shut you down?"**

> "We are 100% compliant with GitHub's API Terms of Service. We operate exactly like **Snyk**, **Dependabot**, or **Sourcegraph**—we analyze public metadata to provide value. We never scrape, and we never touch private code without a maintainer explicitly installing our app. Our 'Read-Only Analysis' layer creates the market, and our 'Opt-In Execution' layer captures the value safely."

**"What if maintainers hate it?"**

> "Our platform is passive by default. We don't spam repos. A maintainer only sees us if they *choose* to monetize their issues. We are a value-add layer, not a noise generator."

---

## 4. Disclaimer for Website

(Implemented in `terms/page.tsx`)

> **7. Data Availability & GitHub Affiliation**
> WANTED.git is an independent platform and is not affiliated with, endorsed by, or sponsored by GitHub, Inc. We utilize public GitHub APIs to access public repository data in accordance with GitHub's Terms of Service. We do not access private repositories or user data without explicit permission via our GitHub App installation.
