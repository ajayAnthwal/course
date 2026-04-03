import Settings, { ISettings } from "../model/settings.model";
import AppError from "../../../utils/appError";

class SettingsService {
  async getSetting(key: string): Promise<any> {
    const setting = await Settings.findOne({ key });
    return setting?.value;
  }

  async getAllSettings(): Promise<ISettings[]> {
    return Settings.find().sort({ category: 1, key: 1 });
  }

  async getSettingsByCategory(category: string): Promise<ISettings[]> {
    return Settings.find({ category }).sort({ key: 1 });
  }

  async setSetting(key: string, value: any, category?: string, description?: string): Promise<ISettings> {
    const setting = await Settings.findOneAndUpdate(
      { key },
      { value, category: category || "general", description, $setOnInsert: { category, description } },
      { upsert: true, new: true }
    );
    return setting;
  }

  async deleteSetting(key: string): Promise<void> {
    const result = await Settings.deleteOne({ key });
    if (result.deletedCount === 0) {
      throw new AppError("Setting not found", 404);
    }
  }

  async getPublicSettings(): Promise<Record<string, any>> {
    const settings = await Settings.find({ isPublic: true });
    const publicSettings: Record<string, any> = {};
    settings.forEach((s) => {
      publicSettings[s.key] = s.value;
    });
    return publicSettings;
  }
}

export default new SettingsService();