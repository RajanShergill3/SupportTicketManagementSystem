/**
 * Mongoose User model.
 *
 * Defines schema-level constraints only. Business rules belong in the
 * service layer; domain input validation belongs in the User validator.
 */
import { Schema, model } from 'mongoose';

import { USER_ROLES } from '../constants/user-role.constants';
import { IUser } from '../types/user.types';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
      minlength: [1, 'name must be a non-empty string'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: [true, 'role is required'],
      enum: {
        values: USER_ROLES,
        message: 'role must be one of: Admin, Developer, QA',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserModel = model<IUser>('User', userSchema);
