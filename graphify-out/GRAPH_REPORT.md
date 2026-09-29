# Graph Report - AUWC_EVASU  (2026-09-29)

## Corpus Check
- 10 files · ~549,701 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 726 nodes · 1473 edges · 42 communities (36 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Frontend App Shell
- Backend API Server
- Frontend Dependencies
- API Client & State
- Layout & Navigation UI
- Data Display Components
- Build Tooling
- Action & Input Components
- Form Controls
- Documentation & Config
- Modal & Command
- Menu Components
- Context Menu
- Dropdown Menu
- Form Components
- Carousel
- Sheet
- Select
- Chart
- Drawer
- Server TypeScript Config
- Navigation Menu
- Alert & Badge
- Toggle Components
- Server Dependencies
- Server Documentation
- Server Dev Dependencies
- Input OTP
- Accordion
- Popover
- Frontend Dev Dependencies
- Peer Dependencies Meta
- Avatar
- Collapsible
- HoverCard
- Resizable Panels
- Package Overrides
- Peer Dependencies
- Package Scripts
- Aspect Ratio
- Guidelines

## God Nodes (most connected - your core abstractions)
1. `cn()` - 223 edges
2. `react` - 58 edges
3. `lucide-react` - 34 edges
4. `useAuth()` - 28 edges
5. `useLanguage()` - 21 edges
6. `react-router` - 17 edges
7. `AUWC ECSF Fellowship Management System` - 15 edges
8. `useLeaderDashboard()` - 13 edges
9. `LeaderDashboardProvider()` - 11 edges
10. `compilerOptions` - 10 edges

## Surprising Connections (you probably didn't know these)
- `AUWC ECSF Logo (asset)` --semantically_similar_to--> `AUWC ECSF Logo`  [INFERRED] [semantically similar]
  ATTRIBUTIONS.md → README.md
- `index.html (Vite entry point)` --references--> `AUWC ECSF Fellowship Management System`  [INFERRED]
  index.html → README.md
- `Lucide React` --conceptually_related_to--> `React 18`  [INFERRED]
  ATTRIBUTIONS.md → README.md
- `pnpm workspace config` --conceptually_related_to--> `Vite`  [INFERRED]
  pnpm-workspace.yaml → README.md
- `Progress()` --calls--> `cn()`  [EXTRACTED]
  src/app/components/ui/progress.tsx → src/app/components/ui/utils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Technology stack** — server_readme_nodejs, server_readme_typescript, server_readme_mongodb_atlas, server_readme_mongodb_driver [EXTRACTED 0.85]
- **React-based Frontend Tech Stack** — readme_react_18, readme_typescript, readme_vite, readme_react_router_7, readme_tailwind_css_4, readme_context_api [EXTRACTED 1.00]
- **UI Library Ecosystem** — attributions_shadcn_ui, attributions_radix_ui, attributions_lucide_react [EXTRACTED 1.00]
- **Role-Based Feature Modules** — readme_admin_dashboard, readme_team_leader_dashboard, readme_mock_authentication, readme_role_based_access [INFERRED 0.85]
- **AUWCEC ECSF Team Photos** — src_assets_teams_art, src_assets_teams_love_sharing, src_assets_teams_worship, src_assets_auwcec_ecsf_logo [INFERRED 0.85]

## Communities (42 total, 5 thin omitted)

### Community 0 - "Frontend App Shell"
Cohesion: 0.06
Nodes (64): lucide-react, react-router, App(), BrandLogo(), BrandLogoProps, Footer(), LanguageToggle(), Navbar() (+56 more)

### Community 1 - "Backend API Server"
Cohesion: 0.06
Nodes (55): bcryptjs, cors, dotenv, express, jsonwebtoken, mongodb, tsx, @types/cors (+47 more)

### Community 2 - "Frontend Dependencies"
Cohesion: 0.04
Nodes (56): dependencies, canvas-confetti, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, @emotion/react (+48 more)

### Community 3 - "API Client & State"
Cohesion: 0.09
Nodes (45): API_URL, ApiTeam, ApiUser, clearAccessToken(), currentUserRequest(), fetchAttendanceRequest(), fetchLeaderTeamRequest(), fetchScheduleRequest() (+37 more)

### Community 4 - "Layout & Navigation UI"
Cohesion: 0.06
Nodes (36): @radix-ui/react-tooltip, Input(), Separator(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter() (+28 more)

### Community 5 - "Data Display Components"
Cohesion: 0.11
Nodes (27): @radix-ui/react-tabs, BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator(), Card() (+19 more)

### Community 6 - "Build Tooling"
Cohesion: 0.07
Nodes (26): name, private, type, version, canvas-confetti, date-fns, @emotion/react, @emotion/styled (+18 more)

### Community 7 - "Action & Input Components"
Cohesion: 0.09
Nodes (21): @radix-ui/react-alert-dialog, @radix-ui/react-slot, react-day-picker, AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter() (+13 more)

### Community 8 - "Form Controls"
Cohesion: 0.10
Nodes (18): clsx, @radix-ui/react-checkbox, @radix-ui/react-progress, @radix-ui/react-radio-group, @radix-ui/react-scroll-area, @radix-ui/react-slider, @radix-ui/react-switch, react (+10 more)

### Community 9 - "Documentation & Config"
Cohesion: 0.13
Nodes (23): AUWC ECSF Logo (asset), Lucide React, Attributions, Radix UI, shadcn/ui, Unsplash, index.html (Vite entry point), pnpm workspace config (+15 more)

### Community 10 - "Modal & Command"
Cohesion: 0.13
Nodes (15): cmdk, Command(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator(), CommandShortcut() (+7 more)

### Community 11 - "Menu Components"
Cohesion: 0.11
Nodes (12): @radix-ui/react-menubar, Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarRadioItem(), MenubarSeparator() (+4 more)

### Community 12 - "Context Menu"
Cohesion: 0.12
Nodes (10): @radix-ui/react-context-menu, ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut() (+2 more)

### Community 13 - "Dropdown Menu"
Cohesion: 0.12
Nodes (10): @radix-ui/react-dropdown-menu, DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+2 more)

### Community 14 - "Form Components"
Cohesion: 0.17
Nodes (13): @radix-ui/react-label, react-hook-form, FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext (+5 more)

### Community 15 - "Carousel"
Cohesion: 0.17
Nodes (14): embla-carousel-react, Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext() (+6 more)

### Community 16 - "Sheet"
Cohesion: 0.17
Nodes (8): @radix-ui/react-dialog, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 17 - "Select"
Cohesion: 0.17
Nodes (8): @radix-ui/react-select, SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 18 - "Chart"
Cohesion: 0.23
Nodes (10): recharts, ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload() (+2 more)

### Community 19 - "Drawer"
Cohesion: 0.17
Nodes (7): vaul, DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 20 - "Server TypeScript Config"
Cohesion: 0.17
Nodes (11): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, module, moduleResolution, outDir, rootDir, skipLibCheck (+3 more)

### Community 21 - "Navigation Menu"
Cohesion: 0.20
Nodes (10): @radix-ui/react-navigation-menu, NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger() (+2 more)

### Community 22 - "Alert & Badge"
Cohesion: 0.28
Nodes (7): class-variance-authority, Alert(), AlertDescription(), AlertTitle(), alertVariants, Badge(), badgeVariants

### Community 23 - "Toggle Components"
Cohesion: 0.31
Nodes (7): @radix-ui/react-toggle, @radix-ui/react-toggle-group, ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 24 - "Server Dependencies"
Cohesion: 0.25
Nodes (8): dependencies, bcryptjs, cors, dotenv, express, jsonwebtoken, mongodb, zod

### Community 25 - "Server Documentation"
Cohesion: 0.32
Nodes (8): API areas, AUWC ECSF API, JWT_SECRET, MongoDB Atlas, MongoDB driver, Node.js, Seed script, TypeScript

### Community 26 - "Server Dev Dependencies"
Cohesion: 0.29
Nodes (7): devDependencies, tsx, @types/cors, @types/express, @types/jsonwebtoken, @types/node, typescript

### Community 27 - "Input OTP"
Cohesion: 0.33
Nodes (4): input-otp, InputOTP(), InputOTPGroup(), InputOTPSlot()

### Community 28 - "Accordion"
Cohesion: 0.33
Nodes (4): @radix-ui/react-accordion, AccordionContent(), AccordionItem(), AccordionTrigger()

### Community 30 - "Frontend Dev Dependencies"
Cohesion: 0.40
Nodes (5): devDependencies, tailwindcss, @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 31 - "Peer Dependencies Meta"
Cohesion: 0.40
Nodes (5): peerDependenciesMeta, react, react-dom, optional, optional

### Community 32 - "Avatar"
Cohesion: 0.40
Nodes (4): @radix-ui/react-avatar, Avatar(), AvatarFallback(), AvatarImage()

### Community 35 - "Resizable Panels"
Cohesion: 0.40
Nodes (3): react-resizable-panels, ResizableHandle(), ResizablePanelGroup()

### Community 36 - "Package Overrides"
Cohesion: 0.67
Nodes (3): vite, pnpm, overrides

### Community 37 - "Peer Dependencies"
Cohesion: 0.67
Nodes (3): peerDependencies, react, react-dom

### Community 38 - "Package Scripts"
Cohesion: 0.67
Nodes (3): scripts, build, dev

## Knowledge Gaps
- **183 isolated node(s):** `BrandLogoProps`, `Language`, `TranslationKey`, `FormFieldContextValue`, `FormItemContextValue` (+178 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 240 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Form Controls` to `Frontend App Shell`, `API Client & State`, `Layout & Navigation UI`, `Data Display Components`, `Build Tooling`, `Action & Input Components`, `Modal & Command`, `Menu Components`, `Context Menu`, `Dropdown Menu`, `Form Components`, `Carousel`, `Sheet`, `Select`, `Chart`, `Drawer`, `Navigation Menu`, `Alert & Badge`, `Toggle Components`, `Input OTP`, `Accordion`, `Popover`, `Avatar`, `HoverCard`, `Resizable Panels`?**
  _High betweenness centrality (0.238) - this node is a cross-community bridge._
- **Why does `cn()` connect `Data Display Components` to `Layout & Navigation UI`, `Action & Input Components`, `Form Controls`, `Modal & Command`, `Menu Components`, `Context Menu`, `Dropdown Menu`, `Form Components`, `Carousel`, `Sheet`, `Select`, `Chart`, `Drawer`, `Navigation Menu`, `Alert & Badge`, `Toggle Components`, `Input OTP`, `Accordion`, `Popover`, `Avatar`, `HoverCard`, `Resizable Panels`?**
  _High betweenness centrality (0.182) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Frontend Dependencies` to `Build Tooling`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **What connects `BrandLogoProps`, `Language`, `TranslationKey` to the rest of the system?**
  _183 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Frontend App Shell` be split into smaller, more focused modules?**
  _Cohesion score 0.05942571785268414 - nodes in this community are weakly interconnected._
- **Should `Backend API Server` be split into smaller, more focused modules?**
  _Cohesion score 0.061057692307692306 - nodes in this community are weakly interconnected._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.03571428571428571 - nodes in this community are weakly interconnected._