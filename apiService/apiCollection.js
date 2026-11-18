// api/apiCollection.js
import { apiService } from "./apiService";

export const apiCollection = {
  // Generic HTTP shortcuts
  get: (url, config) => apiService.get(url, config),
  post: (url, data, config) => apiService.post(url, data, config),
  put: (url, data, config) => apiService.put(url, data, config),
  delete: (url, config) => apiService.delete(url, config),

  // ==========================================
  // AUTH, USERS & HIERARCHY
  // ==========================================
  login: (credentials) => apiService.post("/api/auth/login", credentials),
  logout: () => apiService.post("/api/auth/logout"),
  getProfile: () => apiService.get("/api/auth/profile"),

  getUsers: () => apiService.get("/api/users"),
  createUser: (userData) => apiService.post("/api/users", userData),
  updateUser: (id, userData) => apiService.put(`/api/users/${id}`, userData),
  deleteUser: (id) => apiService.delete(`/api/users/${id}`),

  // ==========================================
  // HIERARCHICAL RBAC, TEAMS & VILLAS
  // ==========================================
  getVillas: (params = {}) => apiService.get("/api/villas", { params }),
  getVillaById: (id) => apiService.get(`/api/villas/${id}`),
  createVilla: (data) => apiService.post("/api/villas", data),
  updateVilla: (id, data) => apiService.put(`/api/villas/${id}`, data),
  deleteVilla: (id) => apiService.delete(`/api/villas/${id}`),

  getTeamMembers: (params = {}) => apiService.get("/api/team", { params }),
  createTeamMember: (data) => apiService.post("/api/team", data),
  updateTeamMember: (id, data) => apiService.put(`/api/team/${id}`, data),
  deleteTeamMember: (id) => apiService.delete(`/api/team/${id}`),

  getVillaStaff: (villaId, params = {}) => apiService.get(`/api/villas/${villaId}/staff`, { params }),
  createVillaStaff: (villaId, data) => apiService.post(`/api/villas/${villaId}/staff`, data),
  updateVillaStaff: (villaId, staffId, data) => apiService.put(`/api/villas/${villaId}/staff/${staffId}`, data),
  deleteVillaStaff: (villaId, staffId) => apiService.delete(`/api/villas/${villaId}/staff/${staffId}`),
  updateUserPermissions: (userId, permissions) => apiService.put(`/api/users/${userId}/permissions`, { permissions }),

  
  // ==========================================
  // DYNAMIC SIDEBAR MENU BUILDER
  // ==========================================
  getMenu: () => apiService.get("/api/menus"),
  getMenus: (fetchAll = false) => apiService.get(fetchAll ? "/api/menus?all=true" : "/api/menus"),
  createMenu: (data) => apiService.post("/api/menus", data),
  updateMenu: (id, data) => apiService.put(`/api/menus/${id}`, data),
  deleteMenu: (id) => apiService.delete(`/api/menus/${id}`),

  // ==========================================
  // DASHBOARD STATS & METRICS (Role & Villa Scoped)
  // ==========================================
  getDashboardStats: (params = {}) => apiService.get("/api/dashboard/stats", { params }),
  getVillaLedger: (params = {}) => apiService.get("/api/dashboard/ledger", { params }),
  logExpense: (data) => apiService.post("/api/dashboard/expenses", data),

  // ==========================================
  // ACTIVITY & AUDIT LOGS
  // ==========================================
  getAuditLogs: () => apiService.get("/api/audit/logs"),
  getActivityLogs: () => apiService.get("/api/audit/logs"),
  createAuditLog: (data) => apiService.post("/api/audit/logs", data),
  createActivityLog: (data) => apiService.post("/api/audit/logs", data),

  // ==========================================
  // AI CHATBOT & ENQUIRIES
  // ==========================================
  sendAiChat: (data) => apiService.post("/api/chat", data),
};