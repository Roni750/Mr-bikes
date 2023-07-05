export interface Bike {
    _id: string
    make: string
    model: string
    power: string
    torque: string
    year: string
    type: string
    dryWeight: string
    boreStroke: string
    clutch: string
    compression: string
    cooling: string
    displacement: string
    engine: string
    frontBrakes: string
    frontSuspension: string
    frontTire: string
    fuelCapacity: string
    fuelControl: string
    fuelSystem: string
    gearbox: string
    groundClearance: string
    ignition: string
    lubrication: string
    rearBrakes: string
    rearSuspension: string
    rearTire: string
    seatHeight: string
    starter: string
    totalHeight: string
    totalLength: string
    totalWeight: string
    totalWidth: string
    transmission: string
    wheelbase: string
}

export interface BikeFilter {
    model: string
}
