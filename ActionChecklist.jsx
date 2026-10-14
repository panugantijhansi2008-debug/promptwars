import React, { useState } from 'react';
import { CheckSquare, Square, CheckCircle, AlertCircle, Phone, FileText, BellRing } from 'lucide-react';

export default function ActionChecklist({ scenario }) {
  const [checklist, setChecklist] = useState(scenario.actionChecklist);

  const toggleItem = (id) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  const completedCount = checklist.filter(i => i.done).length;
  const totalCount = checklist.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title-group">
            <CheckSquare size={22} color="#059669" />
            <h3 className="card-title">Manual Action Checklist for Traveler</h3>
          </div>
          <div className="card-subtitle">
            Safety Rule: This assistant never makes automated bookings or calls. You must perform these urgent recovery steps.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-700)' }}>
            {completedCount} of {totalCount} completed ({progressPercent}%)
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '6px',
        background: 'var(--slate-200)',
        borderRadius: '999px',
        overflow: 'hidden',
        marginBottom: '1.25rem'
      }}>
        <div style={{
          width: `${progressPercent}%`,
          height: '100%',
          background: progressPercent === 100 ? 'var(--emerald-600)' : 'var(--primary)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Checklist items */}
      <div className="checklist-container">
        {checklist.map((item) => (
          <div
            key={item.id}
            className={`checklist-item ${item.done ? 'done' : ''}`}
            onClick={() => toggleItem(item.id)}
          >
            <div className="checklist-checkbox">
              {item.done ? <CheckCircle size={16} /> : <Square size={16} color="#94a3b8" />}
            </div>

            <div className="checklist-content">
              <div className="checklist-title-row">
                <span className="checklist-task-name">{item.task}</span>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  background: item.priority.includes('URGENT') ? '#fee2e2' : '#f1f5f9',
                  color: item.priority.includes('URGENT') ? '#b91c1c' : '#475569'
                }}>
                  {item.priority}
                </span>
              </div>
              <div className="checklist-instruction">
                {item.instruction}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '1.25rem',
        padding: '0.75rem 1rem',
        background: '#fffbeb',
        border: '1px solid #fef3c7',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.8rem',
        color: '#92400e',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <BellRing size={16} style={{ flexShrink: 0 }} />
        <span>
          <strong>Pro-tip for PromptWars:</strong> Never accept generic delay vouchers from airlines when a flight is cancelled. Under DGCA Passenger Charter rules, you are entitled to an immediate 100% money refund to original payment mode!
        </span>
      </div>
    </div>
  );
}
