import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  href: string;
  status: 'active' | 'beta' | 'coming-soon'; // Keep for future use when regular updates happen
  category: string;
  updated: string; // Keep for future use when regular updates happen
}

const projects: Project[] = [
  {
    id: '001',
    title: 'Competitive Landscape',
    description: 'Interactive radar charts and filtering system for analyzing vendor capabilities across four key dimensions.',
    href: '/competitive-landscape',
    status: 'active',
    category: 'Market Analysis',
    updated: '2 days ago'
  },
  // Add more projects here as they're built
];

// StatusBadge component - removed for now but keep for future when regular updates happen
// const StatusBadge = ({ status }: { status: Project['status'] }) => {
//   const styles = {
//     active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
//     beta: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
//     'coming-soon': 'bg-gray-500/10 text-gray-400 border-gray-500/20'
//   };
//
//   const labels = {
//     active: 'Active',
//     beta: 'Beta',
//     'coming-soon': 'Coming Soon'
//   };
//
//   return (
//     <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
//       {labels[status]}
//     </span>
//   );
// };

const ProjectCard = ({ project }: { project: Project }) => (
  <Link
    href={project.href}
    className="group relative flex flex-col p-6 bg-zinc-900/50 border border-zinc-800/50 rounded-xl hover:bg-zinc-800/50 hover:border-zinc-700/50 transition-all duration-200 backdrop-blur-sm"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20">
        <span className="text-xs font-mono text-blue-400">{project.id}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-500">{project.category}</p>
      </div>
    </div>
    
    <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">
      {project.description}
    </p>
    
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-zinc-500">
        <span>Open</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </div>
  </Link>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />
      
      {/* Content */}
      <div className="relative">
        {/* Header */}
        <header className="border-b border-zinc-800/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              VMG Research
            </h1>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Projects section */}
          <section>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white">Research Projects</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            {/* Coming soon placeholder - full width */}
            <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/20 border border-zinc-800/30 border-dashed rounded-xl">
              <h3 className="text-lg font-medium text-zinc-500 mb-2">More Projects Coming</h3>
              <p className="text-sm text-zinc-600 text-center max-w-xs">
                Additional research tools and visualizations are in development
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="text-sm text-zinc-500">
              © 2025 VMG Ventures Research Division
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
