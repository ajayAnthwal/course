import mongoose, { Schema, Document } from "mongoose";

export interface IPermission {
  resource: string;
  actions: string[];
}

export interface IRole extends Document {
  name: string;
  description: string;
  permissions: IPermission[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema = new Schema<IPermission>({
  resource: { type: String, required: true },
  actions: [{ type: String }],
});

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    permissions: [PermissionSchema],
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IRole>("Role", RoleSchema);