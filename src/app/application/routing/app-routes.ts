export const appRoutes = {
  loginModule: {
    module: 'loginModule',
    login: { path: 'login', label: '' },
  },
  dashboardModule: {
    module: 'dashboardModule',
    dashboard: { path: 'dashboard', label: '' },
    home: { path: 'home', label: 'Tableau de Bord' },
    data: { path: 'data', label: 'Donnée' },
    data_detail: { path: 'data_detail', label: 'Donnée' },
  },
  profil: { path: 'profil', label: 'Profil utilisateur' },
  user_password: { path: 'user_password', label: 'Mot de passe utilisateur' },
  users: { path: 'users', label: 'Utilisateurs' },
  roles: { path: 'roles', label: 'Rôles' },
  permissions: { path: 'permissions', label: 'Permissions' },
  permissions_role: { path: 'permission-role', label: 'Rôles & Permissions' },
  permissions_user: { path: 'permission-user', label: 'Utilisateurs & Permissions' },
  roles_user: { path: 'role-user', label: 'Utilisateurs & Rôles' },
};