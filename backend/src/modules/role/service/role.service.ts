import Role, { IRole } from "../model/role.model";
import AppError from "../../../utils/appError";

const DEFAULT_PERMISSIONS = {
  admin: [
    { resource: "users", actions: ["create", "read", "update", "delete"] },
    { resource: "colleges", actions: ["create", "read", "update", "delete"] },
    { resource: "leads", actions: ["create", "read", "update", "delete"] },
    { resource: "payments", actions: ["create", "read", "update", "delete"] },
    { resource: "notifications", actions: ["create", "read", "update", "delete"] },
    { resource: "analytics", actions: ["read"] },
    { resource: "settings", actions: ["read", "update"] },
  ],
  student: [
    { resource: "colleges", actions: ["read"] },
    { resource: "applications", actions: ["create", "read"] },
    { resource: "profile", actions: ["read", "update"] },
  ],
  teacher: [
    { resource: "courses", actions: ["read", "update"] },
    { resource: "students", actions: ["read"] },
    { resource: "profile", actions: ["read", "update"] },
  ],
  college: [
    { resource: "leads", actions: ["read", "update"] },
    { resource: "courses", actions: ["create", "read", "update"] },
    { resource: "profile", actions: ["read", "update"] },
  ],
  parent: [
    { resource: "students", actions: ["read"] },
    { resource: "applications", actions: ["read"] },
    { resource: "profile", actions: ["read", "update"] },
  ],
};

class RoleService {
  async initializeDefaultRoles(): Promise<void> {
    const roles = ["admin", "student", "teacher", "college", "parent"];
    
    for (const roleName of roles) {
      const existingRole = await Role.findOne({ name: roleName });
      if (!existingRole) {
        await Role.create({
          name: roleName,
          description: `Default ${roleName} role`,
          permissions: DEFAULT_PERMISSIONS[roleName as keyof typeof DEFAULT_PERMISSIONS] || [],
          isDefault: true,
        });
      }
    }
  }

  async getAllRoles(): Promise<IRole[]> {
    return Role.find().sort({ createdAt: -1 });
  }

  async getRoleById(id: string): Promise<IRole> {
    const role = await Role.findById(id);
    if (!role) throw new AppError("Role not found", 404);
    return role;
  }

  async createRole(data: { name: string; description: string; permissions: { resource: string; actions: string[] }[] }): Promise<IRole> {
    const existing = await Role.findOne({ name: data.name });
    if (existing) throw new AppError("Role already exists", 400);

    return Role.create(data);
  }

  async updateRole(id: string, data: Partial<{ name: string; description: string; permissions: { resource: string; actions: string[] }[] }>): Promise<IRole> {
    const role = await Role.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!role) throw new AppError("Role not found", 404);
    return role;
  }

  async deleteRole(id: string): Promise<void> {
    const role = await Role.findById(id);
    if (!role) throw new AppError("Role not found", 404);
    if (role.isDefault) throw new AppError("Cannot delete default role", 400);

    await Role.findByIdAndDelete(id);
  }

  hasPermission(userRole: IRole | null, resource: string, action: string): boolean {
    if (!userRole) return false;
    if (userRole.name === "admin") return true;

    const permission = userRole.permissions.find(p => p.resource === resource);
    return permission?.actions.includes(action) || false;
  }
}

export default new RoleService();