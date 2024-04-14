"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseUploadProviderSetupConfig = void 0;
const supabase_upload_provider_1 = require("./supabase-upload.provider");
exports.supabaseUploadProviderSetupConfig = {
    provider: supabase_upload_provider_1.SupabaseUploadProvider.provider,
    name: supabase_upload_provider_1.SupabaseUploadProvider.name,
    auth: supabase_upload_provider_1.SupabaseUploadProvider.auth,
    init: supabase_upload_provider_1.SupabaseUploadProvider.init
};
