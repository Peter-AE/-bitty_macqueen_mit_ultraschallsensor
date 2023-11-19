// Project Settings:
// 
// No Pairing Required: Anyone can connect via Bluetooth.
// 
// Extensions:
// 
// Maqueen
// 
// Bluetooth
// Project Settings:
// No Pairing Required: Anyone can connect via Bluetooth.
// 
// Extensions:
// Maqueen
// Bluetooth
bluetooth.onBluetoothConnected(function () {
    maqueen.motorStop(maqueen.Motors.All)
    speedValue = speedValue
    basic.clearScreen()
    basic.showString("C")
})
bluetooth.onBluetoothDisconnected(function () {
    maqueen.motorStop(maqueen.Motors.All)
    basic.showString("D")
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_DOWN) {
        richtung = 1
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_UP) {
        richtung = 0
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_2_DOWN) {
        richtung = 2
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_2_UP) {
        richtung = 0
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_3_DOWN) {
        richtung = 3
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_3_UP) {
        richtung = 0
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_4_DOWN) {
        richtung = 4
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_4_UP) {
        richtung = 0
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_A_DOWN) {
        basic.showString("+")
        if (speedValue < maxSpeed - speedIncrement) {
            speedValue += speedIncrement
        } else {
            speedValue = maxSpeed
        }
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_A_UP) {
    	
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_B_DOWN) {
        basic.showString("-")
        if (speedValue > speedIncrement - 1) {
            speedValue += 0 - speedIncrement
        } else {
            speedValue = 0
        }
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_B_UP) {
    	
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_C_DOWN) {
        basic.showString("0")
        speedValue = 0
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_C_UP) {
    	
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_D_DOWN) {
        basic.showString("!")
        speedValue = maxSpeed
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_D_UP) {
    	
    }
})
let distanz = 0
let richtung = 0
let speedIncrement = 0
let speedValue = 0
let maxSpeed = 0
maxSpeed = 255
speedValue = 100
speedIncrement = 20
basic.showLeds(`
    . . . . .
    . . . . #
    . . . # .
    # . # . .
    . # . . .
    `)
maqueen.motorStop(maqueen.Motors.All)
basic.forever(function () {
    distanz = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (richtung == 0) {
        maqueen.motorStop(maqueen.Motors.All)
    } else if (richtung == 1) {
        if (distanz < 4) {
            richtung = 0
            maqueen.motorStop(maqueen.Motors.All)
        }
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speedValue)
    } else if (richtung == 2) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, speedValue)
    } else if (richtung == 3) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speedValue)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speedValue)
    }
    basic.pause(100)
})
