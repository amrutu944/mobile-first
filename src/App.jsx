import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';

import { initialTasks } from './data/sampleTasks';
import { useLocalStorage } from './hooks/useLocalStorage';

import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function App() {
  // 1. Data persistence via custom hook
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', initialTasks);

  // 2. UI & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // 3. Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 4. Derived Statistics (Dynamically calculated from task dataset)
  const totalTasks = tasks.length;
  const todoCount = useMemo(() => tasks.filter(t => t.status === 'To do').length, [tasks]);
  const inProgressCount = useMemo(() => tasks.filter(t => t.status === 'In progress').length, [tasks]);
  const completedCount = useMemo(() => tasks.filter(t => t.status === 'Completed').length, [tasks]);

  const completionPercentage = useMemo(() => {
    if (totalTasks === 0) return 0;
    return Math.round((completedCount / totalTasks) * 100);
  }, [completedCount, totalTasks]);

  // 5. Combined Search & Multi-Filter Logic
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search filter (case-insensitive across title and description)
      const matchesSearch = searchQuery.trim() === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase().trim()));

      // Status filter
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;

      // Priority filter
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

      // Category filter
      const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, categoryFilter]);

  const isFiltered = searchQuery !== '' || statusFilter !== 'All' || priorityFilter !== 'All' || categoryFilter !== 'All';

  // 6. CRUD Handlers
  const handleOpenAddTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (taskData) => {
    if (editingTask && editingTask.id) {
      // UPDATE operation: preserve unique ID
      setTasks(prev => prev.map(t => 
        t.id === editingTask.id ? { ...taskData, id: editingTask.id } : t
      ));
    } else {
      // CREATE operation: generate unique sequential / timestamp ID
      const newId = `TASK-${Date.now().toString().slice(-4)}`;
      const newTask = {
        ...taskData,
        id: newId
      };
      setTasks(prev => [newTask, ...prev]);
    }
  };

  const handleDeleteConfirm = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    ));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header 
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenAddTask={handleOpenAddTask}
        />

        <main className="dashboard-content" role="main">
          {/* Section 1: Dynamic Statistics Cards */}
          <section className="stats-grid" aria-label="Task Statistics">
            <StatCard 
              title="Total Tasks" 
              value={totalTasks} 
              icon={CheckSquare} 
              color="blue"
              subtitle="All active and logged tasks"
            />
            <StatCard 
              title="In Progress" 
              value={inProgressCount} 
              icon={Clock} 
              color="amber"
              subtitle="Tasks currently underway"
            />
            <StatCard 
              title="Completed" 
              value={completedCount} 
              icon={CheckCircle2} 
              color="emerald"
              subtitle="Accomplished goals"
            />
            <StatCard 
              title="Completion Rate" 
              value={`${completionPercentage}%`} 
              icon={TrendingUp} 
              color="indigo"
              progress={completionPercentage}
            />
          </section>

          {/* Section 2: Focus Notes Carousel */}
          <FocusNotes />

          {/* Section 3: Search, Filters & Task Controls */}
          <section className="tasks-section" aria-label="Tasks Management">
            <div className="tasks-section-header">
              <div className="tasks-section-title-wrap">
                <div className="section-title-row">
                  <Layers size={18} className="section-title-icon" />
                  <h2 className="section-title">Tasks Directory</h2>
                  <span className="tasks-count-pill">{filteredTasks.length} visible</span>
                </div>
                <p className="section-desc">Search, filter, and manage tasks by status and priority.</p>
              </div>

              {/* Search Bar */}
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Filter Tabs & Selectors */}
            <FilterTabs 
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityChange={setPriorityFilter}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              taskCounts={{
                all: totalTasks,
                todo: todoCount,
                inProgress: inProgressCount,
                completed: completedCount
              }}
              onResetFilters={handleResetFilters}
              isFiltered={isFiltered}
            />

            {/* Task Cards Grid */}
            <TaskList 
              tasks={filteredTasks}
              onEdit={handleOpenEditTask}
              onDelete={setDeletingTask}
              onStatusChange={handleStatusChange}
              onOpenAddTask={handleOpenAddTask}
              onResetFilters={handleResetFilters}
              isFiltered={isFiltered}
            />
          </section>
        </main>
      </div>

      {/* Task Create / Edit Modal */}
      <TaskForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialTask={editingTask}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmModal 
        isOpen={Boolean(deletingTask)}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteConfirm}
        task={deletingTask}
      />
    </div>
  );
}
