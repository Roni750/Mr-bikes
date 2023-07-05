import { Injectable } from '@angular/core'
import { BehaviorSubject, from, Observable, throwError } from 'rxjs'
import { catchError, retry, tap, map } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { storageService } from './async-storage.service'
import { Bike, BikeFilter } from '../models/bike.model'

const ENTITY = 'bikes'

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) {
    // console.log("this.bikesJSON", this.bikesJSON())
    localStorage.setItem(ENTITY, JSON.stringify(this.bikesJSON()))
    // const bikes = JSON.parse(localStorage.getItem(ENTITY) || 'null')
    // console.log("bikes", bikes)
    // if (!bikes || bikes.length === 0) {
    //   localStorage.setItem(ENTITY, JSON.stringify(this.bikesJSON))
    // } else {
    //   this._bikes$.next(bikes)
    // }
  }

  // constructor(private http: HttpClient) {
  //   const bikes = JSON.parse(localStorage.getItem(ENTITY) || 'null')

  //   if (!bikes || bikes.length === 0) {
  //     this._createBikes().subscribe(
  //       (fetchedBikes: Bike[]) => {
  //         const bikesWithId = fetchedBikes.map((bike) => ({
  //           ...bike,
  //           _id: this._makeId()
  //         }))

  //         localStorage.setItem(ENTITY, JSON.stringify(bikesWithId))
  //         this._bikes$.next(bikesWithId)
  //       },
  //       (err) => {
  //         console.error(err)
  //       }
  //     )
  //   } else {
  //     this._bikes$.next(bikes)
  //   }
  // }

  public bikesJSON() {
    return [
      {
        _id: this._makeId(),
        make: "Yamaha",
        model: "R1",
        year: "2022",
        type: "Sport",
        displacement: "998.0 ccm (60.90 cubic inches)",
        engine: "In-line four, four-stroke",
        power: "197.3 HP (144.0  kW)) @ 13500 RPM",
        torque: "113.3 Nm (11.6 kgf-m or 83.6 ft.lbs) @ 11500 RPM",
        compression: "13.0:1",
        bore_stroke: "79.0 x 50.9 mm (3.1 x 2.0 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        ignition: "TCI",
        lubrication: "Wet sump",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain   (final drive)",
        fuel_consumption: "7.20 litres/100 km (13.9 km/l or 32.67 mpg)",
        emission: "167.0 CO2 g/km. (CO2 - Carbon dioxide emission) ",
        frame: "Aluminium Deltabox, Diamond",
        front_suspension: "KYB  telescopic fork",
        front_wheel_travel: "120 mm (4.7 inches)",
        rear_suspension: "Swingarm",
        rear_wheel_travel: "120 mm (4.7 inches)",
        front_tire: "120/70-ZR17 ",
        rear_tire: "190/55-ZR17 ",
        front_brakes: "Double disc. Hydraulic",
        rear_brakes: "Single disc. Hydraulic. ",
        total_weight: "201.0 kg (443.1 pounds)",
        seat_height: "855 mm (33.7 inches) If adjustable, lowest setting.",
        total_height: "1165 mm (45.9 inches)",
        total_length: "2055 mm (80.9 inches)",
        total_width: "690 mm (27.2 inches)",
        ground_clearance: "130 mm (5.1 inches)",
        wheelbase: "1405 mm (55.3 inches)",
        fuel_capacity: "17.00 litres (4.49 US gallons)",
        starter: "Electric"
      },
      {
        _id: this._makeId(),
        make: "Yamaha",
        model: "MT-09",
        year: "2022",
        type: "Naked bike",
        displacement: "890.0 ccm (54.31 cubic inches)",
        engine: "In-line three, four-stroke",
        compression: "11.5:1",
        bore_stroke: "78.0 x 62.1 mm (3.1 x 2.4 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. Fuel injection with YCC-T",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        ignition: "Transistor Controlled",
        lubrication: "Wet sump",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain   (final drive)",
        clutch: "Multiplate, assist and slipper clutch",
        fuel_consumption: "4.80 litres/100 km (20.8 km/l or 49.00 mpg)",
        emission: "111.4 CO2 g/km. (CO2 - Carbon dioxide emission) ",
        frame: "Aluminium",
        front_suspension: "41mm inverted fork, adjustable preload, compression and rebound",
        front_wheel_travel: "130 mm (5.1 inches)",
        rear_suspension: "Single shock, adjustable preload and rebound damping",
        rear_wheel_travel: "122 mm (4.8 inches)",
        front_tire: "120/70-ZR17 ",
        rear_tire: "180/55-ZR17 ",
        front_brakes: "Double disc. ABS. Hydraulic. ",
        rear_brakes: "Single disc. ABS. Hydraulic. ",
        total_weight: "189.2 kg (417.0 pounds)",
        seat_height: "826 mm (32.5 inches) If adjustable, lowest setting.",
        total_height: "1191 mm (46.9 inches)",
        total_length: "2090 mm (82.3 inches)",
        total_width: "795 mm (31.3 inches)",
        ground_clearance: "140 mm (5.5 inches)",
        wheelbase: "1430 mm (56.3 inches)",
        fuel_capacity: "14.00 litres (3.70 US gallons)",
        starter: "Electric"
      },
      {
        _id: this._makeId(),
        make: "Suzuki",
        model: "GSX-S750A",
        year: "2022",
        type: "Sport",
        displacement: "749.0 ccm (45.70 cubic inches)",
        engine: "In-line four, four-stroke",
        power: "112.7 HP (82.2  kW)) @ 10500 RPM",
        torque: "81.0 Nm (8.3 kgf-m or 59.7 ft.lbs) @ 9000 RPM",
        compression: "12.3:1",
        bore_stroke: "72.0 x 46.0 mm (2.8 x 1.8 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. Suzuki Dual Throttle Valve System ",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        ignition: "Transistorized digital ignition system",
        lubrication: "Wet sump",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain   (final drive)",
        clutch: "Wet Multiplate",
        frame: "Twin-spar aluminum ",
        front_suspension: "KYB inverted Telescopic, coil spring, oil damped",
        front_wheel_travel: "120 mm (4.7 inches)",
        rear_suspension: "Link type, coil spring, oil damped",
        rear_wheel_travel: "130 mm (5.1 inches)",
        front_tire: "120/70-ZR17 ",
        rear_tire: "180/55-ZR17 ",
        front_brakes: "Double disc. Nissin, 4-piston. ABS.",
        rear_brakes: "Single disc. Nissin, 1-piston. ABS.",
        total_weight: "213.0 kg (469.6 pounds)",
        seat_height: "820 mm (32.3 inches) If adjustable, lowest setting.",
        total_height: "1055 mm (41.5 inches)",
        total_length: "2125 mm (83.7 inches)",
        total_width: "785 mm (30.9 inches)",
        ground_clearance: "135 mm (5.3 inches)",
        wheelbase: "1455 mm (57.3 inches)",
        fuel_capacity: "16.00 litres (4.23 US gallons)",
        starter: "Electric"
      },
      {
        _id: this._makeId(),
        make: "Honda",
        model: "CBR1000RR-R Fireblade",
        year: "2022",
        type: "Sport",
        displacement: "998.0 ccm (60.90 cubic inches)",
        engine: "In-line four, four-stroke",
        power: "215.0 HP (156.9  kW)) @ 14500 RPM",
        torque: "112.0 Nm (11.4 kgf-m or 82.6 ft.lbs) @ 12500 RPM",
        compression: "13.4:1",
        bore_stroke: "76.0 x 55.0 mm (3.0 x 2.2 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. Programmed Dual Stage Fuel Injection (PGM-DSFI) with 48mm throttle bodies, Denso 12-hole injectors",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        ignition: "Digital transistorized with electronic advance",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain   (final drive)",
        clutch: "Wet multiplate",
        fuel_consumption: "6.19 litres/100 km (16.2 km/l or 38.00 mpg)",
        emission: "143.6 CO2 g/km. (CO2 - Carbon dioxide emission) ",
        frame: "Steel mono backbone",
        front_suspension: "SHOWA BPF 43mm telescopic fork with preload, compression and rebound adjustment,",
        front_wheel_travel: "120 mm (4.7 inches)",
        rear_suspension: "SHOWA BFRC-Lite Pro-Link swingarm with 10-step preload, stepless compression and rebound damping adjustment",
        rear_wheel_travel: "137 mm (5.4 inches)",
        front_tire: "120/70-ZR17 ",
        rear_tire: "200/55-ZR17 ",
        front_brakes: "Double disc. Floating discs. Four-piston calipers. Radially mounted. ",
        rear_brakes: "Single disc. Single-piston caliper. ABS.",
        total_weight: "194.1 kg (428.0 pounds)",
        seat_height: "820 mm (32.3 inches) If adjustable, lowest setting.",
        total_height: "1120 mm (44.1 inches)",
        total_length: "2098 mm (82.6 inches)",
        total_width: "744 mm (29.3 inches)",
        ground_clearance: "135 mm (5.3 inches)",
        wheelbase: "1405 mm (55.3 inches)",
        fuel_capacity: "16.10 litres (4.25 US gallons)",
        starter: "Electric"
      },
      {
        _id: this._makeId(),
        make: "Triumph",
        model: "Scrambler 1200 Steve McQueen",
        year: "2022",
        type: "Classic",
        displacement: "1200.0 ccm (73.22 cubic inches)",
        engine: "Twin, four-stroke",
        power: "89.0 HP (65.0  kW)) @ 7400 RPM",
        torque: "110.0 Nm (11.2 kgf-m or 81.1 ft.lbs) @ 3950 RPM",
        compression: "11.0:1",
        bore_stroke: "97.6 x 80.0 mm (3.8 x 3.1 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. Multipoint sequential electronic fuel injection ",
        fuel_control: "Single Overhead Cams (SOHC)",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain   (final drive)",
        clutch: "Wet, multi-plate assist",
        fuel_consumption: "4.90 litres/100 km (20.4 km/l or 48.00 mpg)",
        emission: "113.7 CO2 g/km. (CO2 - Carbon dioxide emission) ",
        frame: "Tubular steel with aluminium cradle. Twin-sided, aluminum swingarm.",
        front_suspension: "Showa 47mm fully adjustable upside down forks",
        front_wheel_travel: "250 mm (9.8 inches)",
        rear_suspension: "Fully adjustable Ohlins twin shocks with piggy back reservoir",
        rear_wheel_travel: "250 mm (9.8 inches)",
        front_tire: "90/90-21 ",
        rear_tire: "150/70-17 ",
        front_brakes: "Double disc. Brembo 2-piston floating caliper. ABS.",
        rear_brakes: "Single disc. Brembo 2-piston floating caliper. ABS.",
        dry_weight: "207.0 kg (456.4 pounds)",
        seat_height: "870 mm (34.3 inches) If adjustable, lowest setting.",
        total_height: "1250 mm (49.2 inches)",
        total_width: "905 mm (35.6 inches)",
        wheelbase: "1570 mm (61.8 inches)",
        fuel_capacity: "16.00 litres (4.23 US gallons)",
        starter: "Electric"
      },
      {
        _id: this._makeId(),
        make: "Triumph",
        model: "Rocket 3 R 221",
        year: "2022",
        type: "Custom / cruiser",
        displacement: "2458.0 ccm (149.99 cubic inches)",
        engine: "In-line three, four-stroke",
        power: "165.0 HP (120.4  kW)) @ 6000 RPM",
        torque: "221.0 Nm (22.5 kgf-m or 163.0 ft.lbs) @ 4000 RPM",
        compression: "10.8:1",
        bore_stroke: "110.2 x 85.9 mm (4.3 x 3.4 inches)",
        fuel_system: "Injection. Ride-by-Wire",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Shaft drive (cardan)   (final drive)",
        clutch: "Wet, multi-plate hydraulically operated, torque assist",
        fuel_consumption: "6.82 litres/100 km (14.7 km/l or 34.49 mpg)",
        emission: "158.2 CO2 g/km. (CO2 - Carbon dioxide emission) ",
        frame: "Aluminium. Single-sided, cast aluminium swing arm.",
        front_suspension: "Showa 47mm upside-down 1 1 cartridge front forks, compression and rebound adjuster.",
        front_wheel_travel: "120 mm (4.7 inches)",
        rear_suspension: "Fully adjustable Showa piggyback reservoir RSU with remote hydraulic preload adjuster.",
        rear_wheel_travel: "107 mm (4.2 inches)",
        front_tire: "150/80-R17 ",
        rear_tire: "240/50-R16 ",
        front_brakes: "Double disc. Brembo M4.30 Stylema® 4-piston radial monobloc calipers, Cornering ABS",
        rear_brakes: "Single disc. Brembo M4.32 4-piston monobloc caliper, Cornering ABS",
        dry_weight: "291.0 kg (641.5 pounds)",
        seat_height: "773 mm (30.4 inches) If adjustable, lowest setting.",
        total_height: "1065 mm (41.9 inches)",
        total_length: "2500 mm (98.4 inches)",
        total_width: "889 mm (35.0 inches)",
        wheelbase: "1677 mm (66.0 inches)",
        fuel_capacity: "18.00 litres (4.76 US gallons)",
        starter: "Electric"
      },
      {
        _id: this._makeId(),
        make: "Suzuki",
        model: "GSX-S950",
        year: "2022",
        type: "Sport",
        displacement: "999.0 ccm (60.96 cubic inches)",
        engine: "In-line four, four-stroke",
        power: "95.0 HP (69.3  kW)) @ 7800 RPM",
        torque: "92.0 Nm (9.4 kgf-m or 67.9 ft.lbs) @ 6500 RPM",
        compression: "12.2:1",
        bore_stroke: "73.0 x 59.0 mm (2.9 x 2.3 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        lubrication: "Wet sump",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain   (final drive)",
        frame: "Twin-spar aluminum ",
        front_suspension: "Inverted telescopic, coil spring, oil damped",
        front_wheel_travel: "120 mm (4.7 inches)",
        rear_suspension: "Link type, coil spring, oil damped",
        rear_wheel_travel: "130 mm (5.1 inches)",
        front_tire: "120/70-ZR17 ",
        rear_tire: "180/55-ZR17 ",
        front_brakes: "Double disc. Nissin, 4-piston",
        rear_brakes: "Single disc. Nissin, 1-piston",
        total_weight: "214.0 kg (471.8 pounds)",
        seat_height: "820 mm (32.3 inches) If adjustable, lowest setting.",
        total_height: "1055 mm (41.5 inches)",
        total_length: "2125 mm (83.7 inches)",
        total_width: "785 mm (30.9 inches)",
        ground_clearance: "135 mm (5.3 inches)",
        wheelbase: "1455 mm (57.3 inches)",
        fuel_capacity: "16.00 litres (4.23 US gallons)",
        starter: "Electric"
      },
      {
        _id: this._makeId(),
        make: "MV Agusta",
        model: "Brutale 800 RR",
        year: "2022",
        type: "Naked bike",
        displacement: "798.0 ccm (48.69 cubic inches)",
        engine: "In-line three, four-stroke",
        power: "140.0 HP (102.2  kW)) @ 12300 RPM",
        torque: "87.0 Nm (8.9 kgf-m or 64.2 ft.lbs) @ 10250 RPM",
        top_speed: "244.0 km/h (151.6 mph)",
        compression: "13.3:1",
        bore_stroke: "79.0 x 54.3 mm (3.1 x 2.1 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. Integrated ignition - injection system MVICS 2.0  (Motor  and  Vehicle Integrated Control System)  with six injectors. Engine control unit  Eldor EM2.0, throttle body full ride by wire Mikuni, pencil-coil with ion-sensing technology, control of detonation",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        cooling: "Oil & air",
        gearbox: "6-speed",
        transmission: "Chain   (final drive)",
        clutch: "Multi-disk wet clutch with hydraulic actuation and back torque limiting device",
        fuel_consumption: "5.90 litres/100 km (16.9 km/l or 39.87 mpg)",
        emission: "136.9 CO2 g/km. (CO2 - Carbon dioxide emission) ",
        frame: "ALS Steel tubular trellis",
        front_suspension: "Marzocchi upside down telescopic hydraulic fork, 43 mm",
        front_wheel_travel: "125 mm (4.9 inches)",
        rear_suspension: "Progressive Sachs, single shock absorber with rebound and compression damping and spring preload adjustment",
        rear_wheel_travel: "130 mm (5.1 inches)",
        front_tire: "120/70-ZR17 ",
        rear_tire: "180/55-ZR17 ",
        front_brakes: "Double disc. Brembo radial-type, with 4 pistons. ABS.",
        rear_brakes: "Single disc. Brembo with 2 pistons.ABS.",
        dry_weight: "175.0 kg (385.8 pounds)",
        seat_height: "830 mm (32.7 inches) If adjustable, lowest setting.",
        total_length: "2045 mm (80.5 inches)",
        total_width: "875 mm (34.4 inches)",
        ground_clearance: "135 mm (5.3 inches)",
        wheelbase: "1400 mm (55.1 inches)",
        fuel_capacity: "16.50 litres (4.36 US gallons)",
        starter: "Electric"
      },
      {
        make: "Suzuki",
        model: "GSX-R1000",
        year: "2022",
        type: "Sport",
        displacement: "999.8 ccm (61.01 cubic inches)",
        engine: "In-line four, four-stroke",
        power: "198.5 HP (144.9  kW)) @ 13200 RPM",
        torque: "117.0 Nm (11.9 kgf-m or 86.3 ft.lbs) @ 10800 RPM",
        compression: "13.2:1",
        bore_stroke: "76.0 x 55.1 mm (3.0 x 2.2 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. Ride-by-Wire throttle bodies",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        ignition: "Electronic ignition (Transistorized)",
        lubrication: "Wet sump",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain   (final drive)",
        clutch: "Wet, multi-plate type. Suzuki Clutch Assist.",
        frame: "Twin-spar aluminum",
        front_suspension: "Inverted telescopic, coil spring, oil damped",
        rear_suspension: "Link type, single shock, coil spring, oil damped",
        front_tire: "120/70-ZR17 ",
        rear_tire: "190/55-ZR17 ",
        front_brakes: "Double disc. ABS. Brembo, 4-piston.",
        rear_brakes: "Single disc. ABS. Nissin, 1-piston.",
        total_weight: "201.0 kg (443.1 pounds)",
        seat_height: "825 mm (32.5 inches) If adjustable, lowest setting.",
        total_height: "1145 mm (45.1 inches)",
        total_length: "2075 mm (81.7 inches)",
        total_width: "705 mm (27.8 inches)",
        ground_clearance: "130 mm (5.1 inches)",
        wheelbase: "1460 mm (57.5 inches)",
        fuel_capacity: "16.00 litres (4.23 US gallons)",
        starter: "Electric",
        _id: "XSQpY"
      },
      {
        _id: this._makeId(),
        make: "Ducati",
        model: "Panigale V4",
        year: "2022",
        type: "Sport",
        displacement: "1103.0 ccm (67.31 cubic inches)",
        engine: "V4, four-stroke",
        power: "215.5 HP (157.3  kW)) @ 13000 RPM",
        torque: "123.6 Nm (12.6 kgf-m or 91.2 ft.lbs) @ 9500 RPM",
        compression: "14.0:1",
        bore_stroke: "81.0 x 53.5 mm (3.2 x 2.1 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. Electronic fuel injection system. Twin injectors per cylinder. Full ride-by-wire elliptical throttle bodies.",
        fuel_control: "Desmodromic valve control",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain   (final drive)",
        clutch: "Slipper and self-servo wet multiplate clutch with hydraulic control",
        fuel_consumption: "7.60 litres/100 km (13.2 km/l or 30.95 mpg)",
        emission: "176.3 CO2 g/km. (CO2 - Carbon dioxide emission) ",
        frame: "Aluminium alloy. Engine is used as a structural chassis element. Trellis subframe.",
        front_suspension: "Fully adjustable Showa BPF fork 43 mm chromed inner tubes",
        front_wheel_travel: "120 mm (4.7 inches)",
        rear_suspension: "Fully adjustable Sachs unit. Aluminium single-sided swingarm.",
        rear_wheel_travel: "130 mm (5.1 inches)",
        front_tire: "120/70-ZR17 ",
        rear_tire: "200/60-ZR17 ",
        front_brakes: "Double disc. ABS. Brembo",
        rear_brakes: "Single disc. ABS. Brembo",
        dry_weight: "175.0 kg (385.8 pounds)",
        total_weight: "198.5 kg (437.6 pounds)",
        seat_height: "850 mm (33.5 inches) If adjustable, lowest setting.",
        total_height: "845 mm (33.3 inches)",
        wheelbase: "1469 mm (57.8 inches)",
        fuel_capacity: "17.00 litres (4.49 US gallons)",
        starter: "Electric"
      },
      {
        _id: this._makeId(),
        make: "Kawasaki",
        model: "Ninja H2",
        year: "2022",
        type: "Sport",
        displacement: "998.0 ccm (60.90 cubic inches)",
        engine: "In-line four, four-stroke",
        power: "228.0 HP (166.4  kW)) @ 11500 RPM",
        torque: "141.7 Nm (14.4 kgf-m or 104.5 ft.lbs) @ 11000 RPM",
        compression: "8.5:1",
        bore_stroke: "76.0 x 55.0 mm (3.0 x 2.2 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. DFI® with 50mm throttle bodies (4) with dual injection",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        ignition: "Digital",
        lubrication: "Forced lubrication, wet sump with oil cooler",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain   (final drive)",
        clutch: "Wet multi-disc, manual",
        fuel_consumption: "8.53 litres/100 km (11.7 km/l or 27.58 mpg)",
        emission: "197.9 CO2 g/km. (CO2 - Carbon dioxide emission) ",
        frame: "Trellis, high-tensile steel with swingarm mounting plate",
        front_suspension: "43 mm inverted fork with rebound and compression damping, spring preload adjustability and top-out springs",
        front_wheel_travel: "119 mm (4.7 inches)",
        rear_suspension: "Uni-Trak, Öhlins TTX36 gas-charged shock with piggyback reservoir, compression damping, rebound damping, preload adjustability and top-out spring",
        rear_wheel_travel: "135 mm (5.3 inches)",
        front_tire: "120/70-ZR17 ",
        rear_tire: "200/55-ZR17 ",
        front_brakes: "Double disc. Dual radial-mount, opposed 4-piston Brembo Stylema® calipers, dual semi-floating disc. ABS.",
        rear_brakes: "Single disc. Opposed 2-piston calipers, single disc. ABS.",
        total_weight: "238.1 kg (524.8 pounds)",
        seat_height: "825 mm (32.5 inches) If adjustable, lowest setting.",
        total_height: "1125 mm (44.3 inches)",
        total_length: "2085 mm (82.1 inches)",
        total_width: "770 mm (30.3 inches)",
        ground_clearance: "130 mm (5.1 inches)",
        wheelbase: "1455 mm (57.3 inches)",
        fuel_capacity: "17.00 litres (4.49 US gallons)",
        starter: "Electric"
      },
      {
        _id: this._makeId(),
        make: "Aprilia",
        model: "Tuono V4 Factory",
        year: "2022",
        type: "Naked bike",
        displacement: "1077.0 ccm (65.72 cubic inches)",
        engine: "V4, four-stroke",
        power: "175.0 HP (127.7  kW)) @ 11300 RPM",
        torque: "121.0 Nm (12.3 kgf-m or 89.2 ft.lbs) @ 9000 RPM",
        bore_stroke: "81.0 x 52.3 mm (3.2 x 2.1 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. Airbox with front dynamic air intakes. 4 Weber-Marelli 48-mm throttle bodies with 4 injectors and latest generation Ride-by-Wire engine management. Choice of three different engine maps selectable by the rider with bike in motion: T (Track), S (Sport), R ",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        ignition: "Magneti Marelli digital electronic ignition system integrated in engine control system, with one spark plug per cylinder and “stick-coil” type coils",
        lubrication: "Wet sump lubrication system with oil radiator and two oil pumps (lubrication and cooling)",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain   (final drive)",
        clutch: "Multiplate wet clutch with mechanical slipper system.",
        fuel_consumption: "7.20 litres/100 km (13.9 km/l or 32.67 mpg)",
        emission: "167.0 CO2 g/km. (CO2 - Carbon dioxide emission) ",
        frame: "Aluminium dual beam chassis with cast and pressed sheet elements. (Sachs steering damper on APRC version)",
        front_suspension: "Öhlins NIX upside-down fork, Ø 43 mm stanchions. Electronics management system Ohlins Smart EC 2.0 (OBTi).",
        front_wheel_travel: "125 mm (4.9 inches)",
        rear_suspension: "Double-sided aluminium swingarm Öhlins TTX single shock absorber with piggy-back. Electronics management system Ohlins Smart EC 2.0 (OBTi).",
        rear_wheel_travel: "130 mm (5.1 inches)",
        front_tire: "120/70-ZR17 ",
        rear_tire: "200/55-ZR17 ",
        front_brakes: "Double disc. ABS.  Floating double disc with aluminium flange Brembo M50 4-piston mono-block radial calipers Radial pump and metal braid brake pipe.",
        rear_brakes: "Single disc. ABS. Brembo Ø 32 mm 2 isolated piston caliper Pump with integrated tank and metal braid pipe.",
        dry_weight: "185.0 kg (407.9 pounds)",
        total_weight: "209.0 kg (460.8 pounds)",
        seat_height: "825 mm (32.5 inches) If adjustable, lowest setting.",
        total_height: "1090 mm (42.9 inches)",
        total_length: "2070 mm (81.5 inches)",
        total_width: "810 mm (31.9 inches)",
        ground_clearance: "125 mm (4.9 inches)",
        wheelbase: "1450 mm (57.1 inches)",
        fuel_capacity: "17.90 litres (4.73 US gallons)",
        starter: "Electric"
      },
    ]
  }

  private _bikes$ = new BehaviorSubject<Bike[]>([])
  public bikes$ = this._bikes$.asObservable()

  private _bikeFilter$ = new BehaviorSubject<BikeFilter>({ model: '' })
  public bikeFilter$ = this._bikeFilter$.asObservable()

  public query() {
    return from(storageService.query(ENTITY))
      .pipe(
        tap(bikes => {
          const filterBy = this._bikeFilter$.value
          bikes = bikes.filter(bike => bike.model.toLowerCase().includes(filterBy.model.toLowerCase()))
          this._bikes$.next(bikes)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public setBikeFilter(bikeFilter: BikeFilter) {
    this._bikeFilter$.next(bikeFilter)
    this.query().subscribe()
  }

  public fetchBikeAPI() {
    const _url = 'https://api.api-ninjas.com/v1/motorcycles?';
    const apiKey = 'gkf2u0MNjc978W/3LItwTA==bO7uXBmyW1fE8thZ';
    const headers = new HttpHeaders().set('x-api-key', apiKey);
    const params = new HttpParams().set('make', 'Suzuki');

    return this.http.get<Bike[]>(_url, { headers, params }).pipe(
      tap(response => {
        console.log('API Response:', response);
      }),
      catchError(this._handleError)
    );
  }

  public getEmptyBike() {
    return {
      make: '',
      model: '',
      power: '',
      torque: '',
      year: '',
    }
  }

  public remove(bikeId: string) {
    return from(storageService.remove(ENTITY, bikeId))
      .pipe(
        tap(() => {
          const bikes = this._bikes$.value
          const bikeIdx = bikes.findIndex(bike => bike._id === bikeId)
          bikes.splice(bikeIdx, 1)
          this._bikes$.next([...bikes])
          return bikeId
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public getById(bikeId: string): Observable<Bike> {
    return from(storageService.get(ENTITY, bikeId))
      .pipe(
        retry(1),
        catchError(this._handleError)
      )

  }


  public save(bike: Bike) {
    return bike._id ? this._edit(bike) : this._add(bike)
  }

  private _add(bike: Bike) {
    return from(storageService.post(ENTITY, bike))
      .pipe(
        tap(newBike => {
          const bikes = this._bikes$.value
          bikes.push(newBike)
          this._bikes$.next([...bikes])
          return newBike
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  private _edit(bike: Bike) {
    return from(storageService.put(ENTITY, bike))
      .pipe(
        tap(updatedBike => {
          const bikes = this._bikes$.value
          const bikeIdx = bikes.findIndex(_bike => _bike._id === bike._id)
          bikes.splice(bikeIdx, 1, updatedBike)
          this._bikes$.next([...bikes])
          return updatedBike
        }),
        retry(1),
        catchError(this._handleError)
      )
  }


  public _createBikes(): Observable<Bike[]> {
    return this.fetchBikeAPI().pipe(
      tap((bikes: Bike[]) => {
        this._bikes$.next(bikes)
      }),
      catchError(this._handleError)
    )
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('err:', err)
    return throwError(() => err)
  }

  private _makeId(length = 5) {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }
}
