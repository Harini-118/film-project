// models/Tenant.js
import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      unique: true,
    },
    whatsappConfig: {
      businessAccountId: String,
      accessToken: String,
      phoneNumberId: String,
      webhookToken: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tenant = mongoose.model('Tenant', tenantSchema);

export default Tenant;
