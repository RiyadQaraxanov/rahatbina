
import { create } from 'zustand';

export type DeviceStatus = 'online' | 'offline' | 'maintenance' | 'error';

export type DeviceData = {
  motion?: boolean;
  blocking?: boolean;
  sound?: number;
  light?: number;
  battery?: number;
  lastHeartbeat?: Date;
};

export type Device = {
  id: string;
  name: string;
  type: string;
  parkingAreaId: string;
  location: {
    lat: number;
    lng: number;
  };
  status: DeviceStatus;
  data: DeviceData;
  firmwareVersion: string;
  lastUpdate: Date;
};

type DeviceStore = {
  devices: Device[];
  selectedDevice: Device | null;
  isLoading: boolean;
  fetchDevices: () => Promise<void>;
  selectDevice: (id: string) => void;
  updateDeviceStatus: (id: string, status: DeviceStatus) => Promise<void>;
  updateFirmware: (id: string, version: string) => Promise<void>;
  restartDevice: (id: string) => Promise<void>;
};

export const useDeviceStore = create<DeviceStore>((set, get) => ({
  devices: [],
  selectedDevice: null,
  isLoading: false,
  fetchDevices: async () => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set({
        devices: [
          {
            id: 'dev-001',
            name: 'Entry Gate Sensor',
            type: 'Gate Sensor',
            parkingAreaId: '1',
            location: { lat: 41.0082, lng: 28.9784 },
            status: 'online',
            data: {
              motion: true,
              blocking: false,
              sound: 45,
              light: 80,
              battery: 95,
              lastHeartbeat: new Date(),
            },
            firmwareVersion: '2.3.1',
            lastUpdate: new Date(2023, 4, 15),
          },
          {
            id: 'dev-002',
            name: 'Exit Gate Sensor',
            type: 'Gate Sensor',
            parkingAreaId: '1',
            location: { lat: 41.0082, lng: 28.9790 },
            status: 'online',
            data: {
              motion: false,
              blocking: false,
              sound: 35,
              light: 75,
              battery: 85,
              lastHeartbeat: new Date(),
            },
            firmwareVersion: '2.3.1',
            lastUpdate: new Date(2023, 4, 15),
          },
          {
            id: 'dev-003',
            name: 'Airport Entry Sensor',
            type: 'Gate Sensor',
            parkingAreaId: '2',
            location: { lat: 40.9822, lng: 29.0208 },
            status: 'error',
            data: {
              motion: false,
              blocking: true,
              sound: 0,
              light: 20,
              battery: 45,
              lastHeartbeat: new Date(Date.now() - 1000 * 60 * 60),
            },
            firmwareVersion: '2.2.5',
            lastUpdate: new Date(2023, 3, 10),
          },
        ],
        isLoading: false,
      });
    }, 500);
  },
  selectDevice: (id) => {
    const { devices } = get();
    const selectedDevice = devices.find((device) => device.id === id) || null;
    set({ selectedDevice });
  },
  updateDeviceStatus: async (id, status) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set((state) => ({
        devices: state.devices.map((device) =>
          device.id === id
            ? { ...device, status, lastUpdate: new Date() }
            : device
        ),
        isLoading: false,
      }));
    }, 500);
  },
  updateFirmware: async (id, version) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set((state) => ({
        devices: state.devices.map((device) =>
          device.id === id
            ? {
                ...device,
                firmwareVersion: version,
                lastUpdate: new Date(),
              }
            : device
        ),
        isLoading: false,
      }));
    }, 1000);
  },
  restartDevice: async (id) => {
    set({ isLoading: true });
    // This would be an API call in a real application
    setTimeout(() => {
      set((state) => ({
        devices: state.devices.map((device) =>
          device.id === id
            ? {
                ...device,
                status: 'offline',
                lastUpdate: new Date(),
              }
            : device
        ),
        isLoading: false,
      }));

      // Simulate device coming back online after restart
      setTimeout(() => {
        set((state) => ({
          devices: state.devices.map((device) =>
            device.id === id
              ? {
                  ...device,
                  status: 'online',
                  lastUpdate: new Date(),
                }
              : device
          ),
        }));
      }, 2000);
    }, 500);
  },
}));
