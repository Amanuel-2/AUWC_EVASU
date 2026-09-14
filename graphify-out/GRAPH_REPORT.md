# Graph Report - AUWC_EVASU  (2026-09-12)

## Corpus Check
- 8 files · ~546,819 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 608 nodes · 1249 edges · 42 communities (34 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App Core & Layout
- NPM Dependencies
- UI Input & Sidebar
- UI Avatar & Tabs
- Leader Dashboard
- UI Dialog & Alert
- Home Pages & Team Data
- UI Command Palette
- Attributions & Config
- Package Metadata
- UI Menubar
- UI Context Menu
- UI Dropdown Menu
- UI Forms & Validation
- UI Carousel
- UI Sheet & Dialog
- UI Select
- UI Charts
- UI Drawer
- UI Navigation Menu
- UI Alert & Badge
- UI Progress & Radio
- UI Checkbox & Slider
- UI Toggle & Toggle Group
- UI Input OTP
- UI Accordion
- UI Popover
- Dev Dependencies
- React Peer Deps Meta
- UI Collapsible
- UI Hover Card
- UI Resizable Panels
- UI Toast & Themes
- UI Scroll Area
- Vite Build Config
- PNPM Overrides
- React Peer Deps
- NPM Scripts
- UI Aspect Ratio
- UI Switch
- Guidelines Doc

## God Nodes (most connected - your core abstractions)
1. `cn()` - 223 edges
2. `react` - 58 edges
3. `lucide-react` - 36 edges
4. `useAuth()` - 24 edges
5. `useLanguage()` - 17 edges
6. `react-router` - 17 edges
7. `AUWC ECSF Fellowship Management System` - 15 edges
8. `useLeaderDashboard()` - 13 edges
9. `buttonVariants` - 9 edges
10. `Love Sharing Team` - 9 edges

## Surprising Connections (you probably didn't know these)
- `lucide-react` --conceptually_related_to--> `React 18`  [INFERRED]
  package.json → README.md
- `Attributions` --references--> `lucide-react`  [EXTRACTED]
  ATTRIBUTIONS.md → package.json
- `AUWC ECSF Logo (asset)` --semantically_similar_to--> `AUWC ECSF Logo`  [INFERRED] [semantically similar]
  ATTRIBUTIONS.md → README.md
- `index.html (Vite entry point)` --references--> `AUWC ECSF Fellowship Management System`  [INFERRED]
  index.html → README.md
- `pnpm workspace config` --conceptually_related_to--> `Vite`  [INFERRED]
  pnpm-workspace.yaml → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **React-based Frontend Tech Stack** — readme_react_18, readme_typescript, readme_vite, readme_react_router_7, readme_tailwind_css_4, readme_context_api [EXTRACTED 1.00]
- **UI Library Ecosystem** — attributions_shadcn_ui, attributions_radix_ui, ref_lucide_react [EXTRACTED 1.00]
- **Role-Based Feature Modules** — readme_admin_dashboard, readme_team_leader_dashboard, readme_mock_authentication, readme_role_based_access [INFERRED 0.85]
- **AUWCEC ECSF Team Photos** — src_assets_teams_art, src_assets_teams_love_sharing, src_assets_teams_worship, src_assets_auwcec_ecsf_logo [INFERRED 0.85]

## Communities (42 total, 7 thin omitted)

### Community 0 - "App Core & Layout"
Cohesion: 0.07
Nodes (47): lucide-react, react-router, App(), BrandLogo(), BrandLogoProps, Footer(), LanguageToggle(), Navbar() (+39 more)

### Community 1 - "NPM Dependencies"
Cohesion: 0.04
Nodes (56): dependencies, canvas-confetti, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, @emotion/react (+48 more)

### Community 2 - "UI Input & Sidebar"
Cohesion: 0.06
Nodes (36): @radix-ui/react-tooltip, Input(), Separator(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter() (+28 more)

### Community 3 - "UI Avatar & Tabs"
Cohesion: 0.10
Nodes (31): @radix-ui/react-avatar, @radix-ui/react-tabs, Avatar(), AvatarFallback(), AvatarImage(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink() (+23 more)

### Community 4 - "Leader Dashboard"
Cohesion: 0.18
Nodes (25): createId(), LeaderDashboardContext, LeaderDashboardContextValue, LeaderDashboardProvider(), loadDashboardData(), defaultSchedules, fetchAttendanceRecords(), fetchLeaderTeam() (+17 more)

### Community 5 - "UI Dialog & Alert"
Cohesion: 0.10
Nodes (20): @radix-ui/react-alert-dialog, react-day-picker, AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader() (+12 more)

### Community 6 - "Home Pages & Team Data"
Cohesion: 0.14
Nodes (20): Team, About(), CTA(), Home(), Teams(), useInView(), AUWCEC ECSF Logo, Art Team (+12 more)

### Community 7 - "UI Command Palette"
Cohesion: 0.13
Nodes (15): cmdk, Command(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator(), CommandShortcut() (+7 more)

### Community 8 - "Attributions & Config"
Cohesion: 0.14
Nodes (22): AUWC ECSF Logo (asset), Attributions, Radix UI, shadcn/ui, Unsplash, index.html (Vite entry point), pnpm workspace config, Admin Dashboard (+14 more)

### Community 9 - "Package Metadata"
Cohesion: 0.09
Nodes (21): name, private, type, version, canvas-confetti, date-fns, @emotion/react, @emotion/styled (+13 more)

### Community 10 - "UI Menubar"
Cohesion: 0.11
Nodes (12): @radix-ui/react-menubar, Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarRadioItem(), MenubarSeparator() (+4 more)

### Community 11 - "UI Context Menu"
Cohesion: 0.12
Nodes (10): @radix-ui/react-context-menu, ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut() (+2 more)

### Community 12 - "UI Dropdown Menu"
Cohesion: 0.12
Nodes (10): @radix-ui/react-dropdown-menu, DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+2 more)

### Community 13 - "UI Forms & Validation"
Cohesion: 0.17
Nodes (13): @radix-ui/react-label, react-hook-form, FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext (+5 more)

### Community 14 - "UI Carousel"
Cohesion: 0.17
Nodes (14): embla-carousel-react, Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext() (+6 more)

### Community 15 - "UI Sheet & Dialog"
Cohesion: 0.17
Nodes (8): @radix-ui/react-dialog, Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 16 - "UI Select"
Cohesion: 0.17
Nodes (8): @radix-ui/react-select, SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 17 - "UI Charts"
Cohesion: 0.23
Nodes (10): recharts, ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload() (+2 more)

### Community 18 - "UI Drawer"
Cohesion: 0.17
Nodes (7): vaul, DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 19 - "UI Navigation Menu"
Cohesion: 0.20
Nodes (10): @radix-ui/react-navigation-menu, NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger() (+2 more)

### Community 20 - "UI Alert & Badge"
Cohesion: 0.24
Nodes (8): class-variance-authority, @radix-ui/react-slot, Alert(), AlertDescription(), AlertTitle(), alertVariants, Badge(), badgeVariants

### Community 21 - "UI Progress & Radio"
Cohesion: 0.20
Nodes (7): @radix-ui/react-progress, @radix-ui/react-radio-group, react, Progress(), RadioGroup(), RadioGroupItem(), Textarea()

### Community 22 - "UI Checkbox & Slider"
Cohesion: 0.22
Nodes (6): clsx, @radix-ui/react-checkbox, @radix-ui/react-slider, tailwind-merge, Checkbox(), Slider()

### Community 23 - "UI Toggle & Toggle Group"
Cohesion: 0.31
Nodes (7): @radix-ui/react-toggle, @radix-ui/react-toggle-group, ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 24 - "UI Input OTP"
Cohesion: 0.33
Nodes (4): input-otp, InputOTP(), InputOTPGroup(), InputOTPSlot()

### Community 25 - "UI Accordion"
Cohesion: 0.33
Nodes (4): @radix-ui/react-accordion, AccordionContent(), AccordionItem(), AccordionTrigger()

### Community 27 - "Dev Dependencies"
Cohesion: 0.40
Nodes (5): devDependencies, tailwindcss, @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 28 - "React Peer Deps Meta"
Cohesion: 0.40
Nodes (5): peerDependenciesMeta, react, react-dom, optional, optional

### Community 31 - "UI Resizable Panels"
Cohesion: 0.40
Nodes (3): react-resizable-panels, ResizableHandle(), ResizablePanelGroup()

### Community 33 - "UI Scroll Area"
Cohesion: 0.50
Nodes (3): @radix-ui/react-scroll-area, ScrollArea(), ScrollBar()

### Community 34 - "Vite Build Config"
Cohesion: 0.50
Nodes (3): @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 35 - "PNPM Overrides"
Cohesion: 0.67
Nodes (3): vite, pnpm, overrides

### Community 36 - "React Peer Deps"
Cohesion: 0.67
Nodes (3): peerDependencies, react, react-dom

### Community 37 - "NPM Scripts"
Cohesion: 0.67
Nodes (3): scripts, build, dev

## Knowledge Gaps
- **128 isolated node(s):** `BrandLogoProps`, `AuthContextType`, `User`, `Language`, `TranslationKey` (+123 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 185 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `UI Progress & Radio` to `App Core & Layout`, `UI Input & Sidebar`, `UI Avatar & Tabs`, `Leader Dashboard`, `UI Dialog & Alert`, `Home Pages & Team Data`, `UI Command Palette`, `Package Metadata`, `UI Menubar`, `UI Context Menu`, `UI Dropdown Menu`, `UI Forms & Validation`, `UI Carousel`, `UI Sheet & Dialog`, `UI Select`, `UI Charts`, `UI Drawer`, `UI Navigation Menu`, `UI Alert & Badge`, `UI Checkbox & Slider`, `UI Toggle & Toggle Group`, `UI Input OTP`, `UI Accordion`, `UI Popover`, `UI Hover Card`, `UI Resizable Panels`, `UI Scroll Area`, `UI Switch`?**
  _High betweenness centrality (0.307) - this node is a cross-community bridge._
- **Why does `cn()` connect `UI Avatar & Tabs` to `UI Input & Sidebar`, `UI Dialog & Alert`, `UI Command Palette`, `UI Menubar`, `UI Context Menu`, `UI Dropdown Menu`, `UI Forms & Validation`, `UI Carousel`, `UI Sheet & Dialog`, `UI Select`, `UI Charts`, `UI Drawer`, `UI Navigation Menu`, `UI Alert & Badge`, `UI Progress & Radio`, `UI Checkbox & Slider`, `UI Toggle & Toggle Group`, `UI Input OTP`, `UI Accordion`, `UI Popover`, `UI Hover Card`, `UI Resizable Panels`, `UI Scroll Area`, `UI Switch`?**
  _High betweenness centrality (0.269) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `App Core & Layout` to `UI Input & Sidebar`, `UI Avatar & Tabs`, `Leader Dashboard`, `UI Dialog & Alert`, `Home Pages & Team Data`, `UI Command Palette`, `Attributions & Config`, `Package Metadata`, `UI Menubar`, `UI Context Menu`, `UI Dropdown Menu`, `UI Carousel`, `UI Sheet & Dialog`, `UI Select`, `UI Navigation Menu`, `UI Progress & Radio`, `UI Checkbox & Slider`, `UI Input OTP`, `UI Accordion`, `UI Resizable Panels`?**
  _High betweenness centrality (0.188) - this node is a cross-community bridge._
- **What connects `BrandLogoProps`, `AuthContextType`, `User` to the rest of the system?**
  _128 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Core & Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.07343987823439878 - nodes in this community are weakly interconnected._
- **Should `NPM Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.03571428571428571 - nodes in this community are weakly interconnected._
- **Should `UI Input & Sidebar` be split into smaller, more focused modules?**
  _Cohesion score 0.06387921022067364 - nodes in this community are weakly interconnected._