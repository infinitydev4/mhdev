/**
 * Énumération des rôles utilisateur
 * Hiérarchie: ADMIN > MODERATOR > USER
 */
export enum Role {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

/**
 * Hiérarchie des rôles pour vérification des permissions
 */
export const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.ADMIN]: 3,
  [Role.MODERATOR]: 2,
  [Role.USER]: 1,
};

/**
 * Vérifie si un rôle a un niveau supérieur ou égal à un autre
 */
export function hasRoleLevel(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
