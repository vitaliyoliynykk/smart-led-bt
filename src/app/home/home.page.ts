import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  RefresherCustomEvent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
} from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { BluetoothLe, ScanMode } from '@capacitor-community/bluetooth-le';
import { BLE } from '@ionic-native/ble';
import { Observable } from 'rxjs';
// import { BLE } from '@ionic-native/ble';
// import { BLE } from '@awesome-cordova-plugins/ble/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    MessageComponent,
  ],
})
export class HomePage {
  private data = inject(DataService);

  results: any[] = [];

  initialized = false;

  constructor() {
    this.initializeBLE();
  }

  scanForDevices2(): void {
    BLE.scan(['4fafc201-1fb5-459e-8fcc-c5c9c331914b'], 10).subscribe(
      (results) => this.results.push(results)
    );
  }

  async initializeBLE() {
    try {
      await BluetoothLe.initialize();
      this.initialized = true;
      console.log('Bluetooth LE ініціалізовано');
    } catch (error) {
      console.error('Помилка ініціалізації Bluetooth:', error);
    }
  }

  async scanForDevices() {
    try {
      // ble.scan();
      // Починаємо сканування на 5 секунд
      await BluetoothLe.requestLEScan({
        scanMode: ScanMode.SCAN_MODE_BALANCED,
      });
      this.results = [];
      // Підписуємося на подію, щоб отримувати результати сканування
      BluetoothLe.addListener('onScanResult', (result) => {
        this.results.push(result);
      });
      // Зупиняємо сканування через 5 секунд
      setTimeout(async () => {
        await BluetoothLe.stopLEScan();
        console.log('Сканування завершено');
      }, 25000);
    } catch (error) {
      console.error('Помилка сканування:', error);
    }
  }

  async showBLEDevicesWeb() {
    try {
      // Запитуємо у користувача доступ до BLE-пристроїв
      const device = await (navigator as any).bluetooth.requestDevice({
        // Додайте filters або optionalServices для визначення специфічних сервісів
        acceptAllDevices: true, // Дозволяє показувати всі BLE-пристрої
        optionalServices: ['battery_service'], // Наприклад, для батареї (можна змінити)
      });

      // Виводимо інформацію про вибраний пристрій
      console.log('Вибраний пристрій:', device.name);
      console.log('ID пристрою:', device.id);
      console.log(device);
    } catch (error) {
      console.error('Помилка підключення або скасування вибору:', error);
    }
  }

  async showMyDevice() {
    try {
      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ services: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'] }], // Вкажіть сервісний UUID ESP32
      });
      console.log('Знайдено пристрій:', device.name);
    } catch (error) {
      console.error('Помилка або скасування вибору:', error);
    }
  }
}
