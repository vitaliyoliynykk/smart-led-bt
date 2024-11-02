import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    NzSwitchModule,
    CommonModule,
    ColorPickerModule,
    NgxSliderModule,
  ],
})
export class MainPage implements OnInit {
  value = 50;
  color = '#0070f3';
  options: Options = {
    floor: 0,
    ceil: 100,
  };
  switchValue = false;

  ngOnInit() {}
}
