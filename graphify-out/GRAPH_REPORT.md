# Graph Report - AUWC_EVASU  (2026-10-07)

## Corpus Check
- 16 files · ~552,193 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 750 nodes · 1516 edges · 40 communities (32 shown, 7 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App Shell and Layout
- Admin API Client
- Server Dependencies
- Frontend UI Libraries
- Dialog and Sheet Primitives
- Avatar and Card Primitives
- Form Input Primitives
- Alert Dialog and Date Picker
- Package Manifest Entries
- Command and Menu Dialogs
- Project Docs and Assets
- Alert Badge Breadcrumb UI
- Context Menu Components
- Dropdown Menu Components
- React Hook Form Integration
- Carousel Components
- Server Package Manifest
- Select Menu Components
- Charts and Recharts
- Drawer Components
- TypeScript Configuration
- Navigation Menu Components
- Toggle Components
- Backend Auth and Data Stack
- Accordion Components
- Popover Components
- Tabs Components
- Vite Build Toolchain
- React Peer Dependencies
- Collapsible Components
- Hover Card Components
- Pinned Build Packages
- Theme and Toast Utilities
- Package Manager Overrides
- React Peer Dependency Decl
- NPM Scripts
- Aspect Ratio Component
- Vercel Rewrite Config
- Guidelines Template

## God Nodes (most connected - your core abstractions)
1. `cn()` - 223 edges
2. `react` - 59 edges
3. `Lucide React` - 36 edges
4. `useAuth()` - 28 edges
5. `useLanguage()` - 22 edges
6. `react-router` - 17 edges
7. `AUWC ECSF Fellowship Management System` - 15 edges
8. `useLeaderDashboard()` - 13 edges
9. `request()` - 13 edges
10. `LeaderDashboardProvider()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `AUWC ECSF Logo (asset)` --semantically_similar_to--> `AUWC ECSF Logo`  [INFERRED] [semantically similar]
  ATTRIBUTIONS.md → README.md
- `index.html (Vite entry point)` --references--> `AUWC ECSF Fellowship Management System`  [INFERRED]
  index.html → README.md
- `Lucide React` --conceptually_related_to--> `React 18`  [INFERRED]
  ATTRIBUTIONS.md → README.md
- `pnpm workspace config` --conceptually_related_to--> `Vite`  [INFERRED]
  pnpm-workspace.yaml → README.md
- `Command()` --calls--> `cn()`  [EXTRACTED]
  src/app/components/ui/command.tsx → src/app/components/ui/utils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Technology stack** — server_readme_nodejs, server_readme_typescript, server_readme_mongodb_atlas, server_readme_mongodb_driver [EXTRACTED 0.85]
- **React-based Frontend Tech Stack** — readme_react_18, readme_typescript, readme_vite, readme_react_router_7, readme_tailwind_css_4, readme_context_api [EXTRACTED 1.00]
- **UI Library Ecosystem** — attributions_shadcn_ui, attributions_radix_ui, attributions_lucide_react [EXTRACTED 1.00]
- **Role-Based Feature Modules** — readme_admin_dashboard, readme_team_leader_dashboard, readme_mock_authentication, readme_role_based_access [INFERRED 0.85]
- **AUWCEC ECSF Team Photos** — src_assets_teams_art, src_assets_teams_love_sharing, src_assets_teams_worship, src_assets_auwcec_ecsf_logo [INFERRED 0.85]

## Communities (40 total, 7 thin omitted)

### Community 0 - "App Shell and Layout"
Cohesion: 0.06
Nodes (61): Lucide React, react-router, App(), BrandLogo(), BrandLogoProps, Footer(), LanguageToggle(), Navbar() (+53 more)

### Community 1 - "Admin API Client"
Cohesion: 0.06
Nodes (56): AdminOverview, AdminTeam, API_URL, ApiTeam, ApiUser, assignTeamLeaderRequest(), changeLeaderPasswordRequest(), clearAccessToken() (+48 more)

### Community 2 - "Server Dependencies"
Cohesion: 0.06
Nodes (58): MongoDB, bcryptjs, cors, dotenv, express, jsonwebtoken, tsx, @types/cors (+50 more)

### Community 3 - "Frontend UI Libraries"
Cohesion: 0.04
Nodes (56): dependencies, canvas-confetti, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, @emotion/react (+48 more)

### Community 4 - "Dialog and Sheet Primitives"
Cohesion: 0.05
Nodes (44): @radix-ui/react-dialog, @radix-ui/react-tooltip, Input(), Separator(), Sheet(), SheetContent(), SheetDescription(), SheetFooter() (+36 more)

### Community 5 - "Avatar and Card Primitives"
Cohesion: 0.08
Nodes (32): @radix-ui/react-avatar, @radix-ui/react-menubar, Avatar(), AvatarFallback(), AvatarImage(), Card(), CardAction(), CardContent() (+24 more)

### Community 6 - "Form Input Primitives"
Cohesion: 0.06
Nodes (26): clsx, input-otp, @radix-ui/react-checkbox, @radix-ui/react-progress, @radix-ui/react-radio-group, @radix-ui/react-scroll-area, @radix-ui/react-slider, @radix-ui/react-switch (+18 more)

### Community 7 - "Alert Dialog and Date Picker"
Cohesion: 0.10
Nodes (20): @radix-ui/react-alert-dialog, react-day-picker, AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader() (+12 more)

### Community 8 - "Package Manifest Entries"
Cohesion: 0.08
Nodes (24): name, private, type, version, canvas-confetti, date-fns, @emotion/react, @emotion/styled (+16 more)

### Community 9 - "Command and Menu Dialogs"
Cohesion: 0.13
Nodes (15): cmdk, Command(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator(), CommandShortcut() (+7 more)

### Community 10 - "Project Docs and Assets"
Cohesion: 0.14
Nodes (21): AUWC ECSF Logo (asset), Attributions, Radix UI, shadcn/ui, Unsplash, index.html (Vite entry point), pnpm workspace config, Admin Dashboard (+13 more)

### Community 11 - "Alert Badge Breadcrumb UI"
Cohesion: 0.12
Nodes (14): class-variance-authority, @radix-ui/react-slot, Alert(), AlertDescription(), AlertTitle(), alertVariants, Badge(), badgeVariants (+6 more)

### Community 12 - "Context Menu Components"
Cohesion: 0.12
Nodes (10): @radix-ui/react-context-menu, ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut() (+2 more)

### Community 13 - "Dropdown Menu Components"
Cohesion: 0.12
Nodes (10): @radix-ui/react-dropdown-menu, DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+2 more)

### Community 14 - "React Hook Form Integration"
Cohesion: 0.17
Nodes (13): @radix-ui/react-label, react-hook-form, FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext (+5 more)

### Community 15 - "Carousel Components"
Cohesion: 0.17
Nodes (14): embla-carousel-react, Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext() (+6 more)

### Community 16 - "Server Package Manifest"
Cohesion: 0.12
Nodes (15): dependencies, bcryptjs, cors, dotenv, express, jsonwebtoken, mongodb, zod (+7 more)

### Community 17 - "Select Menu Components"
Cohesion: 0.17
Nodes (8): @radix-ui/react-select, SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 18 - "Charts and Recharts"
Cohesion: 0.23
Nodes (10): recharts, ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload() (+2 more)

### Community 19 - "Drawer Components"
Cohesion: 0.17
Nodes (7): vaul, DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 20 - "TypeScript Configuration"
Cohesion: 0.17
Nodes (11): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, module, moduleResolution, outDir, rootDir, skipLibCheck (+3 more)

### Community 21 - "Navigation Menu Components"
Cohesion: 0.20
Nodes (10): @radix-ui/react-navigation-menu, NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger() (+2 more)

### Community 22 - "Toggle Components"
Cohesion: 0.31
Nodes (7): @radix-ui/react-toggle, @radix-ui/react-toggle-group, ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 23 - "Backend Auth and Data Stack"
Cohesion: 0.32
Nodes (8): API areas, AUWC ECSF API, JWT_SECRET, MongoDB Atlas, MongoDB driver, Node.js, Seed script, TypeScript

### Community 24 - "Accordion Components"
Cohesion: 0.33
Nodes (4): @radix-ui/react-accordion, AccordionContent(), AccordionItem(), AccordionTrigger()

### Community 26 - "Tabs Components"
Cohesion: 0.33
Nodes (5): @radix-ui/react-tabs, Tabs(), TabsContent(), TabsList(), TabsTrigger()

### Community 27 - "Vite Build Toolchain"
Cohesion: 0.40
Nodes (5): devDependencies, tailwindcss, @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 28 - "React Peer Dependencies"
Cohesion: 0.40
Nodes (5): peerDependenciesMeta, react, react-dom, optional, optional

### Community 31 - "Pinned Build Packages"
Cohesion: 0.50
Nodes (4): allowScripts, esbuild@0.25.12, esbuild@0.28.2, @tailwindcss/oxide@4.1.12

### Community 33 - "Package Manager Overrides"
Cohesion: 0.67
Nodes (3): vite, pnpm, overrides

### Community 34 - "React Peer Dependency Decl"
Cohesion: 0.67
Nodes (3): peerDependencies, react, react-dom

### Community 35 - "NPM Scripts"
Cohesion: 0.67
Nodes (3): scripts, build, dev

## Knowledge Gaps
- **189 isolated node(s):** `BrandLogoProps`, `Team`, `FormFieldContextValue`, `FormItemContextValue`, `CarouselApi` (+184 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 254 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Lucide React` connect `App Shell and Layout` to `Admin API Client`, `Dialog and Sheet Primitives`, `Avatar and Card Primitives`, `Form Input Primitives`, `Alert Dialog and Date Picker`, `Package Manifest Entries`, `Command and Menu Dialogs`, `Project Docs and Assets`, `Alert Badge Breadcrumb UI`, `Context Menu Components`, `Dropdown Menu Components`, `Carousel Components`, `Select Menu Components`, `Navigation Menu Components`, `Accordion Components`?**
  _High betweenness centrality (0.323) - this node is a cross-community bridge._
- **Why does `react` connect `Form Input Primitives` to `App Shell and Layout`, `Admin API Client`, `Dialog and Sheet Primitives`, `Avatar and Card Primitives`, `Alert Dialog and Date Picker`, `Package Manifest Entries`, `Command and Menu Dialogs`, `Alert Badge Breadcrumb UI`, `Context Menu Components`, `Dropdown Menu Components`, `React Hook Form Integration`, `Carousel Components`, `Select Menu Components`, `Charts and Recharts`, `Drawer Components`, `Navigation Menu Components`, `Toggle Components`, `Accordion Components`, `Popover Components`, `Tabs Components`, `Hover Card Components`?**
  _High betweenness centrality (0.248) - this node is a cross-community bridge._
- **Why does `React 18` connect `Project Docs and Assets` to `App Shell and Layout`?**
  _High betweenness centrality (0.220) - this node is a cross-community bridge._
- **What connects `BrandLogoProps`, `Team`, `FormFieldContextValue` to the rest of the system?**
  _189 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Shell and Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.06218487394957983 - nodes in this community are weakly interconnected._
- **Should `Admin API Client` be split into smaller, more focused modules?**
  _Cohesion score 0.06298904538341157 - nodes in this community are weakly interconnected._
- **Should `Server Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05583972719522592 - nodes in this community are weakly interconnected._