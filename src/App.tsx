import { useState } from 'react';
import { Menu, MoreVertical, ChevronLeft, ChevronRight, ExternalLink, X, Upload, Trash2, LogOut } from 'lucide-react';

type PageType = 'login' | 'hero-banner' | 'projects' | 'testimonials' | 'clients' | 'experience';
type ProjectStatus = 'draft' | 'published';

interface Project {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  status: ProjectStatus;
}

interface TierDescription {
  title: string;
  description: string;
}

interface Testimonial {
  id?: number;
  fullName: string;
  role: string;
  description: string;
  image?: string;
  status?: 'draft' | 'published';
}

interface Client {
  id?: number;
  name: string;
  logo: string;
  status?: 'draft' | 'published';
}

interface AddProjectForm {
  name: string;
  description: string;
  thumbnail: string;
  date: string;
  clientName: string;
  website: string;
  input: string;
  service: string[];
  serviceInput: string;
  tiers: TierDescription[];
  photos: string[];
  photoInput: string;
  testimonials: Testimonial[];
  currentTestimonial: Partial<Testimonial>;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Sportly',
    description: 'Improved onboarding experience for new users',
    thumbnail: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop',
    status: 'draft',
  },
  {
    id: 2,
    name: 'Payroll',
    description: 'Improved onboarding experience for new users',
    thumbnail: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop',
    status: 'published',
  },
  {
    id: 3,
    name: 'Wepay',
    description: 'Improved onboarding experience for new users',
    thumbnail: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop',
    status: 'published',
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    fullName: 'Kaleab Mezgebe',
    role: 'CEO, At Minab IT',
    description: 'Berhane helped simplify our product experience and improved usability across key flows. Highly recommended for product design work.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    status: 'draft',
  },
  {
    id: 2,
    fullName: 'Nahom Alebachew',
    role: 'CEO, At Minab IT',
    description: 'Berhane helped simplify our product experience and improved usability across key flows. Highly recommended for product design work.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    status: 'published',
  },
  {
    id: 3,
    fullName: 'Habtamu Belay',
    role: 'CEO, At Minab IT',
    description: 'Berhane helped simplify our product experience and improved usability across key flows. Highly recommended for product design work.',
    image: 'https://images.pexels.com/photos/1250373/pexels-photo-1250373.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    status: 'published',
  },
];

const CLIENTS: Client[] = [
  {
    id: 1,
    name: 'LERSHA',
    logo: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    status: 'draft',
  },
  {
    id: 2,
    name: 'PxD Precision Development',
    logo: 'https://images.pexels.com/photos/3862630/pexels-photo-3862630.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    status: 'published',
  },
  {
    id: 3,
    name: 'PxD Precision Development',
    logo: 'https://images.pexels.com/photos/3862630/pexels-photo-3862630.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    status: 'published',
  },
];

const NAVIGATION = [
  { label: 'Hero Images', key: 'hero-banner' as const },
  { label: 'Projects', key: 'projects' as const },
  { label: 'Testimonials', key: 'testimonials' as const },
  { label: 'Clients', key: 'clients' as const },
  { label: 'Experience', key: 'experience' as const },
];

const INITIAL_FORM: AddProjectForm = {
  name: '',
  description: '',
  thumbnail: '',
  date: '',
  clientName: '',
  website: '',
  input: '',
  service: [],
  serviceInput: '',
  tiers: [
    { title: 'Tier 1', description: '' },
    { title: 'Tier 2', description: '' },
    { title: 'Tier 3', description: '' },
  ],
  photos: [],
  photoInput: '',
  testimonials: [],
  currentTestimonial: {},
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [pageNumber, setPageNumber] = useState(0);
  const [activeAction, setActiveAction] = useState<number | null>(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [form, setForm] = useState<AddProjectForm>(INITIAL_FORM);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [testimonialAction, setTestimonialAction] = useState<number | null>(null);
  const [clients, setClients] = useState<Client[]>(CLIENTS);
  const [clientAction, setClientAction] = useState<number | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    fullName: '',
    role: '',
    description: '',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    status: 'draft',
  });
  const [newClient, setNewClient] = useState<Client>({
    name: '',
    logo: '',
    status: 'draft',
  });
  const [currentTestimonialPreview, setCurrentTestimonialPreview] = useState(0);
  const itemsPerPage = 3;

  const getCurrentPageIndex = () => {
    return NAVIGATION.findIndex(nav => nav.key === currentPage);
  };

  const canNavigatePrev = () => {
    return getCurrentPageIndex() > 0;
  };

  const canNavigateNext = () => {
    return getCurrentPageIndex() < NAVIGATION.length - 1;
  };

  const navigatePage = (direction: 'prev' | 'next') => {
    const currentIndex = getCurrentPageIndex();
    if (direction === 'prev' && canNavigatePrev()) {
      setCurrentPage(NAVIGATION[currentIndex - 1].key);
      setPageNumber(0);
      setActiveAction(null);
    } else if (direction === 'next' && canNavigateNext()) {
      setCurrentPage(NAVIGATION[currentIndex + 1].key);
      setPageNumber(0);
      setActiveAction(null);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const displayedProjects = PROJECTS.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);
  const totalPages = Math.ceil(PROJECTS.length / itemsPerPage);

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                brex<span className="text-blue-500">folio</span>
              </h1>
              <p className="text-gray-600">Welcome back</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAuthenticated(true);
                setCurrentPage('hero-banner');
              }}
              className="bg-white rounded-lg shadow-lg p-8 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main App Layout
  return (
    <>
      <div className="flex h-screen bg-white">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 p-6 flex flex-col overflow-hidden">
          <div className="mb-12">
            <h1 className="text-2xl font-bold text-gray-900">
              brex<span className="text-blue-500">folio</span>.
            </h1>
          </div>

          <nav className="space-y-2 flex-1 overflow-y-auto">
            {NAVIGATION.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key);
                  setPageNumber(0);
                  setActiveAction(null);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  currentPage === item.key
                    ? 'bg-blue-100 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition border-t border-gray-200 mt-4"
          >
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu size={20} className="text-gray-600" />
            <h1 className="text-lg text-gray-700">
              {NAVIGATION.find(nav => nav.key === currentPage)?.label || 'Page'}
            </h1>
          </div>
          <ExternalLink size={20} className="text-gray-600" />
        </header>

        <div className="flex-1 overflow-y-auto">
          {/* Hero Banner Page */}
          {currentPage === 'hero-banner' && (
            <div className="p-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Hero Images</h2>
                <p className="text-gray-500">Manage your hero banner images</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition cursor-pointer">
                    <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload hero image {i}</p>
                    <p className="text-xs text-gray-500">PNG, JPG or PDF max 1920x1080</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Page */}
          {currentPage === 'projects' && (
            <div className="p-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Projects Lists</h2>
                <p className="text-gray-500">Projects Lists</p>
              </div>

              <div className="mb-8 flex justify-end">
                <button
                  onClick={() => setShowAddProject(true)}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
                >
                  Add New Project
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="grid grid-cols-5 gap-6 p-6 border-b border-gray-200">
                  <div className="text-sm font-semibold text-gray-700">Project Name</div>
                  <div className="text-sm font-semibold text-gray-700">Short Description</div>
                  <div className="text-sm font-semibold text-gray-700">Thumbnail</div>
                  <div className="text-sm font-semibold text-gray-700">Status</div>
                  <div className="text-sm font-semibold text-gray-700">Action</div>
                </div>

                <div className="divide-y divide-gray-200">
                  {displayedProjects.map((project) => (
                    <div key={project.id} className="grid grid-cols-5 gap-6 p-6 items-center hover:bg-gray-50 transition relative">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">{project.description}</p>
                      </div>

                      <div>
                        <img
                          src={project.thumbnail}
                          alt={project.name}
                          className="w-20 h-16 rounded object-cover"
                        />
                      </div>

                      <div>
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {project.status === 'published' && <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />}
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => setActiveAction(activeAction === project.id ? null : project.id)}
                          className="p-1 hover:bg-gray-200 rounded transition"
                        >
                          <MoreVertical size={18} className="text-gray-500" />
                        </button>

                        {activeAction === project.id && (
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                              Publish Project
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                              Edit Project
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600">
                              Delete Project
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-6 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPageNumber(Math.max(0, pageNumber - 1))}
                      disabled={pageNumber === 0}
                      className="p-2 hover:bg-gray-100 rounded disabled:text-gray-300"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setPageNumber(Math.min(totalPages - 1, pageNumber + 1))}
                      disabled={pageNumber >= totalPages - 1}
                      className="p-2 hover:bg-gray-100 rounded disabled:text-gray-300"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Showing {pageNumber + 1} of {totalPages} Results</p>
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Page */}
          {currentPage === 'testimonials' && (
            <div className="p-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Testimonials</h2>
                <p className="text-gray-500">Add client words here</p>
              </div>

              <div className="mb-8 flex justify-end">
                <button
                  onClick={() => setShowAddTestimonial(true)}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
                >
                  Add New
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="grid grid-cols-5 gap-6 p-6 border-b border-gray-200">
                  <div className="text-sm font-semibold text-gray-700">Full name</div>
                  <div className="text-sm font-semibold text-gray-700">Role</div>
                  <div className="text-sm font-semibold text-gray-700">Description</div>
                  <div className="text-sm font-semibold text-gray-700">Status</div>
                  <div className="text-sm font-semibold text-gray-700">Action</div>
                </div>

                <div className="divide-y divide-gray-200">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="grid grid-cols-5 gap-6 p-6 items-start hover:bg-gray-50 transition relative">
                      <div className="flex items-center gap-3">
                        {testimonial.image && (
                          <img
                            src={testimonial.image}
                            alt={testimonial.fullName}
                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                          />
                        )}
                        <p className="text-sm font-medium text-gray-900">{testimonial.fullName}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 line-clamp-3">{testimonial.description}</p>
                      </div>

                      <div>
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            testimonial.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {testimonial.status === 'published' && <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />}
                          {testimonial.status?.charAt(0).toUpperCase() + testimonial.status?.slice(1)}
                        </span>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => setTestimonialAction(testimonialAction === testimonial.id ? null : testimonial.id)}
                          className="p-1 hover:bg-gray-200 rounded transition"
                        >
                          <MoreVertical size={18} className="text-gray-500" />
                        </button>

                        {testimonialAction === testimonial.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                              Publish Testimonial
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                              Edit Testimonial
                            </button>
                            <button
                              onClick={() => {
                                setTestimonials(testimonials.filter(t => t.id !== testimonial.id));
                                setTestimonialAction(null);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                            >
                              Delete Testimonial
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-6 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button
                      disabled
                      className="p-2 hover:bg-gray-100 rounded disabled:text-gray-300"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      disabled
                      className="p-2 hover:bg-gray-100 rounded disabled:text-gray-300"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Showing 1 of 10 Results</p>
                </div>
              </div>
            </div>
          )}

          {/* Clients Page */}
          {currentPage === 'clients' && (
            <div className="p-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Clients(logos)</h2>
              </div>

              <div className="mb-8 flex justify-end">
                <button
                  onClick={() => setShowAddClient(true)}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
                >
                  Add New
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="grid grid-cols-3 gap-6 p-6 border-b border-gray-200">
                  <div className="text-sm font-semibold text-gray-700">Logo</div>
                  <div className="text-sm font-semibold text-gray-700">Status</div>
                  <div className="text-sm font-semibold text-gray-700">Action</div>
                </div>

                <div className="divide-y divide-gray-200">
                  {clients.map((client) => (
                    <div key={client.id} className="grid grid-cols-3 gap-6 p-6 items-center hover:bg-gray-50 transition relative">
                      <div className="flex items-center gap-4">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="w-20 h-20 object-contain"
                        />
                        <span className="text-sm font-medium text-gray-900">{client.name}</span>
                      </div>

                      <div>
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            client.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {client.status === 'published' && <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />}
                          {client.status?.charAt(0).toUpperCase() + client.status?.slice(1)}
                        </span>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => setClientAction(clientAction === client.id ? null : client.id)}
                          className="p-1 hover:bg-gray-200 rounded transition"
                        >
                          <MoreVertical size={18} className="text-gray-500" />
                        </button>

                        {clientAction === client.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                              Publish Client
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                              Edit Client
                            </button>
                            <button
                              onClick={() => {
                                setClients(clients.filter(c => c.id !== client.id));
                                setClientAction(null);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                            >
                              Delete Client
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-6 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button
                      disabled
                      className="p-2 hover:bg-gray-100 rounded disabled:text-gray-300"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      disabled
                      className="p-2 hover:bg-gray-100 rounded disabled:text-gray-300"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Showing 1 of 10 Results</p>
                </div>
              </div>
            </div>
          )}

          {/* Experience Page */}
          {currentPage === 'experience' && (
            <div className="p-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Experience</h2>
                <p className="text-gray-500">Manage your experience</p>
              </div>
              <div className="text-center text-gray-500">Content coming soon</div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        {isAuthenticated && currentPage !== 'login' && (
          <div className="border-t border-gray-200 bg-white px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => navigatePage('prev')}
              disabled={!canNavigatePrev()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-lg transition"
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            <div className="text-sm text-gray-600">
              {NAVIGATION.find(nav => nav.key === currentPage)?.label}
            </div>

            <button
              onClick={() => navigatePage('next')}
              disabled={!canNavigateNext()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-lg transition"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        )}
        </main>
      </div>

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center pt-8 pb-8">
            <div className="bg-white rounded-lg w-full max-w-3xl">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Add Project</h2>
                <button
                  onClick={() => {
                    setShowAddProject(false);
                    setForm(INITIAL_FORM);
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">Lorem ipsum text</p>
                  </div>
                  <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition">
                    Save
                  </button>
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Info</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Wepay"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Improved onboarding experience for new users"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Thumbnail</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition">
                      <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG or PDF max 900x600</p>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Project Info</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div></div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <input
                      type="text"
                      value={form.clientName}
                      onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                      placeholder="Alexander R."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website (optional)</label>
                    <div className="flex gap-2">
                      <span className="flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600">Input /</span>
                      <input
                        type="text"
                        value={form.input}
                        onChange={(e) => setForm({ ...form, input: e.target.value })}
                        placeholder="Website link"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={form.serviceInput}
                        onChange={(e) => setForm({ ...form, serviceInput: e.target.value })}
                        placeholder="Add service tag"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          if (form.serviceInput.trim()) {
                            setForm({
                              ...form,
                              service: [...form.service, form.serviceInput],
                              serviceInput: '',
                            });
                          }
                        }}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {form.service.map((svc, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                        >
                          {svc}
                          <button
                            onClick={() => setForm({
                              ...form,
                              service: form.service.filter((_, i) => i !== idx),
                            })}
                            className="hover:text-blue-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Detail */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Project Detail</h3>

                  {form.tiers.map((tier, tierIdx) => (
                    <div key={tierIdx} className="border border-gray-200 rounded-lg p-4">
                      <div className="mb-3">
                        <input
                          type="text"
                          value={tier.title}
                          onChange={(e) => {
                            const newTiers = [...form.tiers];
                            newTiers[tierIdx].title = e.target.value;
                            setForm({ ...form, tiers: newTiers });
                          }}
                          placeholder="Tier Title"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        />
                      </div>
                      <textarea
                        value={tier.description}
                        onChange={(e) => {
                          const newTiers = [...form.tiers];
                          newTiers[tierIdx].description = e.target.value;
                          setForm({ ...form, tiers: newTiers });
                        }}
                        placeholder="Description"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>

                {/* Project Photos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Project Photos</h3>

                  {form.photos.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {form.photos.map((photo, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={photo}
                            alt={`Photo ${idx + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => setForm({
                              ...form,
                              photos: form.photos.filter((_, i) => i !== idx),
                            })}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition">
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG or PDF max 900x600</p>
                  </div>
                </div>

                {/* Project Testimonials */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Project Testimonials (optional)</h3>

                  {form.testimonials.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {form.testimonials.map((testimonial, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {testimonial.image && (
                              <img
                                src={testimonial.image}
                                alt={testimonial.fullName}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{testimonial.fullName}</p>
                              <p className="text-sm text-gray-600">{testimonial.role}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setForm({
                              ...form,
                              testimonials: form.testimonials.filter((_, i) => i !== idx),
                            })}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <input
                      type="text"
                      value={form.currentTestimonial.fullName || ''}
                      onChange={(e) => setForm({
                        ...form,
                        currentTestimonial: { ...form.currentTestimonial, fullName: e.target.value },
                      })}
                      placeholder="Full Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={form.currentTestimonial.role || ''}
                      onChange={(e) => setForm({
                        ...form,
                        currentTestimonial: { ...form.currentTestimonial, role: e.target.value },
                      })}
                      placeholder="Role"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      value={form.currentTestimonial.description || ''}
                      onChange={(e) => setForm({
                        ...form,
                        currentTestimonial: { ...form.currentTestimonial, description: e.target.value },
                      })}
                      placeholder="Testimonial Description"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => {
                        if (form.currentTestimonial.fullName && form.currentTestimonial.description) {
                          setForm({
                            ...form,
                            testimonials: [...form.testimonials, form.currentTestimonial as Testimonial],
                            currentTestimonial: {},
                          });
                        }
                      }}
                      className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition"
                    >
                      Add Testimonial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

      {/* Add Testimonial Modal */}
      {showAddTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center pt-8 pb-8">
            <div className="bg-white rounded-lg w-full max-w-5xl">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Add Testimonial</h2>
                <button
                  onClick={() => {
                    setShowAddTestimonial(false);
                    setNewTestimonial({
                      fullName: '',
                      role: '',
                      description: '',
                      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
                      status: 'draft',
                    });
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <div className="p-8 flex gap-8">
                {/* Left Section - Form */}
                <div className="flex-1 space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Testimonial</h3>

                  {/* Profile Image Upload */}
                  <div className="flex flex-col items-center">
                    <img
                      src={newTestimonial.image}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                        <Upload size={18} />
                        Replace
                      </button>
                      <button
                        onClick={() => setNewTestimonial({ ...newTestimonial, image: '' })}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={newTestimonial.fullName}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, fullName: e.target.value })}
                      placeholder="See what other have to say"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      placeholder="See what other have to say"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Testimonial Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Description</label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 border-b border-gray-300 p-3 flex items-center gap-1 flex-wrap">
                        <button className="p-1 hover:bg-gray-200 rounded" title="Bold">
                          <span className="font-bold text-sm">B</span>
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded italic text-sm">I</button>
                        <button className="p-1 hover:bg-gray-200 rounded underline text-sm">U</button>
                        <button className="p-1 hover:bg-gray-200 rounded line-through text-sm">S</button>
                        <div className="w-px h-6 bg-gray-300 mx-1"></div>
                        <button className="p-1 hover:bg-gray-200 rounded text-sm">≡</button>
                        <button className="p-1 hover:bg-gray-200 rounded text-sm">≡</button>
                        <button className="p-1 hover:bg-gray-200 rounded text-sm">≡</button>
                        <button className="p-1 hover:bg-gray-200 rounded text-sm">≡</button>
                        <div className="w-px h-6 bg-gray-300 mx-1"></div>
                        <button className="p-1 hover:bg-gray-200 rounded text-sm">...</button>
                        <button className="p-1 hover:bg-gray-200 rounded text-sm">&lt;/&gt;</button>
                      </div>
                      <textarea
                        value={newTestimonial.description}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, description: e.target.value })}
                        placeholder="Input Text"
                        rows={6}
                        className="w-full px-4 py-3 border-0 focus:ring-0 focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Section - Preview */}
                <div className="w-80">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">What my clients say</h3>

                  {/* Testimonial Card */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <p className="text-gray-700 italic text-center mb-6">
                      "{newTestimonial.description || 'Your testimonial will appear here'}"
                    </p>

                    <div className="flex flex-col items-center">
                      {newTestimonial.image && (
                        <img
                          src={newTestimonial.image}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover mb-3"
                        />
                      )}
                      <h4 className="font-semibold text-gray-900 text-center">{newTestimonial.fullName || 'Full Name'}</h4>
                      <p className="text-sm text-gray-500 text-center">{newTestimonial.role || 'Role'}</p>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex justify-center gap-4 mb-8">
                    <button
                      onClick={() => setCurrentTestimonialPreview(Math.max(0, currentTestimonialPreview - 1))}
                      disabled={currentTestimonialPreview === 0}
                      className="p-2 text-gray-400 disabled:opacity-50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentTestimonialPreview(currentTestimonialPreview + 1)}
                      className="p-2 text-gray-400"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={() => {
                      if (newTestimonial.fullName && newTestimonial.description) {
                        setTestimonials([
                          ...testimonials,
                          {
                            id: Math.max(...testimonials.map(t => t.id || 0)) + 1,
                            ...newTestimonial,
                          },
                        ]);
                        setShowAddTestimonial(false);
                        setNewTestimonial({
                          fullName: '',
                          role: '',
                          description: '',
                          image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
                          status: 'draft',
                        });
                      }
                    }}
                    className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-8">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Add Client</h2>
                <button
                  onClick={() => {
                    setShowAddClient(false);
                    setNewClient({ name: '', logo: '', status: 'draft' });
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Client Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition">
                    {newClient.logo ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={newClient.logo}
                          alt="Logo"
                          className="w-24 h-24 object-contain mb-3"
                        />
                        <button
                          onClick={() => setNewClient({ ...newClient, logo: '' })}
                          className="text-sm text-blue-500 hover:text-blue-600"
                        >
                          Change Logo
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG or SVG max 2MB</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Client Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    placeholder="Enter client name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={() => {
                    if (newClient.name && newClient.logo) {
                      setClients([
                        ...clients,
                        {
                          id: Math.max(...clients.map(c => c.id || 0)) + 1,
                          ...newClient,
                        },
                      ]);
                      setShowAddClient(false);
                      setNewClient({ name: '', logo: '', status: 'draft' });
                    }
                  }}
                  className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
