import React, { useState } from 'react';
import { Plus, MoreHorizontal, Clock, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { Card, Button, Badge, Modal, Input, Label } from './ui';

interface Task {
  id: string;
  title: string;
  tag: string;
  tagColor: 'bg-neo-blue' | 'bg-neo-yellow' | 'bg-neo-pink' | 'bg-neo-green';
  dueDate: string;
  assignee: string;
}

interface Column {
  id: 'todo' | 'progress' | 'done';
  title: string;
  color: string;
  tasks: Task[];
}

const initialData: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-neo-yellow',
    tasks: [
      { id: 't1', title: 'Design System Audit', tag: 'Design', tagColor: 'bg-neo-pink', dueDate: 'Tomorrow', assignee: 'JD' },
      { id: 't2', title: 'Q3 Marketing Plan', tag: 'Marketing', tagColor: 'bg-neo-green', dueDate: 'Sep 12', assignee: 'AL' },
    ]
  },
  {
    id: 'progress',
    title: 'In Progress',
    color: 'bg-neo-blue',
    tasks: [
      { id: 't3', title: 'Fix API Rate Limiting', tag: 'Dev', tagColor: 'bg-neo-blue', dueDate: 'Today', assignee: 'JD' },
      { id: 't4', title: 'Client Onboarding', tag: 'Sales', tagColor: 'bg-neo-yellow', dueDate: 'Sep 15', assignee: 'MK' },
      { id: 't5', title: 'Update Documentation', tag: 'Docs', tagColor: 'bg-neo-pink', dueDate: 'Sep 10', assignee: 'JD' },
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-neo-green',
    tasks: [
      { id: 't6', title: 'Weekly Analytics Report', tag: 'Data', tagColor: 'bg-neo-blue', dueDate: 'Yesterday', assignee: 'AL' },
    ]
  }
];

export const KanbanPage: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialData);

  // Simplified "Move" function to simulate drag and drop behavior
  const moveTask = (taskId: string, sourceColId: string, targetColId: string) => {
    const sourceCol = columns.find(c => c.id === sourceColId);
    const targetCol = columns.find(c => c.id === targetColId);
    if (!sourceCol || !targetCol) return;

    const task = sourceCol.tasks.find(t => t.id === taskId);
    if (!task) return;

    const newColumns = columns.map(col => {
      if (col.id === sourceColId) {
        return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
      }
      if (col.id === targetColId) {
        return { ...col, tasks: [...col.tasks, task] };
      }
      return col;
    });

    setColumns(newColumns);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed mb-6 flex-shrink-0">
        <div>
          <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Project Board</h1>
          <p className="text-neo-black font-mono text-sm mt-2 bg-neo-pink inline-block px-1">SPRINT 24 - AGILE VIEW</p>
        </div>
        <div className="flex gap-2">
          <div className="flex -space-x-2 mr-4">
             {['JD', 'AL', 'MK'].map((u, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-neo-black flex items-center justify-center text-xs font-bold bg-white relative hover:z-10`}>
                    {u}
                </div>
             ))}
             <button className="w-8 h-8 rounded-full border-2 border-neo-black bg-neo-black text-white flex items-center justify-center text-xs hover:bg-gray-800">
                 <Plus size={14} />
             </button>
          </div>
          <Button icon={Plus}>New Task</Button>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full gap-6 min-w-[1000px] pb-4">
          {columns.map((col) => (
            <div key={col.id} className="flex-1 flex flex-col h-full">
              {/* Column Header */}
              <div className={`p-4 border-2 border-neo-black border-b-0 flex justify-between items-center ${col.color}`}>
                <div className="flex items-center gap-2">
                   <h3 className="font-black uppercase tracking-wide">{col.title}</h3>
                   <span className="bg-neo-black text-white text-xs font-mono px-2 py-0.5 rounded-full">{col.tasks.length}</span>
                </div>
                <button className="hover:bg-black/10 p-1 rounded"><MoreHorizontal size={18} /></button>
              </div>
              
              {/* Column Body */}
              <div className="flex-1 bg-neo-bg border-2 border-neo-black p-4 overflow-y-auto space-y-4">
                 {col.tasks.map((task) => (
                   <div 
                    key={task.id} 
                    className="bg-white border-2 border-neo-black p-4 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all cursor-move group relative"
                   >
                      <div className="flex justify-between items-start mb-2">
                         <span className={`text-[10px] font-bold uppercase px-2 py-0.5 border-2 border-neo-black ${task.tagColor}`}>
                            {task.tag}
                         </span>
                         <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100">
                            <MoreHorizontal size={14} />
                         </button>
                      </div>
                      <h4 className="font-bold text-sm mb-3 leading-tight">{task.title}</h4>
                      <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                         <div className="flex items-center gap-1">
                            {parseInt(task.dueDate) < 12 ? <AlertCircle size={14} className="text-neo-red" /> : <Clock size={14} />}
                            {task.dueDate}
                         </div>
                         <div className="w-6 h-6 border-2 border-neo-black bg-gray-100 flex items-center justify-center font-bold text-neo-black text-[10px]">
                            {task.assignee}
                         </div>
                      </div>

                      {/* Simulation Controls for Demo */}
                      <div className="absolute inset-0 bg-white/90 hidden group-hover:flex items-center justify-center gap-2 z-10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                         {col.id !== 'todo' && (
                             <button onClick={() => moveTask(task.id, col.id, 'todo')} title="Move to Todo" className="p-1 border-2 border-neo-black bg-neo-yellow hover:scale-110 transition-transform"><Circle size={14}/></button>
                         )}
                         {col.id !== 'progress' && (
                             <button onClick={() => moveTask(task.id, col.id, 'progress')} title="Move to Progress" className="p-1 border-2 border-neo-black bg-neo-blue hover:scale-110 transition-transform"><Clock size={14}/></button>
                         )}
                         {col.id !== 'done' && (
                             <button onClick={() => moveTask(task.id, col.id, 'done')} title="Move to Done" className="p-1 border-2 border-neo-black bg-neo-green hover:scale-110 transition-transform"><CheckCircle2 size={14}/></button>
                         )}
                      </div>
                   </div>
                 ))}
                 
                 <button className="w-full py-3 border-2 border-dashed border-gray-400 text-gray-500 font-bold uppercase text-xs hover:border-neo-black hover:text-neo-black hover:bg-white transition-colors">
                    + Add Task
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};