const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

function getToken() {
  return localStorage.getItem('et_token');
}

async function request(method, path, body) {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
  return data;
}

export const api = {
  // Auth
  login: (email, password) => request('POST', '/auth/login', { email, password }),
  register: (data) => request('POST', '/auth/register', data),
  me: () => request('GET', '/auth/me'),
  changePassword: (data) => request('POST', '/auth/change-password', data),

  // Tasks
  getTasks: (params = {}) => request('GET', `/tasks?${new URLSearchParams(params)}`),
  getTaskStats: () => request('GET', '/tasks/stats'),
  getTask: (id) => request('GET', `/tasks/${id}`),
  createTask: (data) => request('POST', '/tasks', data),
  updateTask: (id, data) => request('PATCH', `/tasks/${id}`, data),
  deleteTask: (id) => request('DELETE', `/tasks/${id}`),
  addComment: (taskId, content) => request('POST', `/tasks/${taskId}/comments`, { content }),

  // Users
  getUsers: (params = {}) => request('GET', `/users?${new URLSearchParams(params)}`),
  getStaff: () => request('GET', '/users/staff'),
  getClients: () => request('GET', '/users/clients'),
  createUser: (data) => request('POST', '/users', data),
  updateUser: (id, data) => request('PATCH', `/users/${id}`, data),
  assignStaff: (clientUserId, data) => request('PATCH', `/users/${clientUserId}/assign`, data),

  // Clients
  getAllClients: () => request('GET', '/clients'),
  getClientProfile: () => request('GET', '/clients/me/profile'),
  getClient: (id) => request('GET', `/clients/${id}`),

  // Workflows
  getWorkflows: () => request('GET', '/workflows'),
  startWorkflow: (type, clientId) => request('POST', '/workflows/start', { type, clientId }),
  completeStep: (workflowId, stepId) => request('PATCH', `/workflows/${workflowId}/steps/${stepId}`),

  // Notifications
  getNotifications: () => request('GET', '/notifications'),
  markRead: (id) => request('PATCH', `/notifications/${id}/read`),
  markAllRead: () => request('POST', '/notifications/read-all'),

  // Folders
  getFolders: (params = {}) => request('GET', `/folders?${new URLSearchParams(params)}`),
  getFolderContents: (folderId, params = {}) => request('GET', `/folders/${folderId}/contents?${new URLSearchParams(params)}`),
  createFolder: (data) => request('POST', '/folders', data),
  renameFolder: (id, name) => request('PATCH', `/folders/${id}`, { name }),
  moveFolder: (id, parentId) => request('PATCH', `/folders/${id}`, { parentId }),
  deleteFolder: (id) => request('DELETE', `/folders/${id}`),

  // Documents
  getDocuments: (params = {}) => request('GET', `/documents?${new URLSearchParams(params)}`),
  getDocumentUrl: (id) => request('GET', `/documents/${id}/url`),
  renameDocument: (id, name) => request('PATCH', `/documents/${id}`, { name }),
  moveDocument: (id, folderId) => request('PATCH', `/documents/${id}`, { folderId: folderId ?? null }),
  deleteDocument: (id) => request('DELETE', `/documents/${id}`),
  uploadDocument: (formData) => {
    const token = getToken();
    return fetch(`${BASE}/documents/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then(async r => {
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
      return data;
    });
  },
};

export function saveToken(token) {
  localStorage.setItem('et_token', token);
}

export function clearToken() {
  localStorage.removeItem('et_token');
}
