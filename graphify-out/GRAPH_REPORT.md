# Graph Report - AUWC_EVASU  (2026-09-14)

## Corpus Check
- Large corpus: 109 files · ~549,452 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 713 nodes · 1450 edges · 48 communities (39 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App Core & Layout
- Server Backend
- NPM Dependencies
- UI Input & Sidebar
- UI Avatar & Tabs
- Leader Dashboard Context
- Team Data
- Attributions & Config
- Package Metadata
- UI Command Palette
- UI Progress & Radio
- UI Menubar
- UI Context Menu
- UI Dropdown Menu
- UI Forms & Validation
- UI Dialog & Alert
- UI Carousel
- Server Dependencies
- UI Sheet & Dialog
- UI Select
- UI Charts
- UI Drawer
- Server TypeScript Config
- UI Alert Dialog
- UI Navigation Menu
- UI Toggle & Toggle Group
- Server README
- UI Input OTP
- UI Accordion
- UI Popover
- UI Tabs
- Dev Dependencies
- React Peer Deps Meta
- UI Collapsible
- UI Hover Card
- UI Resizable Panels
- UI Alert & Badge
- UI Toast & Themes
- UI Badge
- Vite Build Config
- PNPM Overrides
- React Peer Deps
- NPM Scripts
- UI Aspect Ratio
- UI Checkbox
- UI Slider
- Guidelines Doc

## God Nodes (most connected - your core abstractions)
1. `cn()` - 223 edges
2. `react` - 58 edges
3. `lucide-react` - 34 edges
4. `useAuth()` - 28 edges
5. `useLanguage()` - 23 edges
6. `react-router` - 17 edges
7. `AUWC ECSF Fellowship Management System` - 15 edges
8. `useLeaderDashboard()` - 13 edges
9. `LeaderDashboardProvider()` - 11 edges
10. `compilerOptions` - 10 edges

## Surprising Connections (you probably didn't know these)
- `AUWC ECSF Logo (asset)` --semantically_similar_to--> `AUWC ECSF Logo`  [INFERRED] [semantically similar]
  ATTRIBUTIONS.md → README.md
- `Lucide React` --conceptually_related_to--> `React 18`  [INFERRED]
  ATTRIBUTIONS.md → README.md
- `index.html (Vite entry point)` --references--> `AUWC ECSF Fellowship Management System`  [INFERRED]
  index.html → README.md
- `pnpm workspace config` --conceptually_related_to--> `Vite`  [INFERRED]
  pnpm-workspace.yaml → README.md
- `AccordionItem()` --calls--> `cn()`  [EXTRACTED]
  src/app/components/ui/accordion.tsx → src/app/components/ui/utils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **UI Library Ecosystem** — attributions_shadcn_ui, attributions_radix_ui, attributions_lucide_react [EXTRACTED 1.00]
- **React-based Frontend Tech Stack** — readme_react_18, readme_typescript, readme_vite, readme_react_router_7, readme_tailwind_css_4, readme_context_api [EXTRACTED 1.00]
- **Role-Based Feature Modules** — readme_admin_dashboard, readme_team_leader_dashboard, readme_mock_authentication, readme_role_based_access [INFERRED 0.85]
- **AUWCEC ECSF Team Photos** — src_assets_teams_art, src_assets_teams_love_sharing, src_assets_teams_worship, src_assets_auwcec_ecsf_logo [INFERRED 0.85]
- **Technology stack** — server_readme_nodejs, server_readme_typescript, server_readme_mongodb_atlas, server_readme_mongodb_driver [EXTRACTED 0.85]

## Communities (48 total, 8 thin omitted)

### Community 0 - "App Core & Layout"
Cohesion: 0.08
Nodes (52): lucide-react, react-router, App(), BrandLogo(), BrandLogoProps, Footer(), LanguageToggle(), Navbar() (+44 more)

### Community 1 - "Server Backend"
Cohesion: 0.06
Nodes (55): bcryptjs, cors, dotenv, express, jsonwebtoken, mongodb, tsx, @types/cors (+47 more)

### Community 2 - "NPM Dependencies"
Cohesion: 0.04
Nodes (56): dependencies, canvas-confetti, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, @emotion/react (+48 more)

### Community 3 - "UI Input & Sidebar"
Cohesion: 0.06
Nodes (36): @radix-ui/react-tooltip, Input(), Separator(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter() (+28 more)

### Community 4 - "UI Avatar & Tabs"
Cohesion: 0.12
Nodes (26): @radix-ui/react-avatar, Avatar(), AvatarFallback(), AvatarImage(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList() (+18 more)

### Community 5 - "Leader Dashboard Context"
Cohesion: 0.19
Nodes (25): createId(), LeaderDashboardContext, LeaderDashboardContextValue, LeaderDashboardProvider(), loadDashboardData(), defaultSchedules, fetchAttendanceRecords(), fetchLeaderTeam() (+17 more)

### Community 6 - "Team Data"
Cohesion: 0.14
Nodes (22): isPlaceholderTeam(), namedTeams, Team, About(), CTA(), Home(), Teams(), useInView() (+14 more)

### Community 7 - "Attributions & Config"
Cohesion: 0.13
Nodes (23): AUWC ECSF Logo (asset), Lucide React, Attributions, Radix UI, shadcn/ui, Unsplash, index.html (Vite entry point), pnpm workspace config (+15 more)

### Community 8 - "Package Metadata"
Cohesion: 0.09
Nodes (22): name, private, type, version, canvas-confetti, date-fns, @emotion/react, @emotion/styled (+14 more)

### Community 9 - "UI Command Palette"
Cohesion: 0.13
Nodes (15): cmdk, Command(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator(), CommandShortcut() (+7 more)

### Community 10 - "UI Progress & Radio"
Cohesion: 0.12
Nodes (14): clsx, @radix-ui/react-progress, @radix-ui/react-radio-group, @radix-ui/react-scroll-area, @radix-ui/react-switch, react, tailwind-merge, Progress() (+6 more)

### Community 11 - "UI Menubar"
Cohesion: 0.11
Nodes (12): @radix-ui/react-menubar, Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarRadioItem(), MenubarSeparator() (+4 more)

### Community 12 - "UI Context Menu"
Cohesion: 0.12
Nodes (10): @radix-ui/react-context-menu, ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut() (+2 more)

### Community 13 - "UI Dropdown Menu"
Cohesion: 0.12
Nodes (10): @radix-ui/react-dropdown-menu, DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+2 more)

### Community 14 - "UI Forms & Validation"
Cohesion: 0.17
Nodes (13): @radix-ui/react-label, react-hook-form, FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext (+5 more)

### Community 15 - "UI Dialog & Alert"
Cohesion: 0.17
Nodes (12): AlertDialogAction(), AlertDialogCancel(), Button(), buttonVariants, Calendar(), Pagination(), PaginationContent(), PaginationEllipsis() (+4 more)

### Community 16 - "UI Carousel"
Cohesion: 0.17
Nodes (14): embla-carousel-react, Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext() (+6 more)

### Community 17 - "Server Dependencies"
Cohesion: 0.12
Nodes (15): dependencies, bcryptjs, cors, dotenv, express, jsonwebtoken, mongodb, zod (+7 more)

### Community 18 - "UI Sheet & Dialog"
Cohesion: 0.17
Nodes (8): @radix-ui/react-dialog, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 19 - "UI Select"
Cohesion: 0.17
Nodes (8): @radix-ui/react-select, SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 20 - "UI Charts"
Cohesion: 0.23
Nodes (10): recharts, ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload() (+2 more)

### Community 21 - "UI Drawer"
Cohesion: 0.17
Nodes (7): vaul, DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 22 - "Server TypeScript Config"
Cohesion: 0.17
Nodes (11): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, module, moduleResolution, outDir, rootDir, skipLibCheck (+3 more)

### Community 23 - "UI Alert Dialog"
Cohesion: 0.18
Nodes (7): @radix-ui/react-alert-dialog, AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay(), AlertDialogTitle()

### Community 24 - "UI Navigation Menu"
Cohesion: 0.20
Nodes (10): @radix-ui/react-navigation-menu, NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger() (+2 more)

### Community 25 - "UI Toggle & Toggle Group"
Cohesion: 0.29
Nodes (8): class-variance-authority, @radix-ui/react-toggle, @radix-ui/react-toggle-group, ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 26 - "Server README"
Cohesion: 0.32
Nodes (8): API areas, AUWC ECSF API, JWT_SECRET, MongoDB Atlas, MongoDB driver, Node.js, Seed script, TypeScript

### Community 27 - "UI Input OTP"
Cohesion: 0.33
Nodes (4): input-otp, InputOTP(), InputOTPGroup(), InputOTPSlot()

### Community 28 - "UI Accordion"
Cohesion: 0.33
Nodes (4): @radix-ui/react-accordion, AccordionContent(), AccordionItem(), AccordionTrigger()

### Community 30 - "UI Tabs"
Cohesion: 0.33
Nodes (5): @radix-ui/react-tabs, Tabs(), TabsContent(), TabsList(), TabsTrigger()

### Community 31 - "Dev Dependencies"
Cohesion: 0.40
Nodes (5): devDependencies, tailwindcss, @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 32 - "React Peer Deps Meta"
Cohesion: 0.40
Nodes (5): peerDependenciesMeta, react, react-dom, optional, optional

### Community 35 - "UI Resizable Panels"
Cohesion: 0.40
Nodes (3): react-resizable-panels, ResizableHandle(), ResizablePanelGroup()

### Community 36 - "UI Alert & Badge"
Cohesion: 0.50
Nodes (4): Alert(), AlertDescription(), AlertTitle(), alertVariants

### Community 38 - "UI Badge"
Cohesion: 0.67
Nodes (3): @radix-ui/react-slot, Badge(), badgeVariants

### Community 39 - "Vite Build Config"
Cohesion: 0.50
Nodes (3): @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 40 - "PNPM Overrides"
Cohesion: 0.67
Nodes (3): vite, pnpm, overrides

### Community 41 - "React Peer Deps"
Cohesion: 0.67
Nodes (3): peerDependencies, react, react-dom

### Community 42 - "NPM Scripts"
Cohesion: 0.67
Nodes (3): scripts, build, dev

## Knowledge Gaps
- **183 isolated node(s):** `name`, `private`, `version`, `type`, `build` (+178 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 238 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `UI Progress & Radio` to `App Core & Layout`, `UI Input & Sidebar`, `UI Avatar & Tabs`, `Leader Dashboard Context`, `Team Data`, `Package Metadata`, `UI Command Palette`, `UI Menubar`, `UI Context Menu`, `UI Dropdown Menu`, `UI Forms & Validation`, `UI Dialog & Alert`, `UI Carousel`, `UI Sheet & Dialog`, `UI Select`, `UI Charts`, `UI Drawer`, `UI Alert Dialog`, `UI Navigation Menu`, `UI Toggle & Toggle Group`, `UI Input OTP`, `UI Accordion`, `UI Popover`, `UI Tabs`, `UI Hover Card`, `UI Resizable Panels`, `UI Alert & Badge`, `UI Badge`, `UI Checkbox`, `UI Slider`?**
  _High betweenness centrality (0.224) - this node is a cross-community bridge._
- **Why does `cn()` connect `UI Avatar & Tabs` to `UI Input & Sidebar`, `UI Command Palette`, `UI Progress & Radio`, `UI Menubar`, `UI Context Menu`, `UI Dropdown Menu`, `UI Forms & Validation`, `UI Dialog & Alert`, `UI Carousel`, `UI Sheet & Dialog`, `UI Select`, `UI Charts`, `UI Drawer`, `UI Alert Dialog`, `UI Navigation Menu`, `UI Toggle & Toggle Group`, `UI Input OTP`, `UI Accordion`, `UI Popover`, `UI Tabs`, `UI Hover Card`, `UI Resizable Panels`, `UI Alert & Badge`, `UI Badge`, `UI Checkbox`, `UI Slider`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **Why does `dependencies` connect `NPM Dependencies` to `Package Metadata`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _183 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Core & Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.07684210526315789 - nodes in this community are weakly interconnected._
- **Should `Server Backend` be split into smaller, more focused modules?**
  _Cohesion score 0.061057692307692306 - nodes in this community are weakly interconnected._
- **Should `NPM Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.03571428571428571 - nodes in this community are weakly interconnected._