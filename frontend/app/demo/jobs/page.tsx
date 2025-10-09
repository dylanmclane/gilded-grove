'use client';

import { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Trash2
} from 'lucide-react';

type JobStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

type Job = {
  id: number;
  title: string;
  description: string;
  property: string;
  location: string;
  status: JobStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
};

const initialJobs: Job[] = [
  {
    id: 1,
    title: "Estate Appraisal",
    description: "Complete professional appraisal of Greenwood Estate for insurance purposes",
    property: "Greenwood Estate",
    location: "Napa Valley, CA",
    status: "completed",
    priority: "high",
    dueDate: "2024-01-15",
    assignedTo: "Smith & Associates",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Security System Installation",
    description: "Install comprehensive security system including cameras and access control",
    property: "Greenwood Estate",
    location: "Napa Valley, CA",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-02-28",
    assignedTo: "SecureTech Solutions",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-20"
  },
  {
    id: 3,
    title: "Landscaping Maintenance",
    description: "Monthly landscaping and garden maintenance",
    property: "Greenwood Estate",
    location: "Napa Valley, CA",
    status: "pending",
    priority: "medium",
    dueDate: "2024-02-01",
    assignedTo: "Garden Masters",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  }
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  'in-progress': "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200"
};

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-orange-100 text-orange-800",
  high: "bg-red-100 text-red-800"
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Job>>({});
  const [filter, setFilter] = useState<JobStatus | 'all'>('all');

  const filteredJobs = filter === 'all' 
    ? jobs 
    : jobs.filter(job => job.status === filter);

  function handleSaveJob(e: React.FormEvent) {
    e.preventDefault();
    if (form.title && form.property && form.dueDate) {
      const newJob: Job = {
        id: Date.now(),
        title: form.title,
        description: form.description || '',
        property: form.property,
        location: form.location || '',
        status: form.status || 'pending',
        priority: form.priority || 'medium',
        dueDate: form.dueDate,
        assignedTo: form.assignedTo || '',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setJobs([...jobs, newJob]);
      setShowForm(false);
      setForm({});
    }
  }

  function updateJobStatus(jobId: number, newStatus: JobStatus) {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : job
    ));
  }

  function deleteJob(jobId: number) {
    setJobs(jobs.filter(job => job.id !== jobId));
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] pt-16 lg:pt-0">
      <div className="flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-6xl">
          <header className="mb-8 text-center flex flex-col items-center">
            <h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900 mb-2">Job Tracking</h1>
            <p className="text-gray-500 text-lg">Manage and track jobs for your properties and estates.</p>
          </header>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'all' 
                    ? 'bg-[#d4af37] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All Jobs
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'pending' 
                    ? 'bg-[#d4af37] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('in-progress')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'in-progress' 
                    ? 'bg-[#d4af37] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'completed' 
                    ? 'bg-[#d4af37] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Completed
              </button>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-white rounded-lg font-medium hover:bg-[#b8941f] transition"
            >
              <Plus className="w-4 h-4" />
              Add Job
            </button>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateJobStatus(job.id, 'completed')}
                      className="text-green-600 hover:text-green-800"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{job.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{job.property}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Due: {job.dueDate}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{job.assignedTo}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[job.status]}`}>
                    {job.status.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[job.priority]}`}>
                    {job.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No jobs found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Job Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <form onSubmit={handleSaveJob} className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={form.title || ''}
                    onChange={(e) => setForm({...form, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={form.description || ''}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
                  <input
                    type="text"
                    value={form.property || ''}
                    onChange={(e) => setForm({...form, property: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location || ''}
                    onChange={(e) => setForm({...form, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={form.dueDate || ''}
                    onChange={(e) => setForm({...form, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <input
                    type="text"
                    value={form.assignedTo || ''}
                    onChange={(e) => setForm({...form, assignedTo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={form.priority || 'medium'}
                      onChange={(e) => setForm({...form, priority: e.target.value as 'low' | 'medium' | 'high'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={form.status || 'pending'}
                      onChange={(e) => setForm({...form, status: e.target.value as JobStatus})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#d4af37] text-white rounded-lg hover:bg-[#b8941f] transition"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
