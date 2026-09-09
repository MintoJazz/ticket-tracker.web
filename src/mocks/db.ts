import type { User, Workspace, Ticket, Worklog } from '../types';

const STORAGE_KEY = 'msw-ticket-tracker-db';

interface DatabaseSchema {
  users: User[];
  workspaces: Workspace[];
  tickets: Ticket[];
  worklogs: Worklog[];
}

const defaultData: DatabaseSchema = {
  users: [
    {
      id: 'u-1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      created_at: new Date().toISOString(),
    },
    {
      id: 'u-2',
      name: 'Tech User',
      email: 'tech@example.com',
      role: 'tech',
      created_at: new Date().toISOString(),
    }
  ],
  workspaces: [
    {
      id: 'w-1',
      name: 'General Workspace',
      description: 'Default workspace for issues',
      created_at: new Date().toISOString(),
    }
  ],
  tickets: [
    {
      id: 't-1',
      workspace_id: 'w-1',
      title: 'Fix login button',
      description: 'The login button is not aligned properly on mobile.',
      status: 'open',
      priority: 'medium',
      reporter_id: 'u-1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  worklogs: [],
};

class Database {
  users: User[] = [];
  workspaces: Workspace[] = [];
  tickets: Ticket[] = [];
  worklogs: Worklog[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: DatabaseSchema = JSON.parse(stored);
        this.users = parsed.users || defaultData.users;
        this.workspaces = parsed.workspaces || defaultData.workspaces;
        this.tickets = parsed.tickets || defaultData.tickets;
        this.worklogs = parsed.worklogs || defaultData.worklogs;
      } else {
        this.resetToDefault();
      }
    } catch (e) {
      console.error('Error loading DB from localStorage', e);
      this.resetToDefault();
    }
  }

  save() {
    const data: DatabaseSchema = {
      users: this.users,
      workspaces: this.workspaces,
      tickets: this.tickets,
      worklogs: this.worklogs,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  resetToDefault() {
    this.users = [...defaultData.users];
    this.workspaces = [...defaultData.workspaces];
    this.tickets = [...defaultData.tickets];
    this.worklogs = [...defaultData.worklogs];
    this.save();
  }
}

export const db = new Database();
