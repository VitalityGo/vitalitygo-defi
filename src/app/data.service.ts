import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'; // Cambiado a @capacitor/preferences

@Injectable({ providedIn: 'root' })
export class DataService {
  private storageKey = 'vitalityUserData';

  private data = {
    steps: 0,
    waterIntake: 0,
    weightData: [] as number[],
    profile: {
      name: '',
      weight: 0,
      age: 0,
      height: 0,
      bodyFatPercentage: 0,
      bmi: 0,
    }
  };

  constructor() {
    this.loadData();
  }

  // Cargar datos usando Preferences
  async loadData() {
    const result = await Preferences.get({ key: this.storageKey }); // Usar Preferences.get()
    if (result.value) {
      this.data = JSON.parse(result.value);
    }
  }

  // Guardar datos usando Preferences
  private async save() {
    await Preferences.set({ key: this.storageKey, value: JSON.stringify(this.data) }); // Usar Preferences.set()
  }

  // Steps
  getSteps() { return this.data.steps; }
  async setSteps(val: number) { this.data.steps = val; await this.save(); }

  // Agua
  getWaterIntake() { return this.data.waterIntake; }
  async setWaterIntake(val: number) { this.data.waterIntake = val; await this.save(); }

  // Peso
  getWeightData() { return this.data.weightData; }
  async addWeight(val: number) { this.data.weightData.push(val); await this.save(); }

  // Perfil
  getProfile() { return this.data.profile; }
  async setProfile(profile: Partial<typeof this.data.profile>) {
    this.data.profile = { ...this.data.profile, ...profile };
    await this.save();
  }
}
